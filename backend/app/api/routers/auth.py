from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...core.db import get_db
from ...core.security import verify_password, get_password_hash, create_access_token
from ...models.user import User
from ...schemas.auth import LoginRequest, TokenResponse, UserOut


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token(subject=str(user.id), extra_claims={"role": user.role})
    return TokenResponse(token=token, user=UserOut.model_validate(user))


@router.post("/seed")
def seed_admin(db: Session = Depends(get_db)):
    # convenience endpoint for local dev
    admin = db.query(User).filter(User.email.in_(["admin@example.com", "admin@local"]).is_(True)).first()  # type: ignore[attr-defined]
    if admin:
        if admin.email != "admin@example.com":
            admin.email = "admin@example.com"
            db.add(admin)
            db.commit()
        return {"ok": True}
    admin = User(email="admin@example.com", hashed_password=get_password_hash("admin"), role="admin")
    db.add(admin)
    db.commit()
    return {"ok": True}


