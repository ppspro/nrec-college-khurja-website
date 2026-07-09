# File Storage

Static assets and user uploads are managed via the backend.

- **Upload Directory**: `backend/uploads/`
- **Serving URL**: `http://localhost:5000/uploads/` (or production equivalent)
- **Handled Files**: Images (courses, faculty, news, gallery), PDFs (curriculum, downloads, notices)

File uploads are handled in Express using `multer`.
