# NREC College Website — aaPanel Deployment Guide

## Prerequisites

- aaPanel installed on your server
- Node.js 18+ installed via aaPanel App Store
- MongoDB (local) OR MongoDB Atlas account (recommended)
- PM2 installed globally: `npm install -g pm2`
- Domain name configured and pointing to your server

---

## Step 1 — Upload Files

1. Upload `backend_out.zip` to `/www/wwwroot/nrec-backend/`
2. Upload `frontend_out.zip` to `/www/wwwroot/nrec-frontend/`
3. Extract both ZIP files

---

## Step 2 — Backend Setup

```bash
cd /www/wwwroot/nrec-backend

# Install dependencies
npm install --production

# Create production environment file
cp .env.production .env

# Edit .env and update:
# - JWT_SECRET (generate a random 64-character string)
# - FRONTEND_URL (your actual frontend URL, e.g. https://nreccollege.ac.in)
# - CORS_ORIGIN (same as FRONTEND_URL)
# - MONGODB_URI (already configured for Atlas)
nano .env

# Build TypeScript
npm run build

# Create logs directory
mkdir -p logs

# Create uploads directory
mkdir -p uploads

# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

---

## Step 3 — Frontend Setup

```bash
cd /www/wwwroot/nrec-frontend

# Install dependencies
npm install

# Create production environment file
cp .env.production .env.local

# Edit .env.local and update:
# - NEXT_PUBLIC_API_URL (e.g. https://api.nreccollege.ac.in/api)
# - NEXT_PUBLIC_UPLOADS_URL (e.g. https://api.nreccollege.ac.in)
nano .env.local

# Build the Next.js application
npm run build

# Start the frontend with PM2
pm2 start npm --name "nrec-frontend" -- start

# Save PM2 process list
pm2 save
```

---

## Step 4 — Reverse Proxy Configuration (aaPanel → Nginx)

### Backend API (port 5000)

In aaPanel, create a new website for your API domain (e.g. `api.nreccollege.ac.in`).

Go to **Website Settings → Reverse Proxy** and add:

```
Target URL: http://127.0.0.1:5000
```

Or manually edit the Nginx config:

```nginx
server {
    listen 80;
    server_name api.nreccollege.ac.in;

    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static uploads
    location /uploads/ {
        alias /www/wwwroot/nrec-backend/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### Frontend (port 3000)

In aaPanel, create a new website for your frontend domain (e.g. `nreccollege.ac.in`).

```nginx
server {
    listen 80;
    server_name nreccollege.ac.in www.nreccollege.ac.in;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Step 5 — SSL Configuration

In aaPanel:

1. Go to **Website Settings** for each domain
2. Click **SSL**
3. Select **Let's Encrypt**
4. Click **Apply** to get a free SSL certificate
5. Enable **Force HTTPS**

---

## Step 6 — Seed Database (First Time Only)

```bash
cd /www/wwwroot/nrec-backend

# Run the seed script to populate initial data
node dist/scripts/seed.js
```

> [!IMPORTANT]
> This creates the default admin account. Check the seed script for credentials and change the password immediately after first login.

---

## Step 7 — Verify Deployment

1. Visit `https://nreccollege.ac.in` — homepage should load
2. Visit `https://api.nreccollege.ac.in/api/health` — should return OK
3. Visit `https://nreccollege.ac.in/admin/login` — admin login should work
4. Test all admin modules (CRUD operations)
5. Verify image uploads work
6. Verify all public pages render correctly

---

## Maintenance Commands

```bash
# View logs
pm2 logs nrec-backend
pm2 logs nrec-frontend

# Restart services
pm2 restart nrec-backend
pm2 restart nrec-frontend

# Monitor processes
pm2 monit

# Update backend
cd /www/wwwroot/nrec-backend
git pull  # or upload new files
npm install --production
npm run build
pm2 restart nrec-backend

# Update frontend
cd /www/wwwroot/nrec-frontend
git pull  # or upload new files
npm install
npm run build
pm2 restart nrec-frontend
```

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Backend won't start | Check `.env` file exists and `dist/` folder contains compiled JS |
| Frontend build fails | Verify `.env.local` has correct API URLs |
| MongoDB connection error | Verify Atlas whitelist includes your server IP (or use `0.0.0.0/0` for all) |
| Uploads not showing | Verify `uploads/` directory exists and has write permissions |
| 502 Bad Gateway | Check PM2 status: `pm2 status` and restart if needed |
| CORS errors | Verify `CORS_ORIGIN` in backend `.env` matches your frontend URL exactly |
