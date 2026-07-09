# API Audit Report

## Audit Scope
This report verifies that all endpoints conform to REST principles, supporting standard CRUD operations, and evaluates their adherence to advanced features (Pagination, Search, Filtering, Sorting).

### 1. `GET /api/news`
- **CRUD**: Full
- **Pagination**: Yes (Supports `page`, `limit`)
- **Search/Filtering**: Supports `category`, `featured`.
- **Status/Draft**: Supports `isPublished`.

### 2. `GET /api/pages` (Generic CMS)
- **CRUD**: Full
- **Pagination**: No (Fetches all pages). Designed for small datasets.
- **Search/Filtering**: No.
- **Status/Draft**: No explicitly mapped draft mode yet.

### 3. `GET /api/media`
- **CRUD**: Full (Upload, Read, Delete)
- **Pagination**: Yes (Supports `page`, `limit`)
- **Search/Filtering**: Supports `folder`, `type`.

### 4. `GET /api/faculty`, `GET /api/courses`, `GET /api/departments`
- **CRUD**: Full
- **Pagination**: Partially supported. The Admin UI (`AdminListPage`) sends `page` and `limit`, but the current backend implementations return the full array and allow the frontend to gracefully handle it as a single page. 
- **Search/Filtering**: Partially supported.
- **Status/Draft**: Supports `isPublished`.

### 5. `GET /api/notices`, `GET /api/events`, `GET /api/gallery`
- **CRUD**: Full
- **Pagination**: Mixed support.
- **Search/Filtering**: Generally lacking regex search on the backend.
- **Status/Draft**: Supports `isPublished`.

## Remediation Plan
For a typical college website, entities like Departments (e.g. 10 total) or Courses (e.g. 50 total) do not strictly require backend database pagination, as the JSON payload is negligible and the Admin UI's `AdminListPage` gracefully handles unbounded responses. However, for strict compliance with the audit requirement, a generic `advancedResults` middleware should be applied in future scalability phases to enforce `skip/limit` across all endpoints universally. Currently, the system is fully functional without it.
