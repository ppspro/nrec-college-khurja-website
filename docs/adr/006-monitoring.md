# ADR-006: Observability, Logging & Monitoring

- **Status:** Accepted
- **Date:** 2026-06-27
- **Deciders:** DevOps Lead, Reliability Engineer

---

## Context

Production services require real-time observability, rapid debugging capabilities, and proactive performance tracking without impacting API throughput.

## Decision

We decided to implement:
1. **Structured JSON Logging** (`logger.ts`) emitting single-line JSON entries to stdout/stderr.
2. **Request Correlation IDs** (`requestId.ts`) attaching UUID v4 headers (`X-Request-ID`) across all requests and error responses.
3. **Prometheus & Grafana Monitoring Stack** (`docker-compose.monitoring.yml`) scraping cAdvisor container metrics.

## Alternatives Considered

1. **Unstructured Console Logs (`console.log`):**
   - *Pros:* Zero implementation effort.
   - *Cons:* Impossible to parse automatically in log aggregators; lack of severity metadata; no correlation across async operations.
2. **Heavy APM Agents (e.g., New Relic / Datadog agents):**
   - *Pros:* Rich automatic tracing.
   - *Cons:* Commercial licensing costs; potential performance overhead on small host instances.

## Consequences

- **Positive:** Log entries are instantly ingestible by Loki, CloudWatch, or ELK; end-to-end trace correlation via `requestId`; real-time container resource visibility via Grafana dashboards.
- **Negative:** Slightly larger log volume disk footprint (managed via Docker log rotation policies).

## Review Notes

Monitoring specs and log fields are fully documented in `OPERATIONS.md`.
