# API_DOCUMENTATION.md — NREC College CMS
**Version:** 1.0.0 | **Base URL:** `http://localhost:5000` | **Auth:** Bearer JWT Token

---

## Authentication

### POST /api/auth/login
Login and receive a JWT token.

**Request:**
```json
{
  "email": "admin@nreccollege.ac.in",
  "password": "admin@123"
}
```

**Response 200:**
```json
{
  "success": true,
  "token": "eyJhbGci...",
  "admin": {
    "id": "6a465af6...",
    "name": "NREC Admin",
    "email": "admin@nreccollege.ac.in",
    "avatar": null
  }
}
```

**Error 401:** `{ "success": false, "message": "Invalid email or password" }`  
**Error 429:** `{ "message": "Too many login attempts from this IP, please try again later." }`

---

### GET /api/auth/me
Get the current logged-in admin profile.

**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "success": true,
  "admin": {
    "_id": "6a465af6...",
    "name": "NREC Admin",
    "email": "admin@nreccollege.ac.in"
  }
}
```

---

### PUT /api/auth/profile
Update the admin profile (name, avatar).

**Headers:** `Authorization: Bearer <token>`

**Request:** `multipart/form-data` with `name` and optional `avatar` file.

---

### PUT /api/auth/change-password
Change admin password.

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "currentPassword": "admin@123",
  "newPassword": "newSecurePassword"
}
```

---

### POST /api/auth/forgot-password
Request a password reset link (requires SMTP configured).

**Request:**
```json
{ "email": "admin@nreccollege.ac.in" }
```

---

### POST /api/auth/logout
Logout (client-side token removal; stateless server).

---

## Health Check

### GET /api/health
Check if the API is running.

