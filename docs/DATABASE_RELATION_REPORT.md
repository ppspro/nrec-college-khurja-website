# Database Relation Report

This document outlines the MongoDB architecture, Mongoose schemas, relations, and index optimizations.

## Collections & Indexes

### 1. Admin (`admins`)
- **Fields**: `email`, `password`, `name`, `role`, `createdAt`
- **Relations**: None (Independent Auth model).
- **Indexes**: `email` (Unique).

### 2. Course (`courses`)
- **Fields**: `name`, `slug`, `type`, `department`, `duration`, `intake`, `description`, `eligibility`, `isPublished`
- **Relations**: `department` (ObjectId -> `Department`)
- **Indexes**: `slug` (Unique), `department` (Indexed for fast lookups).

### 3. Department (`departments`)
- **Fields**: `name`, `slug`, `description`, `headOfDepartment`, `establishedYear`
- **Relations**: Unidirectional from `Course` and `Faculty`.
- **Indexes**: `slug` (Unique).

### 4. Faculty (`faculties`)
- **Fields**: `name`, `designation`, `department`, `qualification`, `email`, `image`, `order`, `isPublished`
- **Relations**: `department` (ObjectId -> `Department`).
- **Indexes**: `department` (For filtering), `order` (For sorting).

### 5. Media (`media`)
- **Fields**: `filename`, `originalName`, `mimetype`, `size`, `url`, `folder`, `uploadedBy`
- **Relations**: `uploadedBy` (ObjectId -> `Admin`).
- **Indexes**: `folder`, `createdAt`.

### 6. Menu (`menus`)
- **Fields**: `key`, `name`, `items` (nested array of links/children).
- **Relations**: None. Used globally.
- **Indexes**: `key` (Unique).

### 7. Page (`pages`)
- **Fields**: `key`, `title`, `sections` (Array), `seoTitle`, `seoDescription`, `ogImage`
- **Relations**: None. Independent modular structures.
- **Indexes**: `key` (Unique).

### 8. Settings (`settings`)
- **Fields**: Singleton record containing global settings (SMTP, Analytics, Maintenance Mode).
- **Relations**: None.
- **Indexes**: None required.

### 9. News, Notices, Events (`news`, `notices`, `events`)
- **Fields**: `title`, `slug`, `content`, `date`, `isPublished`, `isFeatured`, `attachments`
- **Relations**: None (Independent feed models).
- **Indexes**: `slug` (Unique), `isPublished`, `date` (For feed sorting).

## Verification
- Relational integrity is enforced at the controller level (e.g. deleting a department should warn if courses depend on it, though Mongoose lacks strict cascading deletes by default).
- Read performance is highly optimized via `slug` indexes.
