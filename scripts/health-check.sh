#!/usr/bin/env bash
# =============================================================================
# NREC College – Quick Operational Health Check
# =============================================================================
# Run this at any time to get a snapshot of the platform's health.
#
# Usage:
#   ./scripts/health-check.sh [--json]
#
# Options:
#   --json   Output results as a single JSON object (for monitoring integrations)
# =============================================================================

set -euo pipefail

JSON_MODE=false
[ "${1:-}" = "--json" ] && JSON_MODE=true

BACKEND_URL="${BACKEND_URL:-http://localhost:5001}"
FRONTEND_URL="${FRONTEND_URL:-http://localhost:3001}"

PASS="✅"
FAIL="❌"
WARN="⚠️ "

results=()

check() {
  local name="$1"
  local status="$2"   # pass | fail | warn
  local detail="${3:-}"

  if $JSON_MODE; then
    results+=("{\"check\":\"${name}\",\"status\":\"${status}\",\"detail\":\"${detail}\"}")
  else
    case "${status}" in
      pass) echo "${PASS} ${name}: ${detail}" ;;
      fail) echo "${FAIL} ${name}: ${detail}" ;;
      warn) echo "${WARN} ${name}: ${detail}" ;;
    esac
  fi
}

# ── Backend API Health ────────────────────────────────────────────────────────

BACKEND_HEALTH=$(curl -sf --max-time 5 "${BACKEND_URL}/api/health" 2>/dev/null || echo "")
if echo "${BACKEND_HEALTH}" | grep -q '"status":"healthy"'; then
  check "Backend API" "pass" "healthy – ${BACKEND_URL}"
else
  check "Backend API" "fail" "unreachable or unhealthy – ${BACKEND_URL}"
fi

# ── Frontend Availability ─────────────────────────────────────────────────────

FRONTEND_STATUS=$(curl -so /dev/null -w "%{http_code}" --max-time 5 "${FRONTEND_URL}/" 2>/dev/null || echo "000")
if [ "${FRONTEND_STATUS}" -lt 400 ] 2>/dev/null; then
  check "Frontend" "pass" "HTTP ${FRONTEND_STATUS} – ${FRONTEND_URL}"
else
  check "Frontend" "fail" "HTTP ${FRONTEND_STATUS} – ${FRONTEND_URL}"
fi

# ── Container Status ──────────────────────────────────────────────────────────

for container in nrec-mongodb nrec-backend-api nrec-frontend-app; do
  if docker ps --format '{{.Names}}' 2>/dev/null | grep -q "^${container}$"; then
    STATE=$(docker inspect --format '{{.State.Status}}' "${container}" 2>/dev/null)
    RESTARTS=$(docker inspect --format '{{.RestartCount}}' "${container}" 2>/dev/null)
    if [ "${STATE}" = "running" ]; then
      if [ "${RESTARTS}" -gt 5 ]; then
        check "Container: ${container}" "warn" "running but ${RESTARTS} restarts"
      else
        check "Container: ${container}" "pass" "running (restarts: ${RESTARTS})"
      fi
    else
      check "Container: ${container}" "fail" "state=${STATE}"
    fi
  else
    check "Container: ${container}" "warn" "not found (Docker may not be running)"
  fi
done

# ── Disk Space ────────────────────────────────────────────────────────────────

DISK_USAGE=$(df -h / | awk 'NR==2{print $5}' | tr -d '%')
if [ "${DISK_USAGE}" -lt 80 ] 2>/dev/null; then
  check "Disk space" "pass" "$(df -h / | awk 'NR==2{print $5}') used"
elif [ "${DISK_USAGE}" -lt 90 ] 2>/dev/null; then
  check "Disk space" "warn" "$(df -h / | awk 'NR==2{print $5}') used – approaching limit"
else
  check "Disk space" "fail" "$(df -h / | awk 'NR==2{print $5}') used – critical"
fi

# ── Recent Backups ────────────────────────────────────────────────────────────

BACKUP_DIR="${BACKUP_DIR:-/var/backups/nrec}"
LATEST_BACKUP=$(ls -1dt "${BACKUP_DIR}"/daily/nrec_daily_* 2>/dev/null | head -1 || echo "")
if [ -n "${LATEST_BACKUP}" ]; then
  BACKUP_AGE_HOURS=$(( ( $(date +%s) - $(date -r "${LATEST_BACKUP}" +%s) ) / 3600 ))
  if [ "${BACKUP_AGE_HOURS}" -lt 26 ]; then
    check "Last daily backup" "pass" "$(basename "${LATEST_BACKUP}") (${BACKUP_AGE_HOURS}h ago)"
  else
    check "Last daily backup" "warn" "${BACKUP_AGE_HOURS}h ago – may be overdue"
  fi
else
  check "Last daily backup" "warn" "no backup found in ${BACKUP_DIR}/daily/"
fi

# ── JSON output ───────────────────────────────────────────────────────────────

if $JSON_MODE; then
  echo "{\"timestamp\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",\"checks\":[$(IFS=,; echo "${results[*]}")]}"
fi
