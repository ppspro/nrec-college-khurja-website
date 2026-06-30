# ADR-008: Version 1.x LTS Baseline & Lifecycle Management

- **Status:** Accepted
- **Date:** 2026-06-27
- **Deciders:** IT Advisory Board, Lead Architect

---

## Context

Following completion of Phase 10 (Operations) and Phase 11 (Governance), the platform reached a stable, production-ready milestone (`v1.0.1`). Clear rules are needed regarding future code modifications.

## Decision

We decided to establish **Version 1.0.1 as the formal Long-Term Support (LTS) Baseline** under a strict **Feature Freeze** policy for the 1.x release line.

## Alternatives Considered

1. **Continuous Feature Addition on Version 1.x:**
   - *Pros:* Faster delivery of user requests without planning major releases.
   - *Cons:* High risk of breaking working production code; architectural bloat; blurring boundaries with planned portal modules.

## Consequences

- **Positive:** Guarantees 100% platform stability for public presentation; isolates maintenance work to critical bug fixes and security updates; provides a clean, unchanged architectural foundation for Version 2.x development.
- **Negative:** New business capabilities must be held back for major version release cycles (v2.x).

## Review Notes

Maintenance guidelines, deprecation schedules, and SemVer rules are governed under `RELEASE_POLICY.md` and `MAINTENANCE_PLAN.md`.
