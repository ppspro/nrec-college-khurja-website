# NREC College Website – Operations Guide

**Version:** 1.0.1 (LTS Baseline)
**Last Updated:** 2026-06-27
**Audience:** System administrators, DevOps engineers, maintainers

---

## Table of Contents

1. [System Architecture](#1-system-architecture)
2. [Monitoring](#2-monitoring)
3. [Logging](#3-logging)
4. [Backup & Restore](#4-backup--restore)
5. [Maintenance Schedule](#5-maintenance-schedule)
6. [Incident Response](#6-incident-response)
7. [Disaster Recovery](#7-disaster-recovery)
8. [Production Checklist](#8-production-checklist)
9. [Long-Term Support Policy](#9-long-term-support-policy)
10. [Escalation Contacts](#10-escalation-contacts)

---

## 1. System Architecture

```
Internet
    │
    ▼
[Nginx / Reverse Proxy]  ← SSL termination, rate limiting
    │
    ├──▶ :3000  [Next.js Frontend]    (nrec-frontend-app)
    │
    └──▶ :5000  [Express.js Backend]  (nrec-backend-api)
                     │
                     ▼
              [MongoDB 6.0]           (nrec-mongodb)
                     │
                     ▼
              [Persistent Volume]     (mongo_data)

                [Uploads Volume]      (uploads_data)
```

### Container Names

| Container           | Image              | Port  | Role              |
|---------------------|--------------------|-------|-------------------|
| `nrec-mongodb`      | mongo:6.0          | 27017 | Database          |
| `nrec-backend-api`  | nrec-backend:1.0.1 | 5000  | REST API          |
| `nrec-frontend-app` | nrec-frontend:1.0.1| 3000  | Next.js Frontend  |

### Named Volumes

| Volume        | Contents                   |
|---------------|----------------------------|
| `mongo_data`  | MongoDB data files         |
| `uploads_data`| Uploaded images, documents |

---

## 2. Monitoring

### 2.1 Health Endpoints

| Service  | Endpoint                         | Expected Response          |
|----------|----------------------------------|----------------------------|
| Backend  | `GET /api/health`                | `{"status":"healthy",...}` |
| Frontend | `GET /` (HTTP 2xx)               | HTML page                  |
| MongoDB  | `mongosh --eval 'db.adminCommand({ ping: 1 })'` | `{ok:1}` |

### 2.2 Monitoring Stack (Optional – Prometheus + Grafana)

Start the monitoring stack alongside the application:

```bash
docker compose -f docker-compose.yml -f docker-compose.monitoring.yml up -d
```

| Dashboard     | URL                        | Default Credentials |
|---------------|----------------------------|---------------------|
| Grafana       | http://\<host\>:3333       | admin / admin       |
| Prometheus    | http://\<host\>:9090       | —                   |
| cAdvisor      | http://\<host\>:8888       | —                   |

**Change the Grafana password immediately after first login.**

Configure `GRAFANA_PASSWORD` in your `.env` file before starting.

### 2.3 What is Monitored

| Metric                  | Source      | Alert Threshold       |
|-------------------------|-------------|-----------------------|
| Backend availability    | Health check| Down > 1 min          |
| Frontend availability   | HTTP probe  | HTTP 4xx/5xx          |
| Container CPU           | cAdvisor    | > 80% sustained       |
| Container memory        | cAdvisor    | > 90% of limit        |
| Container restarts      | cAdvisor    | > 5 restarts          |
| Disk usage              | Host OS     | > 80%                 |
| MongoDB connectivity    | Event log   | Connection error       |

### 2.4 Quick Health Check

Run the operational health check script at any time:

```bash
./scripts/health-check.sh          # Human-readable output
./scripts/health-check.sh --json   # JSON output (for monitoring integrations)
```

### 2.5 Key Metrics to Watch

**API Error Rate**
```bash
# View error logs from the last hour
docker logs nrec-backend-api --since 1h 2>&1 | grep '"level":"error"'
```

**Request Latency (via access log)**
```bash
docker logs nrec-backend-api --since 1h 2>&1 | grep '"level":"info"' | grep 'HTTP'
```

**Container Resource Usage**
```bash
docker stats nrec-mongodb nrec-backend-api nrec-frontend-app --no-stream
```

---

## 3. Logging

### 3.1 Log Format

All backend logs are structured JSON (one object per line):

```json
{
  "timestamp": "2026-06-27T08:00:00.000Z",
  "level": "info",
  "service": "nrec-backend",
  "message": "NREC College API started",
  "port": 5000,
  "environment": "production",
  "version": "1.0.1"
}
```

Error logs include `requestId` for correlation:

```json
{
  "timestamp": "2026-06-27T08:05:12.000Z",
  "level": "error",
  "service": "nrec-backend",
  "message": "Unhandled error",
  "requestId": "a3f1c9e2-...",
  "method": "POST",
  "url": "/api/faculty",
  "statusCode": 500,
  "error": "..."
}
```

### 3.2 Log Levels

| Level   | When Used                                      | Output  |
|---------|------------------------------------------------|---------|
| `debug` | Detailed trace (development only)              | stdout  |
| `info`  | Normal events (startup, requests, CRUD)        | stdout  |
| `warn`  | Non-fatal anomalies (disconnects, missing files)| stdout |
| `error` | Failures, exceptions, unhandled rejections     | stderr  |

Configure the minimum log level via `LOG_LEVEL` environment variable (default: `info` in production).

### 3.3 Viewing Logs

```bash
# All backend logs (live)
docker logs -f nrec-backend-api

# Errors only (last 24 hours)
docker logs nrec-backend-api --since 24h 2>&1 | grep '"level":"error"'

# Auth events (last 24 hours)
docker logs nrec-backend-api --since 24h 2>&1 | grep '"level":"info"' | grep auth

# MongoDB logs
docker logs nrec-mongodb --since 1h

# Frontend logs
docker logs nrec-frontend-app --since 1h
```

### 3.4 Log Events Reference

| Event                  | Level | Key Fields                                  |
|------------------------|-------|---------------------------------------------|
| API startup            | info  | port, environment, version                  |
| SIGTERM / SIGINT       | info  | signal name                                 |
| HTTP access            | info  | method, url, statusCode, responseTime       |
| MongoDB connected      | info  | host                                        |
| MongoDB disconnected   | warn  | —                                           |
| MongoDB error          | error | error                                       |
| Upload failure         | error | requestId, error, mimetype                  |
| Authentication failure | warn  | requestId, url (never logs passwords)       |
| 4xx response           | warn  | requestId, method, url, statusCode          |
| 5xx response           | error | requestId, method, url, statusCode, stack   |
| Uncaught exception     | error | error, stack                                |
| Unhandled rejection    | error | reason                                      |

### 3.5 Log Aggregation (Production)

For centralized log management, forward Docker logs to a log aggregator:

**Option A – Loki + Grafana (self-hosted)**
```yaml
# In docker-compose.prod.yml, add to each service:
logging:
  driver: loki
  options:
    loki-url: "http://loki:3100/loki/api/v1/push"
    loki-pipeline-stages: |
      - json:
          expressions:
            level: level
            service: service
```

**Option B – CloudWatch (AWS)**
```yaml
logging:
  driver: awslogs
  options:
    awslogs-group: /nrec-college/production
    awslogs-region: ap-south-1
    awslogs-stream: backend
```

**Option C – Syslog forwarding**
```yaml
logging:
  driver: syslog
  options:
    syslog-address: "udp://logserver:514"
    tag: "nrec-backend"
```

---

## 4. Backup & Restore

### 4.1 Backup Strategy

| Frequency | Time    | Retention | Script argument |
|-----------|---------|-----------|-----------------|
| Daily     | 02:00   | 7 days    | `daily`         |
| Weekly    | 03:00 (Sun) | 4 weeks | `weekly`    |
| Monthly   | 04:00 (1st) | 12 months | `monthly` |

**Contents of every backup:**
- `mongodb.tar.gz` – Full mongodump of the `nrec_college` database
- `uploads.tar.gz` – All uploaded files and processed images
- `config.tar.gz` – Compose files and env examples (no secrets)
- `MANIFEST.txt` – Metadata and timestamp

### 4.2 Configuring Automated Backups (Server Cron)

```bash
# Edit root crontab
sudo crontab -e

# Add:
0 2 * * *   /opt/nrec/scripts/backup.sh daily   >> /var/log/nrec-backup.log 2>&1
0 3 * * 0   /opt/nrec/scripts/backup.sh weekly  >> /var/log/nrec-backup.log 2>&1
0 4 1 * *   /opt/nrec/scripts/backup.sh monthly >> /var/log/nrec-backup.log 2>&1
```

Required environment variables for the cron job:

```bash
export BACKUP_DIR=/var/backups/nrec
export MONGO_CONTAINER=nrec-mongodb
export UPLOADS_DIR=/opt/nrec/backend/uploads
```

### 4.3 Running a Manual Backup

```bash
# Daily backup
./scripts/backup.sh daily

# Weekly backup
./scripts/backup.sh weekly

# Verify the backup was created
ls -lh /var/backups/nrec/daily/
cat /var/backups/nrec/daily/nrec_daily_*/MANIFEST.txt
```

### 4.4 Restore Procedure

> ⚠️ **Always test restores in a staging environment before touching production.**

```bash
# 1. Identify the backup to restore
ls /var/backups/nrec/daily/

# 2. Stop the backend to prevent writes during restore
docker compose stop backend

# 3. Run the restore script
./scripts/restore.sh /var/backups/nrec/daily/nrec_daily_2026-06-27_02-00-00

# 4. Restart the backend
docker compose start backend

# 5. Verify the application
./scripts/health-check.sh
```

### 4.5 Restore Verification Schedule

Every month, perform a test restore to a staging environment:

1. Copy backup archive to the staging server.
2. Run `./scripts/restore.sh <backup-path>` in staging.
3. Start the application and confirm data integrity (sample records, image loading, admin login).
4. Record the result in the maintenance log.

### 4.6 Off-site Storage

Configure the backup script to sync to remote storage after local backup:

```bash
# After the backup completes, add to backup.sh or a wrapper:
aws s3 sync "${BACKUP_DIR}" s3://nrec-backups/ --exclude "*.tmp"
# — or —
rsync -az "${BACKUP_DIR}" user@backup-server:/backups/nrec/
```

---

## 5. Maintenance Schedule

### Daily (Automated + Reviewed)

| Task                              | Method                    |
|-----------------------------------|---------------------------|
| MongoDB + uploads backup          | Cron (02:00)              |
| Review error logs                 | `docker logs` / Grafana   |
| Verify containers are running     | `docker compose ps`       |
| Check disk usage                  | `./scripts/health-check.sh` |

### Weekly (Manual Review – Monday)

| Task                              | Action                                         |
|-----------------------------------|------------------------------------------------|
| Review Dependabot PRs             | GitHub → Pull Requests                         |
| Review container restart counts   | `docker inspect --format '{{.RestartCount}}'`  |
| Check `npm audit` report          | CI / Security workflow                         |
| Review storage growth             | `docker system df` + `du -sh /var/backups/nrec` |
| Review access logs for anomalies  | Error rate, unusual IPs, 4xx spikes            |

### Monthly (Scheduled – 1st of month)

| Task                              | Action                                         |
|-----------------------------------|------------------------------------------------|
| Apply OS security patches         | `sudo apt update && sudo apt upgrade`          |
| Apply Docker security updates     | `docker pull mongo:6.0` (+ restart)            |
| Perform backup restore test       | See §4.5                                       |
| Review SSL certificate expiry     | `openssl s_client -connect <domain>:443`       |
| Performance review                | Response times, DB query times (Grafana)       |
| Rotate log files                  | `logrotate` or `docker logs --since 30d`       |

### Quarterly

| Task                              | Action                                         |
|-----------------------------------|------------------------------------------------|
| Dependency major version review   | Review Dependabot held updates                 |
| Infrastructure review             | Disk, network, server capacity                 |
| Disaster recovery exercise        | Simulate server failure (see §7)               |
| Security audit                    | CodeQL + manual review of auth/upload code     |
| LTS patch release                 | Tag `v1.0.x` after fixes                       |

---

## 6. Incident Response

### Severity Levels

| Level    | Definition                              | Response Time |
|----------|-----------------------------------------|---------------|
| P1 – Critical | Site completely down, data loss   | Immediate     |
| P2 – High    | Major feature broken, auth failure | < 1 hour      |
| P3 – Medium  | Partial outage, degraded performance | < 4 hours   |
| P4 – Low     | Minor issue, cosmetic bug          | Next sprint   |

---

### 6.1 Critical Outage (P1)

**Symptoms:** Frontend returns 5xx or is unreachable. Backend health check fails.

**Immediate steps:**

```bash
# 1. Check container status
docker compose ps

# 2. Check recent logs
docker logs nrec-backend-api --since 15m 2>&1 | tail -50
docker logs nrec-frontend-app --since 15m 2>&1 | tail -50

# 3. Attempt restart
docker compose restart backend
docker compose restart frontend

# 4. If restart fails, do a full stack restart
docker compose down && docker compose up -d

# 5. If still failing, check MongoDB
docker logs nrec-mongodb --since 15m
docker compose restart mongodb
```

**If restart resolves it:** Document the root cause and create a P4 issue for investigation.
**If restart does not resolve it:** Escalate and proceed to Disaster Recovery (§7).

---

### 6.2 Security Incident

**Symptoms:** Unauthorized admin access, data breach suspicion, unexpected database changes.

**Steps:**

```bash
# 1. Immediately take the backend offline
docker compose stop backend

# 2. Preserve logs for forensic review
docker logs nrec-backend-api > /tmp/incident-$(date +%s).log
docker logs nrec-mongodb >> /tmp/incident-$(date +%s).log

# 3. Change JWT_SECRET in .env (invalidates all existing tokens)
# Edit .env → JWT_SECRET=<new-secure-value>

# 4. Change MongoDB admin credentials if compromised

# 5. Restart with new credentials
docker compose up -d

# 6. Review auth logs for suspicious activity
grep '"message":"Unhandled error"' /tmp/incident-*.log
```

**Do not restart without changing credentials if you suspect token compromise.**
Notify the college IT management and document the incident timeline.

---

### 6.3 Failed Deployment / Rollback

**Symptoms:** CI/CD pipeline passes but the live deployment behaves incorrectly.

```bash
# 1. Identify the last known good image tag
# (from GitHub Container Registry or your registry)

# 2. Update docker-compose.prod.yml to use the previous image tag
# backend: image: ghcr.io/<org>/nrec-backend:v1.0.1   ← previous version

# 3. Pull and restart
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d

# 4. Verify
./scripts/health-check.sh
```

---

### 6.4 Database Failure

**Symptoms:** `MongoDB connection error` in backend logs, API returns 500 for all data endpoints.

```bash
# 1. Check MongoDB container
docker compose ps mongodb
docker logs nrec-mongodb --since 30m

# 2. Attempt restart
docker compose restart mongodb

# 3. If data corruption suspected, stop writes immediately
docker compose stop backend

# 4. Attempt repair (ONLY if mongod crashed uncleanly)
docker exec nrec-mongodb mongod --repair --dbpath /data/db

# 5. If repair fails, restore from latest backup
./scripts/restore.sh /var/backups/nrec/daily/<latest>
```

---

### 6.5 Container Failure / High Restart Count

**Symptoms:** Container restarts frequently; `docker ps` shows high restart count.

```bash
# Inspect restart count
docker inspect --format '{{.RestartCount}} restarts' nrec-backend-api

# Check the last exit code
docker inspect --format '{{.State.ExitCode}}' nrec-backend-api

# View crash logs
docker logs nrec-backend-api --since 1h 2>&1 | grep '"level":"error"'

# Check resource limits (OOM killer)
dmesg | grep -i 'oom\|killed'

# Solution: increase container memory limit in docker-compose.prod.yml
```

---

## 7. Disaster Recovery

### Recovery Objectives

| Metric | Target |
|--------|--------|
| RPO (Recovery Point Objective) | 24 hours (daily backup) |
| RTO (Recovery Time Objective)  | < 2 hours               |

---

### 7.1 Server Failure

**Scenario:** The host server becomes unreachable (hardware failure, provider outage).

**Recovery steps:**

1. Provision a new server (same OS, Docker, Docker Compose).
2. Restore the application repository:
   ```bash
   git clone https://github.com/<org>/nrec-college-website.git /opt/nrec
   ```
3. Restore the `.env` file from secure secrets storage (e.g., Vault, 1Password, AWS Secrets Manager).
4. Pull backup archives from off-site storage (S3, remote server).
5. Restore MongoDB and uploads:
   ```bash
   ./scripts/restore.sh /path/to/latest/backup
   ```
6. Start the application:
   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```
7. Update DNS to point to the new server IP.
8. Verify SSL and run `./scripts/health-check.sh`.

**Estimated time:** 60–90 minutes (excluding DNS propagation).

---

### 7.2 Database Corruption

**Scenario:** MongoDB data files are corrupted. All API calls return errors.

**Recovery steps:**

1. Stop the backend:
   ```bash
   docker compose stop backend
   ```
2. Attempt `mongod --repair` (see §6.4).
3. If repair fails, destroy the corrupted volume and restore from backup:
   ```bash
   docker compose down
   docker volume rm nrec_mongo_data
   docker compose up -d mongodb
   ./scripts/restore.sh /var/backups/nrec/daily/<latest>
   docker compose up -d
   ```

**Data loss window:** Up to 24 hours (last daily backup).

---

### 7.3 Accidental File Deletion (Uploads)

**Scenario:** Uploaded images or documents are accidentally deleted.

**Recovery steps:**

1. Identify the affected files from the database records.
2. Find the most recent backup containing the files:
   ```bash
   ls /var/backups/nrec/daily/ | tail -5
   ```
3. Extract only the uploads (without touching the database):
   ```bash
   BACKUP=/var/backups/nrec/daily/<backup-name>
   tar -tzf "${BACKUP}/uploads.tar.gz" | grep "<filename>"
   tar -xzf "${BACKUP}/uploads.tar.gz" -C /tmp/ --wildcards "*<filename>*"
   cp /tmp/uploads/<path> ./backend/uploads/<path>
   ```

---

### 7.4 SSL Certificate Expiration

**Scenario:** Let's Encrypt certificate expired; browsers show security warnings.

**Recovery steps:**

```bash
# Using Certbot (Let's Encrypt)
sudo certbot renew --force-renewal

# Using Nginx + Certbot auto-renewal
sudo systemctl reload nginx

# Verify expiry
openssl s_client -connect nreccollege.edu.np:443 2>/dev/null | openssl x509 -noout -dates
```

**Prevention:** Configure `certbot renew` to run twice weekly via cron:
```bash
0 0,12 * * * certbot renew --quiet
```

---

### 7.5 Docker Host Failure

**Scenario:** Docker daemon crashes or Docker Desktop on a local dev server becomes unavailable.

```bash
# Restart Docker daemon (Linux)
sudo systemctl restart docker

# Verify
docker version

# Restart the application stack
docker compose -f docker-compose.prod.yml up -d
```

If the Docker host itself is unrecoverable, follow the **Server Failure** procedure (§7.1).

---

## 8. Production Checklist

Use this checklist before every production deployment.

### DNS & SSL

- [ ] Domain DNS A/CNAME record pointing to production server IP
- [ ] SSL certificate installed and valid (check expiry: > 30 days)
- [ ] HTTPS redirect configured (HTTP 301 → HTTPS)
- [ ] `HSTS` header configured in Nginx

### Environment Variables

- [ ] `.env` created from `.env.example` – no placeholder values remain
- [ ] `JWT_SECRET` is a securely generated random string (min 64 characters)
- [ ] `MONGODB_URI` points to production MongoDB
- [ ] `NODE_ENV=production`
- [ ] `FRONTEND_URL` set to the public HTTPS domain
- [ ] `NEXT_PUBLIC_API_URL` set to the production API URL
- [ ] `GRAFANA_PASSWORD` changed from default

### MongoDB

- [ ] MongoDB running and healthy (`docker compose ps mongodb`)
- [ ] Named volume `mongo_data` persists across restarts
- [ ] Admin seeded: `npm run seed` (first deployment only)
- [ ] Backup cron configured and tested

### Docker

- [ ] All images built from latest code (`docker compose build`)
- [ ] All three containers running (`docker compose ps`)
- [ ] Health checks passing for all containers
- [ ] Restart policy set to `always` (production compose)
- [ ] Named volumes mounted correctly
- [ ] Log driver configured (if using remote aggregation)

### Reverse Proxy (Nginx)

- [ ] Nginx config tested (`nginx -t`)
- [ ] `/uploads` served directly by Nginx (bypass Node.js)
- [ ] Gzip compression enabled
- [ ] Client max body size set to ≥ 10 MB
- [ ] Rate limiting configured

### Firewall

- [ ] Port 22 (SSH) restricted to admin IPs only
- [ ] Port 80/443 open to public
- [ ] Port 27017 (MongoDB) NOT exposed to public internet
- [ ] Ports 5000, 3000 NOT exposed publicly (proxied via Nginx)

### Backups

- [ ] Backup script tested manually (`./scripts/backup.sh daily`)
- [ ] Backup directory created and writable
- [ ] Cron entries added and verified
- [ ] Off-site sync configured (S3/rsync)
- [ ] Test restore performed in staging

### Monitoring

- [ ] Health check endpoint returns `healthy`
- [ ] Grafana dashboard accessible (if monitoring stack is running)
- [ ] Disk usage below 70%
- [ ] Container memory usage within limits

### CI/CD

- [ ] All GitHub Actions workflows passing on `main`
- [ ] GitHub Secrets configured (`GITHUB_TOKEN`)
- [ ] Dependabot PRs reviewed and up to date

### Release Verification

- [ ] `CHANGELOG.md` entry written for this version
- [ ] Git tag pushed (`git push origin v1.x.x`)
- [ ] GitHub Release created with release notes
- [ ] Docker images published to GHCR with correct tags
- [ ] `./scripts/health-check.sh` passes on production

---

## 9. Long-Term Support Policy

### Version 1.x – LTS (Current Baseline: v1.0.1)

**Support period:** Until Version 2.0 reaches production stability.

**Includes:**
- Security patches (applied within 30 days of CVE disclosure)
- Bug fixes (applied in patch releases v1.0.x)
- Performance improvements (backported from v2.x where safe)

**Excludes:**
- New features (targeted at v2.x releases)
- Breaking API changes
- Architectural changes

**Backward compatibility:** All v1.x.x releases are backward compatible.
Breaking changes require a major version increment.

### Version 2.x – Planned Releases

| Version | Feature                  | Estimated Complexity |
|---------|--------------------------|----------------------|
| v2.0    | Student Portal           | High                 |
| v2.1    | Faculty Portal           | High                 |
| v2.2    | Online Admissions        | Very High            |
| v2.3    | Fee & Finance Module     | Very High            |
| v2.4    | Mobile Application       | Extreme              |

See [ROADMAP.md](./ROADMAP.md) for full specifications.

### Patch Release Process

```bash
# 1. Create fix branch
git checkout -b fix/brief-description main

# 2. Apply fix
# ... make changes ...

# 3. Test
npm run build && npx tsc --noEmit

# 4. Update CHANGELOG.md

# 5. Merge to main via PR

# 6. Tag the release
git tag -a v1.0.2 -m "Release v1.0.2 – <brief description>"
git push origin v1.0.2
```

---

## 10. Escalation Contacts

> Replace these placeholders with real contact details before going live.

| Role                    | Name            | Email                              | Phone          |
|-------------------------|-----------------|------------------------------------|----------------|
| System Administrator    | \<name\>        | sysadmin@nreccollege.edu.np        | \<number\>     |
| Backend Developer       | \<name\>        | dev-backend@nreccollege.edu.np     | \<number\>     |
| Frontend Developer      | \<name\>        | dev-frontend@nreccollege.edu.np    | \<number\>     |
| College IT Manager      | \<name\>        | it-manager@nreccollege.edu.np      | \<number\>     |
| Principal / Management  | \<name\>        | principal@nreccollege.edu.np       | \<number\>     |
| Hosting Provider Support| \<provider\>    | support@\<provider\>.com           | \<number\>     |
| Domain Registrar        | \<registrar\>   | —                                  | \<number\>     |

### Emergency Contact Order (P1 Outage)

1. System Administrator (first point of contact)
2. Backend Developer (if API-related)
3. Hosting Provider (if server-level)
4. College IT Manager (if prolonged outage > 4 hours)
5. Principal (if > 8 hours or data breach)
