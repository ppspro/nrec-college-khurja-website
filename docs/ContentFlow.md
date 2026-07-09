# Content Flow

1. **Admin Action**: An admin logs into the Admin Panel (`/admin`) and creates a new entity (e.g., a News post).
2. **API Request**: The frontend sends a POST request with JWT authentication to the Express Backend (`/api/news`).
3. **Database Insertion**: The Express controller validates the data, processes any file uploads (saving to `backend/uploads`), and inserts the record into MongoDB via Mongoose.
4. **Frontend Fetch**: When a user visits the public News page, Next.js fetches the latest news from the Express API (`GET /api/news`).
5. **Rendering**: The public frontend renders the fetched dynamic data, replacing the static hardcoded layouts.
