#!/usr/bin/env bash
# =============================================================================
# NREC College – Restore Script
# =============================================================================
# Restores:
#   1. MongoDB database from a mongodump archive
#   2. Uploads directory from a tar.gz archive
#
# Usage:
#   ./scripts/restore.sh <backup-path>
#
# Example:
#   ./scripts/restore.sh /var/backups/nrec/daily/nrec_daily_2026-06-27_02-00-00
#
# IMPORTANT:
#   - Stop the backend before restoring the database.
#   - The restore DROPS the existing database before importing.
#   - Test restores in a staging environment first.
# =============================================================================

set -euo pipefail

BACKUP_PATH="${1:-}"
MONGO_CONTAINER="${MONGO_CONTAINER:-nrec-mongodb}"
UPLOADS_DIR="${UPLOADS_DIR:-./backend/uploads}"

log()   { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
error() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $*" >&2; exit 1; }

# ── Validation ────────────────────────────────────────────────────────────────

[ -z "${BACKUP_PATH}" ] && error "Usage: $0 <backup-path>"
[ -d "${BACKUP_PATH}" ] || error "Backup path does not exist: ${BACKUP_PATH}"
[ -f "${BACKUP_PATH}/MANIFEST.txt" ] || log "WARNING: No MANIFEST.txt found – proceed with caution."

log "======================================"
log "NREC College Restore"
log "Source: ${BACKUP_PATH}"
if [ -f "${BACKUP_PATH}/MANIFEST.txt" ]; then
  cat "${BACKUP_PATH}/MANIFEST.txt"
fi
log "======================================"

echo ""
read -rp "⚠️  This will OVERWRITE existing data. Continue? [yes/N]: " CONFIRM
[ "${CONFIRM}" = "yes" ] || { log "Restore cancelled."; exit 0; }

# ── 1. Restore MongoDB ────────────────────────────────────────────────────────

if [ -f "${BACKUP_PATH}/mongodb.tar.gz" ]; then
  log "Restoring MongoDB..."

  RESTORE_TMP="/tmp/nrec_restore_$(date +%s)"
  mkdir -p "${RESTORE_TMP}"
  tar -xzf "${BACKUP_PATH}/mongodb.tar.gz" -C "${RESTORE_TMP}"

  if docker ps --format '{{.Names}}' | grep -q "^${MONGO_CONTAINER}$"; then
    # Copy dump into the container
    docker cp "${RESTORE_TMP}/mongodb" "${MONGO_CONTAINER}":/tmp/mongorestore_src

    # Drop and restore
    docker exec "${MONGO_CONTAINER}" mongorestore \
      --db nrec_college \
      --drop \
      /tmp/mongorestore_src/nrec_college \
      --quiet

    docker exec "${MONGO_CONTAINER}" rm -rf /tmp/mongorestore_src
    log "MongoDB restore complete."
  else
    MONGODB_URI="${MONGODB_URI:-mongodb://localhost:27017/nrec_college}"
    mongorestore \
      --uri="${MONGODB_URI}" \
      --db nrec_college \
      --drop \
      "${RESTORE_TMP}/mongodb/nrec_college" \
      --quiet
    log "MongoDB restore complete (direct)."
  fi

  rm -rf "${RESTORE_TMP}"
else
  log "No mongodb.tar.gz found in backup – skipping database restore."
fi

# ── 2. Restore Uploads ────────────────────────────────────────────────────────

if [ -f "${BACKUP_PATH}/uploads.tar.gz" ]; then
  log "Restoring uploads directory..."

  UPLOADS_PARENT=$(dirname "${UPLOADS_DIR}")
  UPLOADS_BASE=$(basename "${UPLOADS_DIR}")

  # Backup current uploads before overwriting
  if [ -d "${UPLOADS_DIR}" ]; then
    mv "${UPLOADS_DIR}" "${UPLOADS_DIR}.pre-restore.$(date +%s)"
    log "Existing uploads moved to ${UPLOADS_DIR}.pre-restore.*"
  fi

  mkdir -p "${UPLOADS_PARENT}"
  tar -xzf "${BACKUP_PATH}/uploads.tar.gz" -C "${UPLOADS_PARENT}"
  log "Uploads restore complete: ${UPLOADS_DIR}"
else
  log "No uploads.tar.gz found in backup – skipping uploads restore."
fi

# ── Done ──────────────────────────────────────────────────────────────────────

log "Restore complete. Restart the application to verify."
log "  docker compose restart backend"
