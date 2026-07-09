# Deployment Guide

## Prerequisites
- Node.js (v18+)
- MongoDB Database (Atlas or local)
- PM2 (for backend process management)
- Nginx/Apache (Reverse Proxy)

## Backend Deployment
1. `cd backend`
2. `npm install`
3. `npm run build`
4. Configure `.env`
5. `pm2 start dist/index.js --name nrec-backend`

## Frontend Deployment (Static Export)
1. `cd frontend`
2. `npm install`
3. Configure `.env.production`
4. `npm run build`
5. Serve the `out/` directory using Nginx or aaPanel.
