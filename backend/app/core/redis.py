import redis
from typing import Optional
from .config import settings


def _get_client() -> Optional[redis.Redis]:
    try:
        if not settings.redis_url:
            return None
        return redis.Redis.from_url(settings.redis_url, decode_responses=True)
    except Exception:
        return None


def blacklist_token_jti(jti: str, ttl_seconds: int) -> None:
    if not jti or ttl_seconds <= 0:
        return
    client = _get_client()
    if not client:
        return
    try:
        client.setex(f"bl:{jti}", ttl_seconds, "1")
    except Exception:
        # fail-open: if Redis is down, don't block app flow
        return


def is_token_jti_blacklisted(jti: str) -> bool:
    if not jti:
        return False
    client = _get_client()
    if not client:
        return False
    try:
        return client.exists(f"bl:{jti}") == 1
    except Exception:
        return False


