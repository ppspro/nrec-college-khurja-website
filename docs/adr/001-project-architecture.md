# ADR-001: Project Architecture Selection

- **Status:** Accepted
- **Date:** 2026-06-27
- **Deciders:** Lead Architect, Software Engineering Team

---

## Context

The NREC College platform requires a modern, responsive, highly reliable web architecture to replace legacy static content. The solution must support both public institutional presentation (high speed, SEO optimized) and a streamlined administrative Content Management System (CMS) for campus staff.

## Decision

We decided to adopt a decoupled full-stack architecture comprising:
- **Frontend:** Next.js (App Router, React 19, TypeScript, Tailwind CSS 4)
- **Backend API:** Express.js (Node.js 22 runtime, TypeScript)
- **Database:** MongoDB 6.0 with Mongoose ODM
- **API Interface:** RESTful JSON HTTP APIs

## Alternatives Considered

1. **Monolithic Next.js (Server-Side Rendering + API Routes):**
   - *Pros:* Single repository, unified build step.
   - *Cons:* Tight coupling of CMS database operations with public presentation rendering; higher cold-start overhead for admin operations; complex container scaling boundaries.
2. **PHP / WordPress Monolith:**
   - *Pros:* Traditional college CMS solution, quick initial deployment.
   - *Cons:* Security vulnerability surface, poor TypeScript integration, difficult CI/CD container automation, maintenance overhead.

## Consequences

- **Positive:** Clear separation of concerns between presentation and business logic; independent scalability of frontend and backend services; strong type safety across the entire stack using TypeScript.
- **Negative:** Dual build pipelines and package management configurations (`frontend/` and `backend/`).

## Review Notes

Architecture performance and API contract stability will be evaluated prior to initiating Phase 2.0 interactive portals.
