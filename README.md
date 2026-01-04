# FastCart — Monorepo

This repository contains two main parts:

- `client/` — FastCart frontend (React + Vite + Tailwind)
- `server/` — FastCart backend (Node.js + Express + MongoDB + Cloudinary)

Quick start (development)

1. Backend: install and start

```powershell
cd 'c:\Users\nithi\OneDrive\Documents\Naveen-Project\server'
npm install
# create .env with required variables (see server/README.md)
npm run dev
```

2. Frontend: install and start

```powershell
cd 'c:\Users\nithi\OneDrive\Documents\Naveen-Project\client'
npm install
# create .env with VITE_API_URL pointing to backend (e.g. http://localhost:8000)
npm run dev
```

Useful notes
- The frontend expects the API base url in `VITE_API_URL`.
- The backend requires MongoDB and Cloudinary credentials for full functionality (image uploads & email require additional env vars — see `server/README.md`).
- The repo already includes useful helpers: `client/src/common/SummaryApi.js` centralizes endpoints; `server/config` contains DB/email/cloudinary helpers.

Deploying
- Build the frontend (`client`) with `npm run build` and upload the `dist` output to a static host.
- Host the backend on a Node-capable host; set environment variables there.

Project status & next steps
- Frontend: themed FastCart UI, categories CRUD, auth flows and profile UI are implemented.
- Backend: category model, Cloudinary integration, and user auth are implemented.

If you want, I can:
- Add convenient npm scripts at the repo root to bootstrap both client and server together.
- Create Dockerfiles and a docker-compose for local development.
