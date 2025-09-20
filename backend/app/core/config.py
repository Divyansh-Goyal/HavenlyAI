from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration loaded from environment variables.

    All sensitive values should be provided via environment or `backend/.env`.
    """

    # API
    api_v1_prefix: str = "/api/v1"
    secret_key: str | None = None
    access_token_expire_minutes: int = 60 * 24

    # Datastores / Queues
    database_url: str | None = None
    redis_url: str | None = None

    # External services
    supabase_url: str | None = None
    supabase_key: str | None = None
    openai_api_key: str | None = None
    stability_api_key: str | None = None

    # Pydantic v2 settings config
    model_config = SettingsConfigDict(
        env_file="backend/.env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()  # Loads from env and `backend/.env` if present


