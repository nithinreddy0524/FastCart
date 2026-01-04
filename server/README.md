# FastCart — Backend (server)

This folder contains the FastCart backend: an Express.js API using MongoDB (Mongoose), Cloudinary for image uploads, JWT-based authentication and utility controllers for users and categories.

Core technologies
- Node.js (ES modules)
- Express
- MongoDB + Mongoose
- Multer (multipart handling)
- Cloudinary (image uploads)
- JWT for authentication

Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (local or hosted)
- Cloudinary account (for image uploads)

Install & run (development)

```powershell
cd 'c:\Users\nithi\OneDrive\Documents\Naveen-Project\server'
npm install
npm run dev
```

Start (production)

```powershell
npm run start
```

Environment variables

Create a `.env` file in `server/` with the following keys (example):

```
MONGODB_URI=mongodb://localhost:27017/fastcart
PORT=8000
FRONTEND_URL=http://localhost:5173
SECRET_KEY_ACCESS_TOKEN=your_access_secret
SECRET_KEY_REFRESH_TOKEN=your_refresh_secret
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-app-password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Notes on important envs
- `MONGODB_URI` — MongoDB connection string
- `FRONTEND_URL` — used when generating verification/reset links
- `SECRET_KEY_ACCESS_TOKEN`, `SECRET_KEY_REFRESH_TOKEN` — JWT secrets
- `EMAIL_USER`, `EMAIL_PASS` — optional SMTP credentials for email flows
- `CLOUDINARY_*` — required for image upload support

APIs
- User authentication and profile endpoints under `/api/user`
- Categories CRUD endpoints under `/api/category` (supports multipart/form-data for image uploads)

Useful files
- `index.js` — server entry
- `config/connectDB.js` — MongoDB connection helper
- `config/cloudinary.js` — Cloudinary helper
- `controllers/` — request handlers
- `models/` — Mongoose schemas
- `route/` — Express routers

Troubleshooting
- MongoDB connection errors: verify `MONGODB_URI` and that the DB is reachable.
- Cloudinary upload errors: ensure `CLOUDINARY_*` are correct.
- JWT errors: check your secret values and token expiry logic.

Security & deployment notes
- Do not commit `.env` files or secrets to version control.
- For production, set environment variables in your hosting environment (e.g., Azure, AWS, Heroku, Vercel for serverless functions).

Contact
- For local development issues, check server logs (console) and inspect requests using Postman or the browser network devtools.
