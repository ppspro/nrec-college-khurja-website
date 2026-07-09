# NREC College - aaPanel Deployment Guide

This guide details the complete deployment process for both the Frontend (Next.js) and Backend (Node.js/Express) onto aaPanel.

## 1. Prerequisites in aaPanel
Before beginning, ensure the following are installed via the aaPanel App Store:
- **Node.js Version Manager (or Node.js Environment):** Install Node.js **v18+**.
- **PM2 Manager:** Required to keep Node.js apps running in the background.
- **Nginx:** To serve as a reverse proxy for both apps.
- **MongoDB:** (Optional) If you are not using MongoDB Atlas, you can install the local MongoDB service.

## 2. Server Folder Structure
Create a root directory for your domain, e.g., `/www/wwwroot/nreccollege.ac.in`. Inside, extract the two zip packages to form this structure:
```text
/www/wwwroot/nreccollege.ac.in/
 ├── frontend/         <-- (Extract frontend-out.zip here)
 │    ├── .next/
 │    ├── ecosystem.config.js
 │    └── .env.production
 └── backend/          <-- (Extract backend-out.zip here)
      ├── src/
      ├── ecosystem.config.js
      └── .env
```

## 3. Environment Variable Configuration
Navigate to both directories in the aaPanel File Manager and rename `.env.example`:
- **Frontend:** Rename to `.env.production` and fill in:
  ```env
  NEXT_PUBLIC_API_BASE_URL=https://api.nreccollege.ac.in/api
  NEXT_PUBLIC_SITE_URL=https://nreccollege.ac.in
  NEXT_PUBLIC_UPLOAD_URL=https://api.nreccollege.ac.in/uploads
  ```
- **Backend:** Rename to `.env` and fill in your MongoDB Atlas URI, JWT Secret, and Cloudinary keys.

## 4. Node.js Modules Installation
Open the aaPanel terminal or SSH into your server:
```bash
# Install Backend Dependencies
cd /www/wwwroot/nreccollege.ac.in/backend
npm install --production

# Install Frontend Dependencies
cd /www/wwwroot/nreccollege.ac.in/frontend
npm install --production
```

## 5. PM2 / Node.js App Manager Configuration
In aaPanel, go to **Website -> Node Project -> Add Node Project**.

**Backend Project:**
- Project directory: `/www/wwwroot/nreccollege.ac.in/backend`
- Run Command: `npm start` (or select `ecosystem.config.js`)
- Project port: `5000`
- Bind domain: `api.nreccollege.ac.in`

**Frontend Project:**
- Project directory: `/www/wwwroot/nreccollege.ac.in/frontend`
- Run Command: `npm start` (or select `ecosystem.config.js`)
- Project port: `3000`
- Bind domain: `nreccollege.ac.in`

## 6. Reverse Proxy & SSL (HTTPS) Setup
In aaPanel, click on your bound domains under Websites:
1. **SSL:** Go to the SSL tab and apply for a Let's Encrypt certificate for both domains. Enable "Force HTTPS".
2. **Reverse Proxy (Nginx):** 
   - By creating the Node project, aaPanel often auto-configures the reverse proxy. 
   - Verify that requests to `nreccollege.ac.in` proxy to `http://127.0.0.1:3000`.
   - Verify that requests to `api.nreccollege.ac.in` proxy to `http://127.0.0.1:5000`.

## 7. Changing Admin Password (Server Side)
If you are locked out or need to forcefully change the admin password on the server:
1. SSH into the server and navigate to the backend folder.
2. Run the seed script: `npm run seed` 
   - *Note: This will recreate the default admin account: `admin@nreccollege.ac.in` / `admin@123` if it was deleted.*
3. Alternatively, you can use the built-in API. Log in with the default credentials, go to Postman or the Admin panel, and hit the `PUT /api/auth/change-password` endpoint.

## Troubleshooting
- **502 Bad Gateway:** The Node.js app is not running. Check PM2 logs in aaPanel.
- **Frontend not fetching data:** Ensure `NEXT_PUBLIC_API_BASE_URL` in `.env.production` exactly matches the backend domain (e.g. `https://api.nreccollege.ac.in/api`).
- **Images not uploading:** Verify your Cloudinary credentials in the backend `.env`.
