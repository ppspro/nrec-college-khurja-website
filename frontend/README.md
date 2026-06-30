# NREC College Website & CMS Control System

A premium, fast, and SEO-friendly university website built for **NREC College** (Naththi Mal Ram Sahai Mal Edward Coronation Post Graduate College), Khurja, Uttar Pradesh, representing its heritage since 1901.

## 🚀 Technology Stack

- **Frontend**: Next.js 15 (App Router, Tailwind CSS v4, Lucide Icons, Axios, TypeScript)
- **Backend**: Express.js, TypeScript, Mongoose, Multer (file uploads), Sharp (image optimization)
- **Database**: MongoDB

---

## 🛠️ Installation & Setup

### 1. Database Setup
Ensure you have MongoDB running locally or access to a MongoDB Atlas cluster URI.

### 2. Backend Config
1. Open a terminal in `backend/`
2. Create a `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/nrec_college
   JWT_SECRET=nrec_premium_key_2026_jwt
   NODE_ENV=development
   ```
3. Install dependencies and run seed script:
   ```bash
   npm install
   npm run seed
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Config
1. Open a terminal in `frontend/`
2. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_UPLOADS_URL=http://localhost:5000
   ```
3. Install dependencies and start local server:
   ```bash
   npm install
   npm run dev
   ```

---

## 📄 Project Folder Structure

```
├── backend/
│   ├── src/
│   │   ├── config/       # MongoDB connection setup
│   │   ├── controllers/  # API business logic
│   │   ├── middleware/   # JWT auth, Multer upload filters
│   │   ├── models/       # Mongoose Schemas (15 models)
│   │   ├── routes/       # Express route handlers
│   │   └── scripts/      # Database seeding scripts
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js App Router layout/routes
│   │   ├── components/   # UI elements, section components
│   │   ├── hooks/        # custom hooks (useAuth)
│   │   ├── lib/          # API connection interface
│   │   └── types/        # TypeScript interfaces
```

---

## 🔒 Default Credentials
- **Admin Email**: `admin@nreccollege.ac.in`
- **Password**: `admin@123`
- **Dashboard URL**: `http://localhost:3000/admin/login`

---

## ⚙️ Build & Lint Validation

To validate the frontend builds cleanly without TypeScript or linter errors:
```bash
cd frontend
npm run lint
npm run build
```
