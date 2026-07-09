# NREC College Website - CMS Architecture

## Core Architectural Shift
The system has migrated from a scattered model approach to a **Global CMS Architecture**.

### The Big Three
1. **Media Library (`Media.ts`)**: Replaces scattered `/uploads` folders. All images, PDFs, and SVGs are uploaded here, processed into WebP (for images), and managed globally.
2. **Page Builder (`Page.ts`)**: Instead of creating a unique database model for every static page (`/about`, `/admissions`), a generic `Page` model stores SEO data and an ordered `sections` array. The frontend uses a catch-all `/[slug]/page.tsx` with a `<CmsRenderer />` to dynamically render blocks (RichText, Stats, Hero).
3. **Menu Manager (`Menu.ts`)**: Controls Main Nav and Footer Quick Links dynamically without hardcoding.

### Frameworks
- **Frontend**: Next.js App Router (React 18), TailwindCSS.
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Processing**: Multer + Sharp (WebP conversion).
