# NREC College Khurja Website

Official redevelopment of the NREC College Khurja website, integrating a dynamic CMS architecture and a premium higher education UI/UX system.

## Overview
This portal serves as the primary digital gateway for NREC College Khurja (established in 1901), Bulandshahr District, Uttar Pradesh. It replaces outdated static structures with a high-performance Next.js frontend driven by structured admin APIs, delivering Naac-accredited university standards.

## Technology Stack
- **Frontend Framework:** Next.js (TypeScript, React)
- **Styling Engine:** Tailwind CSS & Vanilla CSS Design Tokens
- **Backend Architecture:** Node.js, Express, MongoDB (Strapi CMS integration)
- **Deployment Build:** Static Site Generation (SSG) with ISR fallback

## Features
- ✔ **129 Verified Static Routes:** High speed pre-rendered routes covering all departments, faculty profiles, and facilities.
- ✔ **Smart Template Engine:** Custom-designed layouts for various page scopes (Heritage, People, Academic, Campus, Student, Document).
- ✔ **Full-Width Mega Menu:** Dynamic, clean multi-column navigation panels.
- ✔ **Professional Empty States:** Safe placeholders protecting from unpopulated database states.
- ✔ **Responsive Design:** Optimized layouts for Ultra-Wide, Desktop, Tablet, and Mobile screens.

## Architecture

### Frontend
Built on Next.js App Router. The routing maps paths dynamically through `[slug]/page.tsx` and template resolvers, applying specialized branding aesthetics for college portals.

### Backend CMS
Manages college settings, notice updates, events registries, departments listings, and faculty directories through REST endpoints.

### Admin Panel
Fully integrated dashboard for updating sliders, notices, download files, and department details.

## Deployment Notes
Run the production compiler locally:
```bash
npm install
npm run build
```
The optimized bundle will be generated under the `.next/` or `/out` folders.
