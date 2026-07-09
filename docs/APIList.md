# API Endpoints List

## CMS Core
- `GET /api/pages` - List all generic pages.
- `GET /api/pages/:key` - Get generic page with modular sections array.
- `PUT /api/pages/:key` - Create/Update generic page.
- `DELETE /api/pages/:key` - Delete generic page.

## Media Library
- `GET /api/media` - Get paginated media (search, filter by type/folder).
- `POST /api/media` - Upload multiple files (supports WebP processing).
- `DELETE /api/media/:id` - Remove media file.

## Menu Manager
- `GET /api/menus` - Get all menus.
- `GET /api/menus/:key` - Get specific menu (main, footer).
- `PUT /api/menus/:key` - Update menu hierarchy.

## Pre-existing Modules
- `/api/courses`
- `/api/departments`
- `/api/events`
- `/api/faculty`
- `/api/gallery`
- `/api/news`
- `/api/notices`
- `/api/settings` - Global site configurations (SMTP, Analytics, Maintenance Mode).
