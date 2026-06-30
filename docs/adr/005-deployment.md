# ADR-005: Deployment Architecture & Containerization

- **Status:** Accepted
- **Date:** 2026-06-27
- **Deciders:** DevOps Lead, Systems Administrator

---

## Context

The platform must run reliably across developer workstations, staging servers, and production environments without environment divergence ("works on my machine" issues).

## Decision

We decided to containerize all services using **Multi-stage Dockerfiles** orchestrated via **Docker Compose** (`docker-compose.yml` for dev, `docker-compose.prod.yml` for production).

## Alternatives Considered

1. **Direct Host Deployment (PM2 + Nginx on bare metal/VPS):**
   - *Pros:* Slightly lower CPU/Memory overhead.
   - *Cons:* Dependency configuration drift across host OS updates; complex node version management; manual database configuration.
2. **Kubernetes (k8s) Cluster:**
   - *Pros:* High-availability orchestration and auto-scaling.
   - *Cons:* Excessive operational complexity and infrastructure cost for a single-college website infrastructure.

## Consequences

- **Positive:** Single-command execution (`docker compose up --build`); identical environments across staging and production; isolated network bridges and persistent volume mapping (`mongo_data`, `uploads_data`).
- **Negative:** Container image build times during CI pipelines (mitigated via Docker Layer Caching).

## Review Notes

Container definitions adhere strictly to `node:22-alpine` engines as defined in `DOCKER.md`.
