# ADR-002: CMS Philosophy & Structured Content

- **Status:** Accepted
- **Date:** 2026-06-27
- **Deciders:** Product Owner, Lead UI/UX Engineer

---

## Context

Non-technical administrative staff require an easy-to-use CMS to maintain college notices, news, faculty profiles, and departmental details. Traditional CMS systems often provide drag-and-drop page builders.

## Decision

We decided to build a **Predefined-Content CMS** with strict form schemas and intentionally exclude generic drag-and-drop page builders or freeform HTML editors.

## Alternatives Considered

1. **Drag-and-Drop Page Builder (e.g., Gutenberg / Elementor / GrapeJS integration):**
   - *Pros:* Complete layout freedom for non-technical users.
   - *Cons:* Frequently violates visual design consistency; creates responsive design breakages on mobile devices; produces bloated, non-semantic HTML output detrimental to SEO and accessibility.
2. **Headless CMS Platform (e.g., Strapi, Sanity):**
   - *Pros:* Ready-made administrative dashboard.
   - *Cons:* Third-party vendor lock-in; higher operational resource footprint; complex custom styling integration for college specific data schema.

## Consequences

- **Positive:** Guarantees 100% adherence to institutional design standards (`#990A25` primary, `#C6A04D` accent, Inter/Playfair typography); simplifies database validation via Zod and Mongoose schemas; eliminates accidental UI layout destruction by campus users.
- **Negative:** Structural changes to web page layouts require developer intervention.

## Review Notes

The predefined-content approach has proven highly successful during Phase 7 content population and will be maintained throughout Version 1.x.
