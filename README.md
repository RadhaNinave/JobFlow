# JobFlow

A clean role-based job portal built with Next.js 16, TypeScript, Tailwind CSS and MongoDB.

## Candidate
- Register / sign in / sign out
- Browse and search jobs
- View job details
- Apply once per job
- Track application status

## Admin
- Separate admin dashboard
- Create, edit, delete and close jobs
- View candidate applications
- Move applications through Applied → Reviewing → Shortlisted → Selected / Rejected
- Admin-only navigation and protected APIs

## Quick setup

```bash
npm install
cp .env.example .env.local
# add MongoDB Atlas URI and JWT secret
npm run seed
npm run dev
```

Seed admin:
- Email: `admin@jobflow.com`
- Password: `Admin@123`

Change the seed password before production use.

## API routes

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/me`

### Jobs
- GET `/api/jobs`
- GET `/api/jobs/:id`
- POST `/api/jobs` — admin
- PATCH `/api/jobs/:id` — admin
- DELETE `/api/jobs/:id` — admin

### Applications
- GET `/api/applications` — current user / admin
- POST `/api/applications` — candidate
- PATCH `/api/applications/:id` — admin

### Admin
- GET `/api/admin/stats` — admin

## Deployment

Deploy to Vercel, add `MONGODB_URI` and `JWT_SECRET` as environment variables, and use MongoDB Atlas for the database.
