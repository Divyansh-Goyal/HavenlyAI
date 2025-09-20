## HavenlyAI

Monorepo with a FastAPI backend and a Vite + React + Tailwind frontend.

### Prerequisites
- Node.js 20 (use `nvm`)
- Python 3.11+

```bash
# macOS
brew install nvm
export NVM_DIR="$HOME/.nvm" && source "$(brew --prefix nvm)/nvm.sh"
nvm install 20
nvm use 20
```

### Frontend (Vite + React + Tailwind)
```bash
cd frontend
npm install
npm run dev
# open http://localhost:5173
```

Build/preview:
```bash
npm run build
npm run preview
```

If styles look unstyled, ensure Tailwind config is picked up:
- `postcss.config.cjs` exists
- `tailwind.config.js` content globs include `./index.html` and `./src/**/*.{ts,tsx}`
- `src/main.tsx` imports `./index.css`

### Backend (FastAPI)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt

# env
cp backend/.env.example backend/.env
# edit backend/.env with your values

# run
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# open http://localhost:8000/docs
```

### Configuration
Backend settings are loaded from environment variables via `backend/app/core/config.py`.
Key vars: `SECRET_KEY`, `DATABASE_URL`, `REDIS_URL`, `SUPABASE_URL`, `SUPABASE_KEY`, `OPENAI_API_KEY`, `STABILITY_API_KEY`, `API_V1_PREFIX`.

### Project Structure
```
backend/   # FastAPI app, workers, services
frontend/  # Vite React app (TypeScript, Tailwind)
```

### Common issues
- TypeScript JSX type errors: ensure imports of React types use `import type { ... } from 'react'`.
- PostCSS error "module is not defined": use `postcss.config.cjs` when `package.json` has `"type": "module"`.
- Tailwind not applying: check content globs and that the dev server restarted.

### Scripts
Frontend:
- `npm run dev` – start Vite dev server
- `npm run build` – type-check and build
- `npm run preview` – preview production build

Backend:
- `uvicorn app.main:app --reload` – run API locally

### License
MIT

