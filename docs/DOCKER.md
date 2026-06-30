# Docker Containerization Guide — NREC College Platform

This document describes how to build, run, and manage the NREC College website and CMS platform inside containerized environments using Docker and Docker Compose.

---

## 🚀 Quick Start

Ensure you have Docker and Docker Compose installed and that the Docker Daemon is active.

### 1. Configure Environment Variables
Copy the root example variables template:
```bash
cp .env.example .env
```
Ensure you adjust `JWT_SECRET` and DB/API urls where appropriate.

### 2. Launch Stack in Detached Mode
```bash
docker compose up -d --build
```
This command automatically builds the multi-stage images for both Frontend and Backend, pulls the MongoDB v6 image, registers persistent volumes, configures bridging networks, and verifies service health statuses.

---

## 🖥️ Local Ports Index
- **Frontend App**: `http://localhost:3001` (proxied to internal Next.js `3000`)
- **Backend API**: `http://localhost:5001` (proxied to internal Express `5000`)
- **MongoDB**: `http://localhost:27017` (internal network binding)

---

## 💾 Backups & Database Management

### Database Dump (Back up MongoDB data inside container)
```bash
docker exec -t nrec-mongodb mongodump --out /data/db/backup-$(date +%F)
```
### Database Restore (Recover MongoDB data inside container)
```bash
docker exec -t nrec-mongodb mongorestore /data/db/backup-<target-date>/nrec_college
```
