# MentorHub — Full-Stack Mentorship Platform (Bookings · Payments · Admin Analytics)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-brightgreen)](https://mentorhub-platform-frontend2.onrender.com)
[![Stars](https://img.shields.io/github/stars/CodeLeoX16/MentorHub-platform?style=social)](https://github.com/CodeLeoX16/MentorHub-platform/stargazers)

**MentorHub** is a production-style, full-stack platform that connects mentors and mentees with **secure authentication**, **role-based access**, **Razorpay payments**, **bookings**, and **admin-grade financial analytics** (including CSV export).

**Demo:** https://mentorhub-platform-frontend2.onrender.com

---

## Recruiter-friendly highlights

- **Auth & security:** JWT **access + refresh** token flow, protected routes, RBAC (`viewer`, `analyst`, `admin`)
- **Payments:** Razorpay booking flow + payment confirmation + transaction creation
- **Finance analytics:** transaction aggregation API + **CSV export**
- **Admin experience:** dashboard totals + download reports
- **Email notifications:** booking/payment confirmations using SMTP (Nodemailer)
- **Clean project split:** `backend/` (Express API) + `frontend/` (React)

---

## Quick preview

### Landing
![Hero / Landing page](https://github.com/user-attachments/assets/1bf310b9-24b4-414e-9bf5-6aeb05b8534f)

### Mentor dashboard — Services
![Mentor dashboard — Services](https://github.com/user-attachments/assets/b18c2d2c-f66a-4b75-9685-c6a84f21e395)

### Payments — UPI QR + options
![Payment modal — UPI QR and options](https://github.com/user-attachments/assets/e5360644-b66d-44fc-9757-d5899374a40f)

### Payment confirmation email
![Payment confirmation email](https://github.com/user-attachments/assets/ececfb75-3edb-4407-ae8e-1e8a77ec6322)

---

## Table of Contents

- [Why this project](#why-this-project)
- [Core features](#core-features)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Repository structure](#repository-structure)
- [Setup & run locally](#setup--run-locally)
- [Environment variables](#environment-variables)
- [Auth flow](#auth-flow)
- [Role-based access control (RBAC)](#role-based-access-control-rbac)
- [Finance Data API](#finance-data-api)
- [API overview (selected)](#api-overview-selected)
- [Admin scripts](#admin-scripts)
- [Assumptions & tradeoffs](#assumptions--tradeoffs)
- [Security checklist](#security-checklist-before-public-deploy)
- [Testing & CI](#testing--ci)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [License](#license)

---

## Why this project

Mentorship scales learning. MentorHub is built to resemble a real product: **authentication**, **payments**, **bookings**, **transaction reporting**, and **admin analytics** — the parts recruiters care about because they reflect production concerns.

---

## Core features

- Mentor / mentee accounts
- Profile + skills + availability
- Booking initiation + confirmation flow
- Razorpay payments
- Transaction ledger (records every paid booking)
- Admin dashboard with totals + analytics
- CSV export (admin-only)
- Email notifications (booking confirmation + meeting details)
- Optional integrations: Zoom, Cloudinary uploads
- **Finance CRUD with RBAC** (viewer / analyst / admin)
- **Dashboard summary APIs** (income, expenses, balance, trends)
- **User management APIs** (admin can list users, set roles, toggle active/inactive)

---

## Architecture

**Backend (Express + MongoDB)**
- JWT access token for API calls
- Refresh token rotation (secure session handling)
- RBAC middleware (`restrictTo`) for protected endpoints
- FinancialRecord model + aggregation endpoints for dashboard analytics
- Soft delete for financial records
- User management endpoints (admin only)

**Frontend (React)**
- Role-aware UI (admin dashboard visibility)
- Admin analytics view + CSV download
- Tailwind + Ant Design components

---

## Tech stack

**Frontend**
- React (Create React App)
- React Router
- Ant Design + Tailwind CSS
- Axios
- Zustand
- React Hook Form

**Backend**
- Node.js / Express
- MongoDB + Mongoose
- JWT authentication
- Joi validation
- Razorpay integration (payments)
- Nodemailer (SMTP email)
- Optional: Zoom API, Cloudinary, Multer

---

## Repository structure

```
backend/
  models/          Mongoose schemas (User, FinancialRecord, ...)
  services/        Business logic (auth, finance, user, ...)
  controllers/     HTTP handlers
  routes/v1/       Express routers with RBAC middleware
  middleware/      auth (protect + restrictTo), validation, error
  validations/     Joi schemas
  scripts/         Admin seed + role assignment utilities
frontend/
  src/             React application
```

---

## Setup & run locally

### Prerequisites
- Node.js >= 16
- npm
- MongoDB (Atlas recommended)

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env
# Fill in backend/.env (do NOT commit real secrets)
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
# Set REACT_APP_BASE_URL and REACT_APP_RAZORPAY_KEY_ID in your environment
npm start
```

---

## Environment variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default 5000) |
| `DB_URL` | MongoDB connection string |
| `JWT_ACCESS_SECRET` | Secret for access tokens |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens |
| `JWT_VERIFICATION_SECRET` | Secret for email verification tokens |
| `JWT_ACCESS_EXPIRATION_MINUTES` | Access token TTL in minutes |
| `JWT_REFRESH_EXPIRATION_DAYS` | Refresh token TTL in days |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `EMAIL_FROM` | SMTP config |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Razorpay credentials |
| `CLOUDINARY_*` | Optional: image uploads |
| `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET` | Optional: Zoom meetings |

### Frontend (host env)

| Variable | Description |
|---|---|
| `REACT_APP_BASE_URL` | Backend API base URL |
| `REACT_APP_RAZORPAY_KEY_ID` | Razorpay public key |

**Important:** Never commit `.env` files. Use the `.env.example` templates.

---

## Auth flow

1. **Sign up** — `POST /v1/auth/signup` with `name`, `email`, `password`, `username`, and `role` (`viewer`, `analyst`, `mentor`, or `student`).  
   The `admin` role is reserved and must be assigned via the seed script or `setUserRole.js`.
2. **Sign in** — `POST /v1/auth/signin` returns `{ user, tokens: { accessToken, refreshToken } }`.
3. **Authenticated requests** — include `Authorization: Bearer <accessToken>` on every protected request.
4. **Refresh** — `POST /v1/auth/refresh-token` with `{ refreshToken }` to obtain new tokens.
5. **Sign out** — `POST /v1/auth/signout` revokes the refresh token.

Inactive accounts (`status: "inactive"`) are blocked at both login and token validation — existing sessions become invalid immediately when an account is deactivated.

---

## Role-based access control (RBAC)

| Role     | Finance records   | Dashboard summaries | User management |
|----------|-------------------|---------------------|-----------------|
| viewer   | read-only         | —                   | —               |
| analyst  | read-only         | full access         | —               |
| admin    | full CRUD         | full access         | full access     |
| mentor   | —                 | —                   | —               |
| student  | —                 | —                   | —               |

RBAC is enforced via `restrictTo(...roles)` middleware applied to every route.

---

## Finance Data API

All finance routes require a valid Bearer token (`Authorization: Bearer <accessToken>`).

### Create a record — `POST /v1/finance/records`
**Required role:** `admin`

```json
{
  "amount": 5000,
  "type": "income",
  "category": "Consulting",
  "date": "2025-03-15",
  "notes": "March consulting fee"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Financial record created successfully",
  "record": { "_id": "...", "amount": 5000, "type": "income", "category": "Consulting", ... }
}
```

---

### List records — `GET /v1/finance/records`
**Required role:** `viewer`, `analyst`, `admin`

**Query params:** `type`, `category`, `startDate`, `endDate`, `page` (default 1), `limit` (default 20, max 100)

```
GET /v1/finance/records?type=expense&category=Rent&startDate=2025-01-01&endDate=2025-03-31
```

**Response 200:**
```json
{
  "success": true,
  "records": [...],
  "pagination": { "total": 42, "page": 1, "limit": 20, "pages": 3 }
}
```

---

### Get single record — `GET /v1/finance/records/:id`
**Required role:** `viewer`, `analyst`, `admin`

---

### Update record — `PUT /v1/finance/records/:id`
**Required role:** `admin`

Send any subset of fields to update:
```json
{ "amount": 6000, "notes": "Updated fee" }
```

---

### Delete record — `DELETE /v1/finance/records/:id`
**Required role:** `admin`

Performs a **soft delete** — sets `deletedAt` timestamp. Records are excluded from all subsequent queries but preserved for audit purposes.

---

### Dashboard summary — `GET /v1/finance/dashboard/summary`
**Required role:** `analyst`, `admin`

```json
{
  "success": true,
  "summary": { "totalIncome": 50000, "totalExpenses": 30000, "netBalance": 20000 }
}
```

---

### Category breakdown — `GET /v1/finance/dashboard/categories`
**Required role:** `analyst`, `admin`

```json
{
  "success": true,
  "categories": [
    { "type": "expense", "category": "Rent", "total": 15000, "count": 3 },
    { "type": "income", "category": "Consulting", "total": 30000, "count": 6 }
  ]
}
```

---

### Recent activity — `GET /v1/finance/dashboard/recent?limit=10`
**Required role:** `analyst`, `admin`

Returns the most recent N financial records (max 50).

---

### Monthly trends — `GET /v1/finance/dashboard/trends?months=6`
**Required role:** `analyst`, `admin`

Returns income and expense totals grouped by year+month for the last N months (max 24).

```json
{
  "success": true,
  "trends": [
    { "year": 2025, "month": 1, "type": "income", "total": 12000, "count": 3 },
    { "year": 2025, "month": 1, "type": "expense", "total": 8000, "count": 5 }
  ]
}
```

---

## API overview (selected)

### Auth
| Method | Path | Description |
|---|---|---|
| POST | `/v1/auth/signup` | Register (roles: `mentor`, `student`, `viewer`, `analyst`) |
| POST | `/v1/auth/signin` | Returns `{ user, tokens }` |
| POST | `/v1/auth/refresh-token` | Rotate refresh token |
| POST | `/v1/auth/signout` | Revoke refresh token |

### Finance Records
| Method | Path | Role |
|---|---|---|
| POST | `/v1/finance/records` | admin |
| GET | `/v1/finance/records` | viewer, analyst, admin |
| GET | `/v1/finance/records/:id` | viewer, analyst, admin |
| PUT | `/v1/finance/records/:id` | admin |
| DELETE | `/v1/finance/records/:id` | admin |

### Dashboard Summaries
| Method | Path | Role |
|---|---|---|
| GET | `/v1/finance/dashboard/summary` | analyst, admin |
| GET | `/v1/finance/dashboard/categories` | analyst, admin |
| GET | `/v1/finance/dashboard/recent` | analyst, admin |
| GET | `/v1/finance/dashboard/trends` | analyst, admin |

### User Management (Admin)
| Method | Path | Description |
|---|---|---|
| GET | `/v1/user/admin/list` | List all users (paginated) |
| PATCH | `/v1/user/admin/:id/role` | Set user role |
| PATCH | `/v1/user/admin/:id/status` | Activate / deactivate user |

### Transactions & reporting
| Method | Path | Role |
|---|---|---|
| GET | `/v1/transaction/summary` | Protected |
| GET | `/v1/transaction/export` | admin (CSV export) |

### Bookings
| Method | Path | Description |
|---|---|---|
| POST | `/v1/booking/initiate` | Initiate booking + payment |
| POST | `/v1/booking/confirm` | Confirm payment + send email |

---

## Admin scripts

Seed an admin user:
```bash
cd backend
npm run seed-admin
```

Promote an existing user to any role:
```bash
cd backend
node scripts/setUserRole.js <email> <role>
# role: mentor | student | admin | analyst | viewer
```

Example:
```bash
node scripts/setUserRole.js user@example.com analyst
```

---

## Assumptions & tradeoffs

- **Admin is not self-assignable.** The `admin` role can only be granted via `scripts/setUserRole.js` or `npm run seed-admin`. This prevents privilege escalation through the public API.
- **Soft delete for financial records.** `DELETE` sets `deletedAt` rather than removing the document. All read/aggregate queries filter out soft-deleted records. This preserves audit history.
- **Finance records are organisation-wide.** There is no per-user scoping — all records belong to the organisation. The `createdBy` field records who entered the record.
- **MongoDB/Mongoose reused.** No new database layer was introduced; the existing Mongoose setup is extended.
- **Inactive user blocking is immediate.** Deactivating an account blocks both new logins and existing active tokens (checked in the `protect` middleware on every request).
- **Viewer cannot see dashboard summaries.** Only `analyst` and `admin` can access aggregated data. This reflects a deliberate separation between raw data access and analytics access.
- **Pagination defaults** — List endpoints default to 20 items/page with a max of 100.

---

## Security checklist (before public deploy)

- Rotate keys if any secrets were ever committed (use BFG / `git filter-repo`).
- Use host environment variable UI (Render/Netlify/Heroku) for all secrets.
- Add `helmet` for HTTP security headers.
- Add `express-rate-limit` to prevent brute-force attacks.
- Use a strict CORS allowlist.
- Use a transactional SMTP provider (SendGrid / Mailgun) for production email.
- Add structured logging (winston/pino) and monitoring.

---

## Testing & CI

- Add unit tests for services and controllers (Jest or Mocha + Supertest)
- Add GitHub Actions workflow to run lint + tests on every PR

---

## Troubleshooting

- **Emails not sent after deploy:** verify SMTP env vars + provider restrictions
- **Payments failing:** ensure Razorpay keys exist in both backend and frontend env
- **Admin UI not visible:** ensure `user.role === "admin"` after sign-in; clear `sessionStorage` and retry
- **403 on finance routes:** check that your access token belongs to a user with the correct role
- **Inactive account 403:** contact an admin to reactivate via `PATCH /v1/user/admin/:id/status`

---

## Roadmap

- OpenAPI / Swagger docs
- Unit + integration tests + CI
- CSV import for bulk financial record uploads
- Better scheduling UX + Zoom deep links

---

## License

MIT — see [LICENSE](./LICENSE).
