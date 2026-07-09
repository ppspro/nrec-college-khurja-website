# Architecture Overview

## Tech Stack
- **Frontend**: Next.js 16 (App Router), React, Tailwind CSS, Framer Motion
- **Backend**: Express.js (Node.js), Mongoose
- **Database**: MongoDB
- **File Storage**: Local file system (uploaded via Multer & Sharp)

## Core Flow
1. **Public Site**: Pre-renders statically and dynamically using Server Components (`/[slug]`). Revalidates data from the Express backend via ISR/fetch.
2. **Admin Panel**: React client-side application living under `/admin/*`. Requires JWT Authentication stored in HttpOnly cookies/localStorage.
3. **Backend API**: Exposes JSON REST endpoints under `localhost:5000/api`. Handles role-based access, form validation, and file manipulation.

## Deployment Strategy
- Backend runs via `node src/index.js` (pm2 recommended).
- Frontend runs via `npm run start` to enable Next.js Server Side Rendering (SSR) for CMS features. Output: 'export' constraint has been removed.
