from fastapi import APIRouter, Depends
from ..deps import get_current_user


router = APIRouter(prefix="/assets", tags=["assets"])


@router.get("/health")
def assets_health(user = Depends(get_current_user)):
    return {"ok": True}


