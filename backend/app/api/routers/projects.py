from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List

from ...core.db import get_db
from ...models.project import Project
from ...models.layout import LayoutVariant
from ...schemas.project import ProjectOut
from ..deps import get_current_user
from ...models.user import User


router = APIRouter(prefix="/projects", tags=["projects"])


@router.post("", response_model=ProjectOut)
def create_project(
    name: str = Form(...),
    budget: float | None = Form(None),
    style: str | None = Form(None),
    file: UploadFile | None = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = Project(name=name, owner_id=current_user.id, status="processing")
    db.add(project)
    db.commit()
    db.refresh(project)

    variants: List[LayoutVariant] = []
    for i in range(1, 3 + 1):
        variant = LayoutVariant(project_id=project.id, label=f"Variant {i}", order=i)
        db.add(variant)
        variants.append(variant)
    db.commit()
    for v in variants:
        db.refresh(v)

    project.variants = variants  # type: ignore[attr-defined]
    return project


@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        from fastapi import HTTPException

        raise HTTPException(status_code=404, detail="Project not found")
    variants = db.query(LayoutVariant).filter(LayoutVariant.project_id == project_id).order_by(LayoutVariant.order).all()
    # attach for response
    project.variants = variants  # type: ignore[attr-defined]
    return project


