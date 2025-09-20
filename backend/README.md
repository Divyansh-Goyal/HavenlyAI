# HavenlyAI Backend (FastAPI)

## Quickstart

1. Create venv and install deps
```
python3 -m venv .venv
source .venv/bin/activate
pip3 install -r backend/requirements.txt
```

2. Run API (SQLite by default)
```
uvicorn backend.app.main:app --reload --port 8000
```

3. Seed local admin
```
curl -X POST http://localhost:8000/api/v1/auth/seed
```

Env vars (see `backend/.env.example` in repo root or set shell envs):
- `DATABASE_URL` (optional; default sqlite)
- `SECRET_KEY`
- `REDIS_URL`
- `SUPABASE_URL` / `SUPABASE_KEY`
- `OPENAI_API_KEY` / `STABILITY_API_KEY`
  


