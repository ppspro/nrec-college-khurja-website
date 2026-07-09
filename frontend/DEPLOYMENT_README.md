# NREC College - Frontend Deployment Guide (aaPanel)

## Prerequisites
- Node.js (v18+)
- PM2 (via aaPanel Node.js App Manager)

## Deployment Steps
1. Upload this zip (`frontend-out.zip`) to your aaPanel file manager under your target domain directory (e.g. `/www/wwwroot/nreccollege.ac.in`).
2. Extract the archive.
3. Rename `.env.example` to `.env.production` and fill in your production API and site URLs.
4. Run `npm install --production` to install only necessary dependencies.
5. In aaPanel, create a new Node.js project:
   - Project directory: `/www/wwwroot/nreccollege.ac.in`
   - Run command/Startup script: `npm start`
   - Port: `3000` (or whatever you configure)
6. Set up your reverse proxy (Nginx) in aaPanel to map your domain to `http://127.0.0.1:3000`.

## Notes
- The `.next/cache` directory was intentionally omitted to save space. Next.js will rebuild its cache in production.
