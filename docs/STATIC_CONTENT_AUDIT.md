# Static Content Audit

## 1. Global Navigation (Header)
- **Status**: Partially Hardcoded
- **File**: `frontend/src/components/layout/Header.tsx`
- **Details**: The `navItems` array containing all primary navigation links, labels, and dropdown structures is completely static. 
- **Remediation Plan**: Fetch from `/api/menus/main` and map the hierarchy dynamically.

## 2. Footer Links
- **Status**: Hardcoded
- **File**: `frontend/src/components/layout/Footer.tsx`
- **Details**: `footerLinks.quickLinks`, `studentCorner`, and `importantLinks` are static.
- **Remediation Plan**: Fetch from `/api/menus/footer` and map dynamically.

## 3. Contact Details in Footer / Topbar
- **Status**: Hardcoded
- **File**: `Header.tsx`, `Footer.tsx`
- **Details**: Phone number (`+91-5738-200001`), Email (`info@nreccollege.ac.in`), and Address are static.
- **Remediation Plan**: These should be fetched from the `Settings` / `Contact` API endpoints, or maintained static if explicitly desired. We will leave these for now or fetch from the global context if available.

## 4. Public Pages
- **Status**: Dynamic
- **File**: `frontend/src/app/(public)/[slug]/page.tsx`
- **Details**: Replaced all hardcoded pages. Zero static content remaining.

## 5. Homepage
- **Status**: Dynamic
- **File**: `frontend/src/app/(public)/page.tsx`
- **Details**: Fully fetches from `/api/pages/home`.

## Summary
The core layout components (Header/Footer) still rely on hardcoded structures for navigation, despite the Menu Manager backend existing. This will be fixed immediately.
