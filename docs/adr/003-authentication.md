# ADR-003: Authentication & Single Administrator Model

- **Status:** Accepted
- **Date:** 2026-06-27
- **Deciders:** Security Lead, Lead Backend Developer

---

## Context

Version 1.x focuses on establishing the institutional public presentation website and a streamlined CMS for core administrators. A secure, low-overhead authentication architecture is needed.

## Decision

We decided to implement **Stateless JWT Authentication** bound to a **Single Administrator Model** (`Admin` database schema) for Version 1.x, deferring multi-user Role-Based Access Control (RBAC).

## Alternatives Considered

1. **Multi-Tenant RBAC (Role-Based Access Control) with OAuth2 / OIDC:**
   - *Pros:* Granular permissions per department head.
   - *Cons:* Significant architectural complexity for Version 1.x; deferred core public feature delivery; unnecessary overhead before student/faculty portals exist.
2. **Session-based Authentication (Express-Session + Redis):**
   - *Pros:* Immediate server-side session revocation.
   - *Cons:* Introduced external Redis infrastructure requirement, complicating Docker container deployment.

## Consequences

- **Positive:** Lightweight, stateless REST API validation (`Authorization: Bearer <token>`); simple deployment footprint without Redis dependency; fast administration workflow.
- **Negative:** Administrative password changes or security invalidations require changing the server-side `JWT_SECRET`.

## Review Notes

Multi-user RBAC and student/faculty authentication will be formally architected under Version 2.0.
