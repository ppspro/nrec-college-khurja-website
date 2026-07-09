# NREC College - Backend Deployment Guide (aaPanel)

## Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- PM2 (via aaPanel Node.js App Manager)

## Deployment Steps
1. Upload this zip (`backend.zip`) to your aaPanel file manager under a backend directory (e.g. `/www/wwwroot/api.nreccollege.ac.in` or `/www/wwwroot/nreccollege.ac.in/backend`).
2. Extract the archive.
3. Rename `.env.example` to `.env` and fill in your real database credentials, JWT secrets, and Cloudinary keys.
4. Run `npm install --production` to install only necessary dependencies.
5. In aaPanel, create a new Node.js project for this folder:
   - Run command/Startup script: `npm start`
   - Port: The port you specified in your `.env` (default usually `5000` or `5001`)
6. Ensure your frontend `.env.production` points to this backend's URL.

## First Time Setup (Database Seeding)
If you need to seed the database with initial Admin accounts and mock data, run:
```bash
npm run seed
```
