# Production Environment Configuration

This document lists the required environment variables for both the Frontend and Backend applications of the NREC College website. Use this as a reference when configuring environment variables in aaPanel or PM2.

---

## 1. Frontend Environment Variables
These variables must be configured in your Next.js application environment (or inside the `.env.production` file at the root of the frontend folder prior to deployment).

```env
# URL where your Backend API is hosted (without the trailing slash)
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com

# URL where the Frontend site is hosted (without the trailing slash)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## 2. Backend Environment Variables
These variables must be configured inside the Node.js project manager settings on your server (or in a `.env` file at the root of the backend folder).

```env
# The port number on which the Express server will run
PORT=5005

# The MongoDB Atlas connection string or local MongoDB URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nrec_db?retryWrites=true&w=majority

# Secret key used for signing JWT login tokens (use a long, secure random string)
JWT_SECRET=your_jwt_secret_key_here

# Optional configuration settings
NODE_ENV=production
```

---

## 3. Deployment Instructions
1. Replace all the placeholders (like `https://api.yourdomain.com`, username, password, etc.) with your actual production credentials.
2. In aaPanel Node Project Manager, make sure to add these key-value pairs in the **Environment Variables** tab of your respective frontend and backend projects.
