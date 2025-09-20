from pydantic import BaseModel
from typing import List, Optional


class LayoutVariantOut(BaseModel):
    id: int
    label: str
    image_url: Optional[str] = None

    class Config:
        from_attributes = True


class ProjectCreate(BaseModel):
    name: str
    budget: Optional[float] = None
    style: Optional[str] = None


class ProjectOut(BaseModel):
    id: int
    name: str
    status: str
    variants: List[LayoutVariantOut] = []

    class Config:
        from_attributes = True


