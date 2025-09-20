from pydantic import BaseModel


class LayoutVariantOut(BaseModel):
    id: int
    label: str
    image_url: str | None = None

    class Config:
        from_attributes = True


