# Changelog

All notable changes to the NREC College Website project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- GitHub Actions CI pipeline (build, lint, TypeScript check, Docker build)
- GitHub Actions release pipeline (Docker image publish to GHCR)
- GitHub Actions security scanning (npm audit, CodeQL, Gitleaks)
- Dependabot configuration for automated dependency updates
- `CONTRIBUTING.md` – contributor guide
- `SECURITY.md` – responsible disclosure policy
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/bug_report.yml`
- `.github/ISSUE_TEMPLATE/feature_request.yml`
- `CHANGELOG.md`

---

## [v1.0.1] – 2026-06-27

### Added
- Docker multi-stage Dockerfile for frontend (Next.js)
- Docker multi-stage Dockerfile for backend (Express.js)
- `docker-compose.yml` for local development
- `docker-compose.prod.yml` for production deployment
- MongoDB persistent volume (`mongo_data`)
- Uploads persistent volume (`uploads_data`)
- Health checks for all three services
- `docs/DOCKER.md` – Docker usage guide
- Product Roadmap document (`docs/ROADMAP.md`)
- Technical Design Specification (`docs/TDS.md`)
- Deployment & Handover Guide (`docs/DEPLOYMENT.md`)

### Changed
- `/api/health` response schema updated to include `success`, `status`, `timestamp`, `version`
- Frontend Docker health check updated to use Node.js HTTP script (BusyBox wget compatibility)
- Host port mappings adjusted to avoid local conflicts (3001:3000, 5001:5000)
- Base image updated to `node:22-alpine` for Next.js 16.2.9 engine compliance

### Fixed
- TypeScript compilation errors resolved in backend source
- Frontend production build warnings resolved

---

## [v1.0.0] – 2026-06-20

### Added

#### Public Website
- Homepage with hero slider, welcome message, principal's message, statistics, departments, notices, news, events, gallery, CTA
- About page (history, vision, mission, management, NAAC, affiliation)
- Academics page (departments, courses, curriculum)
- Admissions page
- Faculty listing and detail pages
- Notices, News, Events pages
- Downloads page
- Gallery page
- Contact page

#### Admin CMS
- Admin dashboard
- Homepage content management
- Website settings
- Department management (CRUD)
- Course management (CRUD)
- Faculty management (CRUD)
- Notice management (CRUD)
- News management (CRUD)
- Event management (CRUD)
- Downloads management (CRUD)
- Curriculum management
- Gallery management
- Contact information management

#### Technical
- Next.js 16 frontend with App Router
- Express.js 4 backend with TypeScript
- MongoDB with Mongoose ODM
- JWT authentication (single administrator)
- File upload with Multer and Sharp image optimization
- REST API
- Responsive design with Tailwind CSS 4
- Framer Motion animations
- SEO-ready (meta tags, semantic HTML)
- TypeScript strict mode (frontend and backend)
- ESLint configuration
- Production build validation

---

[Unreleased]: https://github.com/<your-org>/nrec-college-website/compare/v1.0.1...HEAD
[v1.0.1]: https://github.com/<your-org>/nrec-college-website/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/<your-org>/nrec-college-website/releases/tag/v1.0.0
