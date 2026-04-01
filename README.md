# MentorHub — Full‑Stack Mentorship Platform (Bookings • Payments • Admin Analytics)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-brightgreen)](https://mentorhub-platform-frontend2.onrender.com)
[![Stars](https://img.shields.io/github/stars/CodeLeoX16/MentorHub-platform?style=social)](https://github.com/CodeLeoX16/MentorHub-platform/stargazers)

**MentorHub** is a production-style, full-stack platform that connects mentors and mentees with **secure authentication**, **role-based access**, **Razorpay payments**, **bookings**, and **admin-grade financial analytics** (including CSV export).

**Demo:** https://mentorhub-platform-frontend2.onrender.com

---

## Recruiter‑friendly highlights (what you can review fast)

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
- [API overview (selected)](#api-overview-selected)
- [Admin scripts](#admin-scripts)
- [Security checklist (before public deploy)](#security-checklist-before-public-deploy)
- [Testing & CI](#testing--ci)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [License](#license)

---

## Why this project

Mentorship scales learning. MentorHub is built to resemble a real product: **authentication**, **payments**, **bookings**, **transaction reporting**, and **admin analytics**—the parts recruiters care about because they reflect production concerns.

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

---

## Architecture

**Backend (Express + MongoDB)**
- JWT access token for API calls
- Refresh token rotation (secure session handling)
- RBAC middleware for protected endpoints
- Transactions model + aggregation endpoint for dashboard analytics
- CSV export endpoint for admin finance reports

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

- `backend/` — Express API, models, services, routes
- `frontend/` — React app (Tailwind + Ant Design)

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
# Fill values inside backend/.env (do NOT commit real secrets)
```

### 2) Frontend
```bash
cd frontend
npm install

# Set frontend env in your host or create a local .env if you use it
# Example: REACT_APP_BASE_URL, REACT_APP_RAZORPAY_KEY_ID
```

### Run (development)
```bash
# Backend
cd backend
npm run dev

# Frontend (new terminal)
cd frontend
npm start
```

---

## Environment variables

### Backend (`backend/.env`)
- `PORT`
- `DB_URL`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `EMAIL_FROM`
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `JWT_VERIFICATION_SECRET`
- `JWT_ACCESS_EXPIRATION_MINUTES`, `JWT_REFRESH_EXPIRATION_DAYS`
- Optional:
  - `CLOUDINARY_*`
  - `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`

### Frontend (host env)
- `REACT_APP_BASE_URL`
- `REACT_APP_RAZORPAY_KEY_ID`

**Important:** Don’t commit `.env` files. Use the `.env.example` templates.

---

## API overview (selected)

### Auth
- `POST /v1/auth/signup` — create user (default roles: `mentor`, `student`)
- `POST /v1/auth/signin` — returns `{ user, tokens }`
- `POST /v1/auth/refresh-token` — rotate refresh token and issue new tokens

### Transactions & reporting
- `GET /v1/transaction/summary` — aggregated totals (role-protected)
- `GET /v1/transaction/export` — CSV export (**admin-only**)

### Bookings
- `POST /v1/booking/initiate` — initiate booking + payment
- `POST /v1/booking/confirm` — confirm payment + create transaction + email notification

---

## Admin scripts

- Seed an admin:
```bash
cd backend
npm run seed-admin
```

- Promote an existing user:
```bash
cd backend
node scripts/setUserRole.js <email> admin
```

Example:
```bash
cd backend
node scripts/setUserRole.js bhuniasomnath2003@gmail.com admin
```

---

## Notable files (for quick code review)

- `backend/.env.example` — required env variables (no secrets)
- `backend/scripts/seedAdmin.js` — admin seed script
- `backend/scripts/setUserRole.js` — promote user role
- `backend/routes/v1/transaction.route.js` — transaction endpoints (summary + export)
- `frontend/src/page/dashboard/admin.jsx` — admin dashboard UI

---

## Security checklist (before public deploy)

- Rotate keys if secrets were ever committed. If `.env` was committed, remove from git history (BFG / `git filter-repo`).
- Use host environment variables UI (Render/Netlify/Heroku) for secrets.
- Add/enable:
  - `helmet`
  - `express-rate-limit`
  - strict CORS allowlist
- Use a transactional SMTP provider (SendGrid/Mailgun) or Gmail app password for production.
- Add logging (winston/pino) + monitoring if needed.

---

## Testing & CI

- Add unit tests for services/controllers (Jest or Mocha)
- Add GitHub Actions workflow to run lint + tests on every PR

---

## Troubleshooting

- **Emails not sent after deploy:** verify SMTP env vars + provider restrictions
- **Payments failing:** ensure Razorpay keys exist in both backend and frontend env
- **Admin UI not visible:** ensure `user.role === "admin"` after sign-in; clear `sessionStorage` and retry

---

## Roadmap

- OpenAPI / Swagger docs
- Unit + integration tests + CI
- Audit logs + soft delete
- CSV import for bulk uploads
- Better scheduling UX + Zoom deep links

---

## License

MIT — see [LICENSE](./LICENSE).

---

If you want, I can also write a **1‑page Render deployment guide** for this repo (backend + frontend + MongoDB Atlas + env setup).