**Response 200:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2026-07-02T12:33:06.116Z",
  "version": "1.0.0"
}
```

---

## News

### GET /api/news
List all news articles.

**Query Params:**
- `page` (int, default: 1)
- `limit` (int, default: 10)
- `search` (string) — keyword search in title/content
- `status` (string) — `active` | `inactive`
- `category` (string)
- `sort` (string, default: `-createdAt`)

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "Annual Sports Meet 2026",
      "slug": "annual-sports-meet-2026",
      "content": "...",
      "image": "/uploads/images/news-1.jpg",
      "category": "Sports",
      "status": "active",
      "publishedAt": "2026-07-02T00:00:00.000Z",
      "createdAt": "2026-07-02T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

---

### POST /api/news (Protected)
Create a new news article.

**Headers:** `Authorization: Bearer <token>`  
**Content-Type:** `multipart/form-data`

**Fields:** `title`, `content`, `category`, `status`, `image` (file)

**Response 201:** Created news object.

---

### GET /api/news/:id
Get a single news article by ID.

---

### PUT /api/news/:id (Protected)
Update a news article.

---

### DELETE /api/news/:id (Protected)
Delete a news article.

---

## Notices

### GET /api/notices
List all notices.

**Query Params:** `page`, `limit`, `search`, `status`, `category`

---

### POST /api/notices (Protected)
Create a notice.

**Fields:** `title`, `content`, `category`, `status`, `attachment` (PDF file, optional)

---

### PUT /api/notices/:id (Protected)
Update a notice.

---

### DELETE /api/notices/:id (Protected)
Delete a notice.

---

## Events

### GET /api/events
List all events.

**Query Params:** `page`, `limit`, `search`, `status`

---

### POST /api/events (Protected)
Create an event.

**Fields:** `title`, `description`, `startDate`, `endDate`, `venue`, `status`, `image` (file)

---

### PUT /api/events/:id (Protected)
Update an event.

---

### DELETE /api/events/:id (Protected)
Delete an event.

---

## Departments

### GET /api/departments
List all departments.

---

### POST /api/departments (Protected)
Create a department.

**Fields:** `name`, `code`, `description`, `hod`, `established`, `status`, `image` (file)

---

### GET /api/departments/:slug
Get a department by slug.

---

### PUT /api/departments/:id (Protected)
Update a department.

---

### DELETE /api/departments/:id (Protected)
Delete a department.

---

## Courses

### GET /api/courses
List all courses.

**Query Params:** `page`, `limit`, `department`, `status`

---

### POST /api/courses (Protected)
Create a course.

**Fields:** `name`, `code`, `department` (dept ID), `duration`, `seats`, `eligibility`, `description`, `type`, `status`

---

### GET /api/courses/:slug
Get a course by slug.

---

### PUT /api/courses/:id (Protected)
Update a course.

---

### DELETE /api/courses/:id (Protected)
Delete a course.

---

## Faculty

### GET /api/faculty
List all faculty.

**Query Params:** `page`, `limit`, `department`, `status`

---

### POST /api/faculty (Protected)
Create a faculty record.

**Fields:** `name`, `designation`, `department`, `qualification`, `experience`, `email`, `status`, `photo` (file)

---

### PUT /api/faculty/:id (Protected)
Update a faculty record.

---

### DELETE /api/faculty/:id (Protected)
Delete a faculty record.

---

## Gallery

### GET /api/gallery
List all gallery albums.

---

### POST /api/gallery (Protected)
Create a gallery album or upload images.

**Fields:** `albumName`, `description`, `images` (multiple files)

---

### DELETE /api/gallery/:id (Protected)
Delete a gallery item.

---

## Downloads

### GET /api/downloads
List all downloadable files.

**Query Params:** `page`, `limit`, `category`, `status`

---

### POST /api/downloads (Protected)
Upload a new file.

**Fields:** `title`, `description`, `category`, `status`, `file` (PDF/DOC)

---

### DELETE /api/downloads/:id (Protected)
Delete a downloadable file.

---

## Curriculum

### GET /api/curriculum
List all curriculum entries.

---

### POST /api/curriculum (Protected)
Create a curriculum entry.

---

### PUT /api/curriculum/:id (Protected)
Update a curriculum entry.

---

### DELETE /api/curriculum/:id (Protected)
Delete a curriculum entry.

---

## Settings

### GET /api/settings
Get all website settings (college info, SEO, social media, hero sliders, homepage sections).

**Response 200:**
```json
{
  "success": true,
  "data": {
    "collegeName": "NREC College",
    "tagline": "Excellence in Education Since 1901",
    "phone": "+91-5738-200001",
    "email": "info@nreccollege.ac.in",
    "address": "NH-34, Main Road, Khurja-203131",
    "logo": "/uploads/images/logo.png",
    "favicon": "/uploads/images/favicon.ico",
    "seo": {
      "metaTitle": "NREC College Khurja | Excellence in Education",
      "metaDescription": "...",
      "keywords": ["NREC", "College", "Khurja"]
    },
    "social": {
      "facebook": "https://facebook.com/nreccollege",
      "twitter": "",
      "instagram": "",
      "youtube": ""
    },
    "heroSliders": [...]
  }
}
```

---

### PUT /api/settings (Protected)
Update website settings.

**Headers:** `Authorization: Bearer <token>`  
**Body:** JSON or multipart/form-data (for logo/favicon uploads)

---

## Media Library

### GET /api/media (Protected)
List all uploaded media files.

**Query Params:** `page`, `limit`, `type` (image | document)

---

### POST /api/media (Protected)
Upload a media file.

**Content-Type:** `multipart/form-data`  
**Fields:** `file` (required)

---

### DELETE /api/media/:id (Protected)
Delete a media file.

---

## Pages

### GET /api/pages
List all custom pages.

---

### GET /api/pages/:key
Get a single page by key (slug).

---

### PUT /api/pages/:key (Protected)
Update page content.

---

## Menus

### GET /api/menus
Get all navigation menu items.

---

### POST /api/menus (Protected)
Create a new menu item.

**Fields:** `label`, `href`, `order`, `parentId` (optional for sub-items)

---

### PUT /api/menus/:id (Protected)
Update a menu item.

---

### DELETE /api/menus/:id (Protected)
Delete a menu item.

---

## Contact

### POST /api/contact
Submit a contact form message.

**Request:**
```json
{
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "phone": "+91-9876543210",
  "message": "I want to know about admission process."
}
```

---

## Error Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 429 | Too Many Requests (rate limit) |
| 500 | Internal Server Error |

---

## Using with Postman

1. Import `College_CMS.postman_collection.json` into Postman.
2. Import `College_CMS.postman_environment.json` and select it.
3. Run "Admin Login" request first — the token is automatically saved to the environment variable `{{token}}`.
4. All protected requests will use `{{token}}` automatically.
