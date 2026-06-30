# Contributing to NREC College Website

Thank you for your interest in contributing to the NREC College Website project.
Please read this guide carefully before submitting any changes.

---

## Code of Conduct

All contributors are expected to treat each other with respect.
Abusive, discriminatory, or harassing behavior will not be tolerated.

---

## Getting Started

### Prerequisites

| Tool        | Version   |
|-------------|-----------|
| Node.js     | 22.x      |
| npm         | 10.x+     |
| Docker      | 24.x+     |
| Docker Compose | v2+  |
| MongoDB     | 7.x (via Docker) |

### Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/<your-org>/nrec-college-website.git
cd nrec-college-website

# 2. Copy environment files
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# 3. Fill in your local values in each .env file

# 4. Start the full stack (recommended)
docker compose up --build

# — OR — run services individually:

# Backend
cd backend && npm install && npm run dev

# Frontend (in a separate terminal)
cd frontend && npm install && npm run dev
```

---

## Branch Strategy

| Branch    | Purpose                                |
|-----------|----------------------------------------|
| `main`    | Production-ready code. Protected.      |
| `develop` | Integration branch for features.       |
| `feat/*`  | New features                           |
| `fix/*`   | Bug fixes                              |
| `chore/*` | Maintenance, CI, dependency updates    |
| `docs/*`  | Documentation only                     |

All changes must be submitted via a Pull Request to `develop`.
Direct pushes to `main` are not allowed.

---

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(<scope>): <short description>

[optional body]

[optional footer: Closes #123]
```

### Types

| Type       | When to use                                  |
|------------|----------------------------------------------|
| `feat`     | A new feature                                |
| `fix`      | A bug fix                                    |
| `chore`    | Build, CI, tooling, dependency updates       |
| `docs`     | Documentation only                           |
| `refactor` | Code change that neither fixes nor adds      |
| `perf`     | Performance improvement                      |
| `test`     | Adding or fixing tests                       |
| `style`    | Formatting, whitespace, no logic change      |

### Examples

```
feat(faculty): add faculty detail page
fix(auth): handle expired JWT tokens gracefully
chore(deps): update mongoose to 8.5.0
docs(readme): add Docker setup instructions
```

---

## Pull Request Process

1. **Fork** the repository (external contributors) or create a branch (team members).
2. **Create your branch** from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/your-feature-name
   ```
3. **Make your changes** following the code standards below.
4. **Verify locally**:
   ```bash
   # Backend
   cd backend && npm run build && npx tsc --noEmit

   # Frontend
   cd frontend && npm run lint && npm run build && npx tsc --noEmit
   ```
5. **Open a Pull Request** against `develop`.
6. Fill in the **PR template** completely.
7. Wait for CI to pass — all checks must be green before merging.
8. Request a review from a maintainer.

---

## Code Standards

### TypeScript

- All new files must be TypeScript (`.ts` / `.tsx`).
- No `any` types unless absolutely unavoidable (add a comment explaining why).
- Use strict null checks — do not bypass them.

### Naming Conventions

| Entity            | Convention       | Example                   |
|-------------------|------------------|---------------------------|
| Files (component) | PascalCase       | `FacultyCard.tsx`         |
| Files (utility)   | camelCase        | `formatDate.ts`           |
| React components  | PascalCase       | `FacultyCard`             |
| Functions         | camelCase        | `getFacultyById`          |
| Constants         | UPPER_SNAKE_CASE | `MAX_UPLOAD_SIZE`         |
| CSS classes       | kebab-case       | `faculty-card__title`     |
| Mongoose models   | PascalCase       | `Faculty`, `Department`   |
| API routes        | kebab-case       | `/api/faculty-profiles`   |

### No Secrets Policy

- **Never commit** `.env`, API keys, JWT secrets, database passwords, or any credentials.
- Use `.env.example` with placeholder values only.
- Secrets are managed via GitHub Secrets in CI.

### Console Statements

- Remove all `console.log` statements before submitting a PR.
- Use structured logging (e.g., `morgan`) for server-side logs.

---

## Versioning

This project uses [Semantic Versioning](https://semver.org/):

- `MAJOR.MINOR.PATCH` (e.g., `1.0.1`)
- **MAJOR** – breaking changes
- **MINOR** – new backwards-compatible features
- **PATCH** – bug fixes

Releases are created by tagging `main`:

```bash
git tag -a v1.0.2 -m "Release v1.0.2"
git push origin v1.0.2
```

The release workflow automatically builds Docker images and creates a GitHub Release.

---

## Security Vulnerabilities

Do **not** open a public issue for security vulnerabilities.
Please refer to [SECURITY.md](./SECURITY.md) for the responsible disclosure process.

---

## Questions

Open a [GitHub Discussion](https://github.com/<your-org>/nrec-college-website/discussions)
or contact the maintainers directly.
