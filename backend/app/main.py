from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .core.db import Base, engine
from .api.routers import auth as auth_router
from .api.routers import projects as projects_router
from .api.routers import assets as assets_router


def create_app() -> FastAPI:
    app = FastAPI(title="HavenlyAI API")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    Base.metadata.create_all(bind=engine)

    api = FastAPI()
    api.include_router(auth_router.router)
    api.include_router(projects_router.router)
    api.include_router(assets_router.router)

    app.mount(settings.api_v1_prefix, api)
    return app


app = create_app()


