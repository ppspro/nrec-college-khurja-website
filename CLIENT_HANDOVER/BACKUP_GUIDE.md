# BACKUP_GUIDE.md
# NREC College CMS — Backup & Restore Guide

---

## What to Back Up

| Item | Location | Frequency |
|---|---|---|
| MongoDB Database | Local DB or Atlas | Daily |
| Uploaded Files | backend/uploads/ | Weekly |
| Environment Config | backend/.env, frontend/.env.local | On change |
| Codebase | Git repository | On every release |

---

## Database Backup

### Manual Backup
```bash
# Create a backup of the nrec_college database
mongodump --db nrec_college --out /backup/$(date +%Y-%m-%d)/

# This creates: /backup/2026-07-02/nrec_college/
```

### Automated Daily Backup (Linux Cron)
```bash
# Open crontab
crontab -e

# Add this line to run backup at 2:00 AM every day
0 2 * * * mongodump --db nrec_college --out /backup/$(date +\%Y-\%m-\%d) && find /backup -mtime +30 -exec rm -rf {} \;
```

This keeps 30 days of backups and auto-deletes older ones.

---

## Files Backup

```bash
# Backup uploaded files
tar -czf /backup/uploads-$(date +%Y-%m-%d).tar.gz /home/ubuntu/nrec-college-website/backend/uploads/

# Or use rsync to sync to another server
rsync -avz /home/ubuntu/nrec-college-website/backend/uploads/ backup-server:/backups/nrec-uploads/
```

---

## Using MongoDB Atlas (Cloud Backup — Recommended)

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free M0 cluster
3. Update `MONGODB_URI` in backend `.env` to your Atlas connection string
4. Atlas handles automated backups automatically

---

## Restore from Backup

### Restore Database
```bash
# Restore from a specific date
mongorestore --db nrec_college /backup/2026-07-02/nrec_college/

# This will OVERWRITE the current database
# Warning: All data after the backup date will be lost
```

### Restore Uploaded Files
```bash
# Extract backup archive
tar -xzf /backup/uploads-2026-07-02.tar.gz -C /home/ubuntu/nrec-college-website/backend/
```

---

## Troubleshooting Restore Issues

| Issue | Solution |
|---|---|
| mongorestore command not found | Install: `sudo apt install mongodb-clients` |
| Permission denied on backup folder | Run: `sudo chown -R ubuntu:ubuntu /backup` |
| Restore takes too long | Use `--drop` flag to clear collection first |
| Atlas connection fails after restore | Check IP whitelist in Atlas Network Access |

---

## Backup Verification

After every backup, verify it is valid:
```bash
# Check backup size is not zero
du -sh /backup/2026-07-02/

# Test restore to a temporary database
mongorestore --db nrec_test /backup/2026-07-02/nrec_college/
mongo nrec_test --eval "db.stats()"

# Clean up test DB
mongo --eval "db.getSiblingDB('nrec_test').dropDatabase()"
```

---

## Emergency Contacts

If backup or restore fails, contact your developer:
- Email: **info@nreccollege.ac.in**
- The MongoDB data directory on local installs is: `/var/lib/mongodb/`
