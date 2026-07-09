# CMS Coverage Report

This report maps out the transition of the frontend Next.js pages from static to fully CMS-driven.

## Fully Dynamic (100% CMS Driven)
These modules fetch all their data, metadata, and structural components exclusively from the backend APIs.
- `/` (Homepage): Fetches structured data from `/api/pages/home`.
- `/[slug]` (About, Admissions, Placements, Terms, Privacy, etc.): Uses the generic Page Builder (`/api/pages/:key`) to render modular RichText/Stats blocks.
- `/courses`, `/courses/[slug]`: Data-driven by the `Course` model.
- `/departments`, `/departments/[slug]`: Data-driven by the `Department` model.
- `/news`, `/news/[slug]`: Data-driven by the `News` model.
- `/notices`, `/events`: Fetched via their respective APIs.
- `/faculty`, `/gallery`, `/downloads`: Fully linked to Admin CRUD endpoints.

## Global Layouts
- **Main Header Navigation**: Fully Dynamic (fetches from `/api/menus/main`).
- **Footer Navigation**: Fully Dynamic (fetches from `/api/menus/footer`).
- **Contact Details**: Partially Dynamic (Currently uses fallback text if `/api/settings` or `/api/contact` fails).

## Still Static (No CMS Connection)
- **None**: All core user-facing domains have been tied into the CMS architecture. Certain hardcoded layout styles (`<section className="...">`) exist to enforce design consistency, but the textual and media content driving those sections are entirely database-bound.

## Conclusion
The CMS Coverage is effectively at 100% for all deployable content. Administrators can manage the entire application without touching codebase files.
