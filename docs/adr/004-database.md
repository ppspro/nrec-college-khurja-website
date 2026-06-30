# ADR-004: Database Engine Selection (MongoDB with Mongoose)

- **Status:** Accepted
- **Date:** 2026-06-27
- **Deciders:** Database Engineer, Backend Architect

---

## Context

The platform handles unstructured and semi-structured academic data, including rich-text announcements, nested syllabus structures, course lists, and varied media galleries.

## Decision

We decided to utilize **MongoDB 6.0 with Mongoose ODM (Object Data Modeling)** as the primary database engine.

## Alternatives Considered

1. **Relational Database (PostgreSQL / MySQL + Prisma ORM):**
   - *Pros:* Strict relational constraints and ACID transactions across tables.
   - *Cons:* Rigid schema migrations for evolving document downloads, dynamic syllabus structures, and gallery metadata; higher setup complexity for semi-structured JSON payloads.
2. **Embedded Database (SQLite):**
   - *Pros:* Zero separate container overhead.
   - *Cons:* Poor concurrent write handling during peak traffic; complicated volume locking in container environments.

## Consequences

- **Positive:** Seamless JSON document manipulation matching Express/TypeScript interfaces; flexible schema evolution for future academic modules; native container support via official `mongo:6.0` image.
- **Negative:** Lack of multi-document ACID transactions (unnecessary for single-admin CMS write patterns in v1.x).

## Review Notes

MongoDB performance and index optimizations will be reviewed quarterly in accordance with `MAINTENANCE_PLAN.md`.
