from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List

from ...core.db import get_db
from ...models.project import Project
from ...models.layout import LayoutVariant
from ...schemas.project import ProjectOut, ProjectUpdate
from ..deps import get_current_user
from ...models.user import User


router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("", response_model=List[ProjectOut])
def list_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    projects = db.query(Project).filter(Project.owner_id == current_user.id).all()
    # Join variants for response (ordered)
    result: List[Project] = []
    for p in projects:
        variants = (
            db.query(LayoutVariant)
            .filter(LayoutVariant.project_id == p.id)
            .order_by(LayoutVariant.order)
            .all()
        )
        p.variants = variants  # type: ignore[attr-defined]
        result.append(p)
    return result

@router.post("", response_model=ProjectOut)
def create_project(
    name: str = Form(...),
    budget: float | None = Form(None),
    style: str | None = Form(None),
    file: UploadFile | None = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = Project(name=name, owner_id=current_user.id, status="processing", budget=budget, style=style)
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



@router.put("/{project_id}", response_model=ProjectOut)
def update_project(
    project_id: int,
    payload: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        from fastapi import HTTPException

        raise HTTPException(status_code=404, detail="Project not found")
    # Ensure ownership
    if project.owner_id != current_user.id:
        from fastapi import HTTPException

        raise HTTPException(status_code=403, detail="Forbidden")

    if payload.name is not None:
        project.name = payload.name
    if payload.budget is not None:
        project.budget = payload.budget
    if payload.style is not None:
        project.style = payload.style

    db.add(project)
    db.commit()
    db.refresh(project)

    variants = db.query(LayoutVariant).filter(LayoutVariant.project_id == project_id).order_by(LayoutVariant.order).all()
    project.variants = variants  # type: ignore[attr-defined]
    return project

