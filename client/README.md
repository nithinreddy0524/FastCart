# FastCart — Frontend (client)

This is the FastCart frontend app built with React + Vite and Tailwind CSS. It provides the admin/customer-facing UI used during development: auth pages, profile, dashboard and a Categories management area.

This README covers how to run, build and configure the client locally.

Key technologies
- React 18
- Vite (dev server + build)
- TailwindCSS for styling
- Redux Toolkit for user state
- Axios for API calls
- react-router-dom for routing

Quick start

1. Install dependencies

```powershell
cd 'c:\Users\nithi\OneDrive\Documents\Naveen-Project\client'
npm install
```

2. Create environment variables

Create a `.env` file (or set env vars in your shell) with at least:

```env
VITE_API_URL=http://localhost:8000
```

The frontend expects the backend API to be reachable at `VITE_API_URL` (no trailing slash).

3. Run the dev server

```powershell
npm run dev
```

Build for production

```powershell
npm run build
npm run preview
```

Useful scripts (package.json)
- `dev` — start vite dev server
- `build` — build production assets
- `preview` — preview built assets locally
- `lint` — run ESLint

Configuration notes
- The client code uses `client/src/common/SummaryApi.js` to centralize API endpoints. Changing the API base URL should be done via the `VITE_API_URL` env variable.
- Auth tokens are handled by `client/src/utils/Axios.js` (interceptors included).

Features implemented
- FastCart themed header and user menu
- Auth pages (Login, Register, Forgot password, OTP, Reset password)
- Profile page with update flow
- Categories CRUD UI (list, create, edit, delete)
- Cloudinary-backed image uploads (server-side)
- Accessible form controls with inline validation and aria attributes

Testing & verification
- Manually verify flows after starting both client and server: register/login, profile update, create/edit/delete categories.

Troubleshooting
- Favicon/cache: If you change the favicon, hard-refresh the browser (Ctrl+F5) to clear cache.
- CORS/API errors: ensure `VITE_API_URL` points to a running backend and the server allows requests from the client origin.

Where to look next
- Routes: `client/src/route/index.jsx`
- Global state: `client/src/store`
- API helpers: `client/src/common/SummaryApi.js` and `client/src/utils/Axios.js`

If you need the frontend to run on a specific port, set `PORT` environment variable for Vite or pass `--port` to the `vite` command in `package.json`.
