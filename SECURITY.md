# Security Policy

## Supported Versions

Only the latest production release receives security fixes.

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅ Yes     |
| < 1.0   | ❌ No      |

---

## Reporting a Vulnerability

**Do not open a public GitHub Issue for security vulnerabilities.**

Security issues can expose sensitive data or allow unauthorized access.
We take all reports seriously and will respond promptly.

### How to Report

Send an email to the project maintainer with:

- **Subject**: `[SECURITY] NREC College Website – <brief description>`
- **Description**: A clear description of the vulnerability
- **Steps to reproduce**: How to trigger the issue
- **Impact**: What an attacker could achieve
- **Affected version(s)**: Which version(s) are affected
- **Suggested fix** (optional): If you have a fix in mind

> **Email**: contact@nreccollege.edu.np *(replace with actual maintainer email)*

---

## Response Timeline

| Stage                       | Timeline       |
|-----------------------------|----------------|
| Acknowledgment of report    | Within 48 hours |
| Initial assessment          | Within 5 days  |
| Fix and release (if valid)  | Within 30 days |
| Public disclosure           | After fix is released |

---

## Disclosure Policy

We follow **responsible disclosure**:

1. You report the vulnerability privately.
2. We investigate and develop a fix.
3. A patched release is published.
4. We publicly acknowledge the vulnerability in the release notes (with your credit, if desired).

---

## Scope

Issues considered in scope:

- Authentication bypass
- Authorization failures (unauthorized data access)
- Injection vulnerabilities (SQL, NoSQL, command injection)
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Sensitive data exposure (credentials, tokens, PII)
- Insecure direct object references
- Security misconfigurations in Docker or API

Out of scope:

- Denial of Service (DoS)
- Rate limiting
- Outdated dependencies without a known exploit
- Issues already reported by Dependabot or CodeQL

---

## Security Best Practices in This Project

- JWT secrets are stored in environment variables only — never in source code.
- All admin routes require Bearer token authentication.
- Passwords are hashed with bcrypt.
- File uploads are validated for type and size.
- HTTP security headers are managed by `helmet`.
- Dependencies are audited weekly via Dependabot and GitHub Actions.
