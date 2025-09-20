from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...core.db import get_db
from ...core.security import verify_password, get_password_hash, create_access_token, decode_token
from ...models.user import User
from ...schemas.auth import LoginRequest, TokenResponse, UserOut, RegisterRequest, ChangePasswordRequest
from ...api.deps import get_current_user
from ...core.redis import blacklist_token_jti
from datetime import datetime, timezone


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token(subject=str(user.id), extra_claims={"role": user.role})
    return TokenResponse(token=token, user=UserOut.model_validate(user))


@router.post("/register", response_model=TokenResponse)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(email=payload.email, hashed_password=get_password_hash(payload.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    token = create_access_token(subject=str(user.id), extra_claims={"role": user.role})
    return TokenResponse(token=token, user=UserOut.model_validate(user))


@router.post("/change-password")
def change_password(payload: ChangePasswordRequest, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # verify current password
    if not verify_password(payload.current_password, current.hashed_password):
        raise HTTPException(status_code=400, detail="Current password incorrect")
    current.hashed_password = get_password_hash(payload.new_password)
    db.add(current)
    db.commit()
    return {"ok": True}


@router.post("/logout")
def logout(token: str, db: Session = Depends(get_db)):
    # token string passed as body form or json key "token"
    data = decode_token(token)
    if not data:
        return {"ok": True}
    exp = data.get("exp")
    jti = data.get("jti")
    if jti and exp:
        # compute TTL in seconds from now
        now = int(datetime.now(timezone.utc).timestamp())
        ttl = max(int(exp) - now, 0)
        blacklist_token_jti(str(jti), ttl)
    return {"ok": True}


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


