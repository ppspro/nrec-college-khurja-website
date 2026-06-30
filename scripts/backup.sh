#!/usr/bin/env bash
# =============================================================================
# NREC College – Backup Script
# =============================================================================
# Backs up:
#   1. MongoDB database (mongodump)
#   2. Uploads directory (tar.gz)
#   3. Environment configuration (env files, compose files – no secrets)
#
# Retention:
#   - Daily:   keep last 7 days
#   - Weekly:  keep last 4 weeks (run on Sunday)
#   - Monthly: keep last 12 months (run on 1st of month)
#
# Usage:
#   ./scripts/backup.sh [daily|weekly|monthly]
#
# Environment variables (set in .env or export before running):
#   BACKUP_DIR          – where backups are stored (default: /var/backups/nrec)
#   MONGODB_URI         – MongoDB connection string
#   MONGO_CONTAINER     – Docker container name for mongodump (default: nrec-mongodb)
#   UPLOADS_DIR         – Path to uploads directory (default: ./backend/uploads)
# =============================================================================

set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────

BACKUP_TYPE="${1:-daily}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/nrec}"
MONGO_CONTAINER="${MONGO_CONTAINER:-nrec-mongodb}"
UPLOADS_DIR="${UPLOADS_DIR:-./backend/uploads}"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_NAME="nrec_${BACKUP_TYPE}_${TIMESTAMP}"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_TYPE}/${BACKUP_NAME}"

# Retention limits (number of backups to keep)
DAILY_KEEP=7
WEEKLY_KEEP=4
MONTHLY_KEEP=12

# ── Helpers ───────────────────────────────────────────────────────────────────

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
error() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $*" >&2; exit 1; }

# ── Pre-flight checks ─────────────────────────────────────────────────────────

log "Starting ${BACKUP_TYPE} backup: ${BACKUP_NAME}"

mkdir -p "${BACKUP_PATH}"

# ── 1. MongoDB Backup ─────────────────────────────────────────────────────────

log "Backing up MongoDB..."

if docker ps --format '{{.Names}}' | grep -q "^${MONGO_CONTAINER}$"; then
  docker exec "${MONGO_CONTAINER}" mongodump \
    --db nrec_college \
    --out /tmp/mongodump_"${TIMESTAMP}" \
    --quiet

  docker cp "${MONGO_CONTAINER}":/tmp/mongodump_"${TIMESTAMP}" "${BACKUP_PATH}/mongodb"
  docker exec "${MONGO_CONTAINER}" rm -rf /tmp/mongodump_"${TIMESTAMP}"

  # Compress
  tar -czf "${BACKUP_PATH}/mongodb.tar.gz" -C "${BACKUP_PATH}" mongodb
  rm -rf "${BACKUP_PATH}/mongodb"
  log "MongoDB backup complete: mongodb.tar.gz ($(du -sh "${BACKUP_PATH}/mongodb.tar.gz" | cut -f1))"
else
  # Fallback: direct mongodump if not using Docker
  if command -v mongodump &>/dev/null; then
    MONGODB_URI="${MONGODB_URI:-mongodb://localhost:27017/nrec_college}"
    mongodump --uri="${MONGODB_URI}" --out="${BACKUP_PATH}/mongodb" --quiet
    tar -czf "${BACKUP_PATH}/mongodb.tar.gz" -C "${BACKUP_PATH}" mongodb
    rm -rf "${BACKUP_PATH}/mongodb"
    log "MongoDB backup complete (direct): mongodb.tar.gz"
  else
    log "WARNING: MongoDB container '${MONGO_CONTAINER}' not running and mongodump not found. Skipping DB backup."
  fi
fi

# ── 2. Uploads Backup ─────────────────────────────────────────────────────────

log "Backing up uploads directory..."

if [ -d "${UPLOADS_DIR}" ]; then
  tar -czf "${BACKUP_PATH}/uploads.tar.gz" -C "$(dirname "${UPLOADS_DIR}")" "$(basename "${UPLOADS_DIR}")"
  log "Uploads backup complete: uploads.tar.gz ($(du -sh "${BACKUP_PATH}/uploads.tar.gz" | cut -f1))"
else
  log "WARNING: Uploads directory '${UPLOADS_DIR}' not found. Skipping uploads backup."
fi

# ── 3. Configuration Backup ───────────────────────────────────────────────────

log "Backing up configuration files..."

CONFIG_BACKUP="${BACKUP_PATH}/config"
mkdir -p "${CONFIG_BACKUP}"

# Copy compose files and env examples only (never the real .env with secrets)
for f in docker-compose.yml docker-compose.prod.yml docker-compose.monitoring.yml .env.example; do
  [ -f "$f" ] && cp "$f" "${CONFIG_BACKUP}/"
done

tar -czf "${BACKUP_PATH}/config.tar.gz" -C "${BACKUP_PATH}" config
rm -rf "${CONFIG_BACKUP}"
log "Configuration backup complete: config.tar.gz"

# ── 4. Manifest ───────────────────────────────────────────────────────────────

cat > "${BACKUP_PATH}/MANIFEST.txt" << EOF
NREC College Backup Manifest
==============================
Type:      ${BACKUP_TYPE}
Name:      ${BACKUP_NAME}
Date:      $(date -u '+%Y-%m-%d %H:%M:%S UTC')
Host:      $(hostname)
Contents:
  - mongodb.tar.gz  (MongoDB nrec_college database)
  - uploads.tar.gz  (Uploaded files and media)
  - config.tar.gz   (Compose and env example files)
EOF

log "Manifest written."

# ── 5. Apply Retention Policy ─────────────────────────────────────────────────

log "Applying ${BACKUP_TYPE} retention policy..."

RETENTION_COUNT=0
case "${BACKUP_TYPE}" in
  daily)   RETENTION_COUNT=${DAILY_KEEP}   ;;
  weekly)  RETENTION_COUNT=${WEEKLY_KEEP}  ;;
  monthly) RETENTION_COUNT=${MONTHLY_KEEP} ;;
esac

BACKUP_TYPE_DIR="${BACKUP_DIR}/${BACKUP_TYPE}"
EXISTING=$(ls -1dt "${BACKUP_TYPE_DIR}"/nrec_"${BACKUP_TYPE}"_* 2>/dev/null | tail -n +$((RETENTION_COUNT + 1)))

if [ -n "${EXISTING}" ]; then
  echo "${EXISTING}" | xargs rm -rf
  log "Removed old backups (keeping last ${RETENTION_COUNT})"
fi

# ── Done ──────────────────────────────────────────────────────────────────────

TOTAL_SIZE=$(du -sh "${BACKUP_PATH}" | cut -f1)
log "Backup complete: ${BACKUP_PATH} (${TOTAL_SIZE})"
log "=========================================="
