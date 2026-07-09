# aaPanel Production Deployment Guide

This guide provides step-by-step instructions on deploying the NREC College website's Frontend and Backend projects to a Linux server managed via **aaPanel** using the **Node.js Version Manager** and **PM2**.

---

## Prerequisites
1. **aaPanel** installed on your VPS.
2. **App Store** -> Install **PM2 Manager** or **Node.js Version Manager** (version 18+ or 20+).
3. **MongoDB** instance installed on aaPanel or a MongoDB Atlas URI ready.

---

## Step 1: Deploying the Backend

1. **Upload files**:
   * Upload `backend.zip` to the directory on your server (e.g., `/www/wwwroot/api.nreccollege.ac.in`).
   * Extract the ZIP archive using aaPanel file manager.
2. **Configure Node Project**:
   * Go to **Website** -> **Node Project** in aaPanel.
   * Click **Add Node Project**.
   * Fill out the project details:
     * **Path**: `/www/wwwroot/api.nreccollege.ac.in`
     * **Run Command**: `npm run start` or point to `src/server.ts` / `dist/server.js` (PM2 is preconfigured via `ecosystem.config.js` to run `npm start`).
     * **Port**: `5000` (Make sure to open this port in aaPanel **Security** tab).
     * **User**: `www`
3. **Environment Variables**:
   * Create a `.env` file in the backend root directory (or use aaPanel environment variable settings) and populate the values as described in `ENV_CONFIGURATION.md`:
     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     NODE_ENV=production
     ```
4. **Start the project**:
   * Click **Confirm** / **Start**.
   * Run `npm run seed` if this is a fresh setup to initialize the default admin accounts.

---

## Step 2: Deploying the Frontend

1. **Upload files**:
   * Upload `frontend-out.zip` to your frontend directory on the server (e.g., `/www/wwwroot/nreccollege.ac.in`).
   * Extract the files.
2. **Configure Node Project**:
   * Go to **Website** -> **Node Project** -> **Add Node Project**.
     * **Path**: `/www/wwwroot/nreccollege.ac.in`
     * **Run Command**: `npm run start` (runs the Next.js server)
     * **Port**: `3000`
     * **User**: `www`
3. **Environment Variables**:
   * Provide the following variables in your Next.js project settings:
     ```env
     NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
     NEXT_PUBLIC_SITE_URL=https://yourdomain.com
     ```
4. **Proxy / Domain Configuration**:
   * In aaPanel, map your domain (e.g., `nreccollege.ac.in`) to the Node.js project. Under settings, configure reverse proxy (default configured by aaPanel Node Project Manager) to redirect external traffic on port 80/443 to the internal port 3000.

---

## Restarting and Maintenance
To restart or stop your processes, you can manage them directly inside the **PM2 Manager** app in aaPanel or via command line:
```bash
# Restart backend
pm2 restart backend

# Restart frontend
pm2 restart frontend
```
