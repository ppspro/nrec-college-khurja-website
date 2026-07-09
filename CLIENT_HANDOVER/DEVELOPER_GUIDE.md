# DEVELOPER_GUIDE.md
# NREC College CMS — Developer Guide

**Version:** 1.0.0 | **Stack:** Next.js + Express + MongoDB

---

## Architecture Overview

```
nrec-college-website/
├── frontend/          # Next.js 16 (App Router) — Port 3000
│   ├── src/app/       # Pages & API routes
│   ├── src/components/ # Reusable components
│   └── src/lib/       # API client, utilities
├── backend/           # Express.js API — Port 5000
│   ├── src/controllers/  # Business logic
│   ├── src/models/       # Mongoose schemas
│   ├── src/routes/       # API route definitions
│   ├── src/middleware/   # Auth, error handling
│   └── uploads/          # Uploaded files (static)
├── CLIENT_HANDOVER/   # Documentation package
├── docs/              # Architecture & API docs
└── scripts/           # Utility scripts
```

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | v18+ |
| npm | v9+ |
| MongoDB | v6+ (local or Atlas) |

---

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd nrec-college-website
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Configure Backend Environment
Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nrec_college
JWT_SECRET=your-super-secret-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Build Backend
```bash
npm run build
```

### 5. Seed the Database
```bash
npm run seed
```
This creates the default admin account: `admin@nreccollege.ac.in` / `admin@123`

### 6. Start Backend
```bash
npm run dev        # Development (auto-reload)
npm start          # Production (requires build)
```

### 7. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 8. Configure Frontend Environment
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 9. Start Frontend
```bash
npm run dev        # Development
npm run build      # Production build
npm start          # Production server
```

---

## Database Schema Summary

### Admin
```typescript
{
  name: string,
  email: string (unique),
  password: string (bcrypt hash),
  avatar: string | null,
  createdAt: Date
}
```

### News / Notice / Event (common pattern)
```typescript
{
  title: string,
  slug: string (auto-generated),
  content: string,
  image: string (file path),
  category: string,
  status: 'active' | 'inactive',
  publishedAt: Date,
  createdAt: Date, updatedAt: Date
}
```

### Department
```typescript
{
  name: string, code: string, slug: string,
  description: string, hod: string,
  established: string, image: string,
  status: 'active' | 'inactive'
}
```

### Course
```typescript
{
  name: string, code: string, slug: string,
  department: ObjectId (ref: Department),
  duration: string, seats: number,
  eligibility: string, description: string,
  type: 'UG' | 'PG' | 'Diploma' | 'Certificate',
  status: 'active' | 'inactive'
}
```

### Faculty
```typescript
{
  name: string, designation: string,
  department: ObjectId (ref: Department),
  qualification: string, experience: string,
  email: string, photo: string,
  displayOrder: number,
  status: 'active' | 'inactive'
}
```

### Settings (singleton document)
```typescript
{
  collegeName: string, tagline: string,
  phone: string, email: string, address: string,
  logo: string, favicon: string,
  seo: { metaTitle, metaDescription, keywords[] },
  social: { facebook, twitter, instagram, youtube },
  heroSliders: [{ title, subtitle, image, buttonText, buttonLink, order, status }],
  footerText: string
}
```

---

## Key API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | /api/health | No | Health check |
| POST | /api/auth/login | No | Admin login |
| GET | /api/auth/me | Yes | Get profile |
| PUT | /api/auth/profile | Yes | Update profile |
| PUT | /api/auth/change-password | Yes | Change password |
| GET | /api/news | No | List news |
| POST | /api/news | Yes | Create news |
| PUT | /api/news/:id | Yes | Update news |
| DELETE | /api/news/:id | Yes | Delete news |
| GET | /api/settings | No | Get settings |
| PUT | /api/settings | Yes | Update settings |
| GET | /api/media | Yes | List media |
| POST | /api/media | Yes | Upload file |

---

## Authentication

The API uses JWT Bearer tokens.

**Login flow:**
1. POST /api/auth/login → receive `token`
2. Include in subsequent requests: `Authorization: Bearer <token>`
3. Token expires after 7 days
4. Rate limit: 20 login attempts per 15 minutes per IP

---

## File Uploads

- Files stored in `backend/uploads/` directory
- Served statically at `http://localhost:5000/uploads/`
- Max file size: 50MB
- Image files are processed with Sharp for optimization
- Accepted types: JPG, PNG, WebP, GIF, PDF, DOC, DOCX

---

## Frontend Data Fetching

The frontend uses Next.js ISR (Incremental Static Regeneration):

```typescript
// Example: pages with 5-minute revalidation
export const revalidate = 300; // 5 minutes

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`);
  return res.json();
}
```

Admin pages use client-side fetching with the `useAuth` hook:
```typescript
const { admin, loading, token } = useAuth();
// Redirects to /admin/login if not authenticated
```

---

## Rate Limiting Configuration

```typescript
// Global: 1000 requests / 15 min per IP
// Auth: 20 attempts / 15 min per IP
```

To adjust, modify `backend/src/index.ts`.

---

## Adding a New Module

1. Create Mongoose model in `backend/src/models/`
2. Create controller in `backend/src/controllers/`
3. Create route in `backend/src/routes/`
4. Register route in `backend/src/index.ts`
5. Build backend: `npm run build`
6. Create admin form component in `frontend/src/components/admin/`
7. Create admin list/edit pages in `frontend/src/app/admin/`
8. Add to sidebar in `frontend/src/components/admin/AdminSidebar.tsx`
9. Create public page in `frontend/src/app/`

---

## Deployment

See `CLIENT_HANDOVER/DEPLOYMENT_GUIDE.md` for complete deployment instructions.

**Quick production checklist:**
- [ ] Set `NODE_ENV=production`
- [ ] Set strong `JWT_SECRET`
- [ ] Set production `MONGODB_URI`
- [ ] Configure SMTP for forgot password emails
- [ ] Set `FRONTEND_URL` to production domain
- [ ] Enable HTTPS with SSL certificates
- [ ] Set up MongoDB backups

---

## PDF Generation

To regenerate the Admin User Manual PDF:
```bash
node scripts/generate-pdf.js
```
Requires Puppeteer (`npm install puppeteer` in root).

---

## Useful Commands

```bash
# Backend
npm run dev          # Start with auto-reload
npm run build        # Compile TypeScript
npm run seed         # Seed database
npm start            # Start compiled server

# Frontend  
npm run dev          # Development server
npm run build        # Production build
npm start            # Production server (after build)
npm run lint         # Run ESLint

# Utilities
node scripts/generate-pdf.js   # Generate PDF manual
```
