# NREC College Website — Dynamic vs Static Page Mapping

## Legend
- **Static**: Content is hardcoded in the frontend, not editable from admin
- **Dynamic**: Content is fetched from the backend API and editable via admin panel
- **Hybrid**: Some content is static (layout), some is dynamic (data)

---

## Public Pages

| Page | Route | Type | API Endpoint | Admin Editable | Database Collection |
|------|-------|------|-------------|----------------|-------------------|
| Homepage | `/` | Dynamic | `GET /api/pages/home`, `/api/sliders`, `/api/courses?featured=true`, `/api/departments`, `/api/news?limit=3`, `/api/notices?limit=5` | ✅ Yes (Homepage Manager, Sliders, all sections) | `pages`, `sliders`, `courses`, `departments`, `news`, `notices` |
| About | `/about` | Dynamic | `GET /api/pages/about` | ✅ Yes (Pages Manager) | `pages` |
| Contact | `/contact` | Hybrid | `POST /api/contact` | ❌ Layout is static, form submits to API | — |
| Courses List | `/courses` | Dynamic | `GET /api/courses` | ✅ Yes (Courses Manager) | `courses` |
| Course Detail | `/courses/[slug]` | Dynamic | `GET /api/courses/:slug` | ✅ Yes (Courses Manager) | `courses` |
| Departments List | `/departments` | Dynamic | `GET /api/departments` | ✅ Yes (Departments Manager) | `departments` |
| Department Detail | `/departments/[slug]` | Dynamic | `GET /api/departments/:slug` | ✅ Yes (Departments Manager) | `departments` |
| Faculty | `/faculty` | Dynamic | `GET /api/faculty` | ✅ Yes (Faculty Manager) | `faculty` |
| News List | `/news` | Dynamic | `GET /api/news` | ✅ Yes (News Manager) | `news` |
| News Detail | `/news/[slug]` | Dynamic | `GET /api/news/:slug` | ✅ Yes (News Manager) | `news` |
| Notices | `/notices` | Dynamic | `GET /api/notices` | ✅ Yes (Notices Manager) | `notices` |
| Events | `/events` | Dynamic | `GET /api/events` | ✅ Yes (Events Manager) | `events` |
| Gallery | `/gallery` | Dynamic | `GET /api/gallery` | ✅ Yes (Gallery Manager) | `gallery` |
| Downloads | `/downloads` | Dynamic | `GET /api/downloads` | ✅ Yes (Downloads Manager) | `downloads` |
| Curriculum | `/curriculum` | Dynamic | `GET /api/curriculum` | ✅ Yes (Curriculum Manager) | `curriculum` |
| Admissions | `/admissions` | Dynamic | `GET /api/pages/admissions` | ✅ Yes (Pages Manager) | `pages` |
| Dynamic Pages | `/[slug]` | Dynamic | `GET /api/pages/:slug` | ✅ Yes (Pages Manager) | `pages` |

---

## Admin Pages

| Page | Route | Type | API Endpoint | Notes |
|------|-------|------|-------------|-------|
| Admin Login | `/admin/login` | Hybrid | `POST /api/auth/login` | Static form, dynamic auth |
| Dashboard | `/admin/dashboard` | Dynamic | `GET /api/dashboard/stats` | Admin-only |
| Homepage Manager | `/admin/homepage` | Dynamic | `GET/PUT /api/pages/home` | Edit hero, sections, stats |
| Courses Manager | `/admin/courses` | Dynamic | CRUD `/api/courses` | Full CRUD |
| Departments Manager | `/admin/departments` | Dynamic | CRUD `/api/departments` | Full CRUD |
| Faculty Manager | `/admin/faculty` | Dynamic | CRUD `/api/faculty` | Full CRUD |
| News Manager | `/admin/news` | Dynamic | CRUD `/api/news` | Full CRUD |
| Notices Manager | `/admin/notices` | Dynamic | CRUD `/api/notices` | Full CRUD |
| Events Manager | `/admin/events` | Dynamic | CRUD `/api/events` | Full CRUD |
| Gallery Manager | `/admin/media` | Dynamic | CRUD `/api/gallery` | Full CRUD |
| Downloads Manager | `/admin/downloads` | Dynamic | CRUD `/api/downloads` | Full CRUD |
| Curriculum Manager | `/admin/curriculum` | Dynamic | CRUD `/api/curriculum` | Full CRUD |
| Pages Manager | `/admin/pages` | Dynamic | CRUD `/api/pages` | Full CRUD |
| Menu Manager | `/admin/menus` | Dynamic | CRUD `/api/menus` | Full CRUD |
| Settings | `/admin/settings` | Dynamic | `GET/PUT /api/settings` | Site-wide settings |
| Help / User Manual | `/admin/help` | Static | — | Opens Admin_User_Manual.html |

---

## API Endpoints Summary

### Public APIs (No Auth Required)
- `GET /api/pages/:slug` — Fetch page content
- `GET /api/sliders` — Fetch hero sliders
- `GET /api/courses` — List courses (with filtering)
- `GET /api/courses/:slug` — Course detail
- `GET /api/departments` — List departments
- `GET /api/departments/:slug` — Department detail
- `GET /api/faculty` — List faculty members
- `GET /api/news` — List news articles
- `GET /api/news/:slug` — News detail
- `GET /api/notices` — List notices
- `GET /api/events` — List events
- `GET /api/gallery` — List gallery items
- `GET /api/downloads` — List downloadable files
- `GET /api/curriculum` — List curriculum items
- `GET /api/menus/:name` — Get navigation menu
- `POST /api/contact` — Submit contact form

### Auth APIs
- `POST /api/auth/login` — Admin login
- `GET /api/auth/me` — Get current user profile

### Admin APIs (JWT Auth Required)
- All CRUD operations on: courses, departments, faculty, news, notices, events, gallery, downloads, curriculum, pages, menus, settings, sliders
- `POST /api/upload` — Media upload
- `GET /api/dashboard/stats` — Dashboard statistics
