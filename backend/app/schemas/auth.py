from pydantic import BaseModel, EmailStr


class TokenResponse(BaseModel):
    token: str
    user: "UserOut"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


class UserOut(BaseModel):
    id: int
    email: EmailStr
    role: str

    class Config:
        from_attributes = True

TokenResponse.model_rebuild()


