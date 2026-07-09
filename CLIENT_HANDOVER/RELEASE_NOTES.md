# RELEASE_NOTES.md
# NREC College CMS — Release Notes

---

## Version 1.0.0 — Production Release (July 2026)

**Release Type:** Major Release (Initial Production)  
**Build Date:** July 2, 2026  
**Status:** Production Ready ✅

---

### What's New in v1.0.0

#### Core CMS
- Full Admin Panel with sidebar navigation
- Dashboard with real-time stats, Quick Actions, System Information
- Welcome Tour for first-time users
- Help Center with FAQs, Glossary, and User Manual

#### Academics Management
- Departments CRUD (Create, Read, Update, Delete)
- Courses CRUD with department linking
- Faculty CRUD with photo upload
- Curriculum PDF upload and management

#### Campus Life Management
- News articles with rich content, categories, image upload
- Notice Board with PDF attachment support
- Events with date range, venue, banner image
- Gallery with albums and multi-image upload

#### Communications
- Downloads section with PDF/DOC file management
- Contact form (public) with admin view

#### Website Settings
- General settings (college name, phone, email, address, social media)
- Hero Slider / Banner management
- Logo and Favicon upload
- SEO/Search Engine settings (meta title, description, keywords)
- Footer customization

#### Navigation
- Dynamic website menu management via Admin Panel

#### Media Library
- Central file storage for all uploaded assets
- Filter by type (image/document)
- Bulk management

#### Security
- JWT Authentication with 7-day expiry
- Rate limiting (20 login attempts / 15 min)
- bcrypt password hashing
- Helmet.js security headers
- CORS restriction
- File type validation on upload

#### Developer Features
- TypeScript throughout (backend)
- Next.js 16 App Router (frontend)
- MongoDB + Mongoose (database)
- Comprehensive API documentation
- OpenAPI 3.0 specification
- Verified Postman collection
- Puppeteer PDF generation

---

### Known Limitations (v1.0.0)

| Item | Status | Planned Version |
|---|---|---|
| Multi-admin with role-based access | Not included | v1.1.0 |
| Scheduled publishing | Not included | v1.2.0 |
| Email notifications on contact form | Partial (needs SMTP config) | v1.1.0 |
| Forgot password email delivery | Partial (needs SMTP config) | v1.1.0 |
| Favicon update without redeploy | Partial | v1.1.0 |
| In-app WYSIWYG rich text editor | Basic text only | v1.2.0 |

---

### System Requirements

| Component | Minimum | Recommended |
|---|---|---|
| Node.js | v18 | v20 LTS |
| MongoDB | v5 | v6+ |
| RAM | 1 GB | 2 GB+ |
| Storage | 10 GB | 50 GB+ |
| OS | Ubuntu 20.04 | Ubuntu 22.04 |

---

## Version History

| Version | Date | Description |
|---|---|---|
| 1.0.0 | July 2026 | Initial production release |

---

## Roadmap

### v1.1.0 (Planned: Q4 2026)
- Role-based access control (Academic Admin, Content Editor, Viewer)
- SMTP email integration (contact form notifications, password reset)
- Favicon dynamic update without redeploy
- Enhanced dashboard analytics

### v1.2.0 (Planned: Q1 2027)
- Scheduled publishing (set future publish dates)
- Rich text WYSIWYG editor for news/pages
- Admission form online submission
- Student portal integration
- Backup scheduling from admin panel

### v2.0.0 (Planned: Q3 2027)
- Multi-language support (Hindi + English)
- Mobile app companion
- Advanced analytics dashboard
- Integration with university ERP systems
