# ADR-007: CI/CD & Automated Release Strategy

- **Status:** Accepted
- **Date:** 2026-06-27
- **Deciders:** DevOps Engineer, Lead Developer

---

## Context

Automated building, testing, security auditing, and publishing are required to ensure reproducible releases and prevent bad deployments.

## Decision

We decided to adopt **GitHub Actions** as the primary automation engine, structured into modular workflows:
- `ci.yml`: TypeScript verification, linting, and build validation on PRs and pushes.
- `test.yml`: Integration testing against a live MongoDB service container.
- `security.yml`: High-severity `npm audit`, CodeQL static analysis, and Gitleaks secret detection.
- `release.yml`: Tag-triggered automated container packaging and publishing to GitHub Container Registry (GHCR).

## Alternatives Considered

1. **Jenkins / GitLab CI:**
   - *Pros:* High customizability.
   - *Cons:* Additional server infrastructure to maintain; separate user permissions matrix.
2. **Manual FTP / SSH Deployment Scripts:**
   - *Pros:* Simple to execute initially.
   - *Cons:* High risk of human error; lack of build verification; non-reproducible deployments.

## Consequences

- **Positive:** Seamless repository integration; zero dedicated CI server maintenance; automated security gates blocking vulnerable PRs; automated release note extraction from `CHANGELOG.md`.
- **Negative:** Dependent on GitHub Actions runner availability and monthly action minutes allowance.

## Review Notes

Workflow structures and security policies conform strictly to `GOVERNANCE.md`.
