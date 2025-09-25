import rq
from ..core.redis import redis_client


queue = rq.Queue("ai_jobs", connection=redis_client)
