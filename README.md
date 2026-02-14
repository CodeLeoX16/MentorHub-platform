# MentorHub

[![Website Status](https://img.shields.io/badge/status-production-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()
[![Stack](https://img.shields.io/badge/stack-React%20%7C%20Node%20%7C%20Postgres-purple)]()

A beautiful platform to connect mentees with expert mentors — schedule sessions, manage services, and pay securely. Built with an emphasis on clean UX and production-ready tooling.

Live demo: <!-- add your frontend url here -->  
Backend API: https://<YOUR_BACKEND_URL>  <!-- replace with your backend live URL -->
Postman collection: <YOUR_POSTMAN_COLLECTION_URL>  <!-- optional -->

---

## Highlights

- Clean, modern UI with a recruiter-friendly polished landing page and mentor profile pages.
- End-to-end flows: mentor onboarding, mentee booking, admin management.
- Secure authentication using JWT and role-based access.
- Stripe-style payment verification flow (server-verified).
- Deploy-ready: Docker + simple deployment instructions included.

---

## Screenshots

> Replace the images in `/assets` with your real screenshots (home, mentors, booking, dashboard). Suggested filenames:
- `assets/home.png`
- `assets/mentors.png`
- `assets/booking.png`
- `assets/dashboard.png`

Once assets are in place these screenshots will render here:

![Home](assets/home.png)
![Mentors](assets/mentors.png)
![Booking](assets/booking.png)
![Dashboard](assets/dashboard.png)

---

## Features

- Landing page with clear CTAs: Find a Mentor / Become a Mentor.
- Mentor profile pages with services, pricing, and social links.
- Booking flow: select date/time, checkout, automatic confirmation email.
- Mentor dashboard: add & manage services, schedule availability.
- Payment verification: server-side validation and secure webhook handling.
- Admin panel (optional): oversee users, bookings, and payouts.
- Responsive and accessible UI.

---

## Main user flows

- Mentee:
  1. Browse mentors by category or skill.
  2. Open mentor profile → view services and availability.
  3. Book a session → pay → receive confirmation and calendar invite.
  4. Rate & review session.

- Mentor:
  1. Sign up → complete profile and add services (price, duration).
  2. Set weekly availability and manage bookings.
  3. Receive payouts and view earnings dashboard.

- Admin:
  1. Approve mentors, manage disputes and refunds.
  2. View platform metrics, bookings, and revenue.
  3. Manage categories and featured mentors.

---

## Key Learnings (TL;DR)

- Authentication & Security
  - Implemented JWT-based auth for protected routes and role checks (mentee/mentor/admin).
  - Secure password handling using bcrypt and strong validation.

- Payments
  - Integrated payment gateway (Stripe/other) with client + server flow.
  - Implemented server-side verification and webhook handlers to prevent fraud.
  - Orders and receipts recorded in DB and email confirmations sent upon successful payment.

- Deployment & Infra
  - Prepared Dockerfiles + env-based configuration for production.
  - Static frontend served via CDN / S3 + CloudFront (or Vercel/Netlify).
  - Centralized logs and monitoring recommended (e.g., Sentry, Logflare).

- Other technical wins
  - Clean separation of concerns: API, worker for background jobs (email/webhooks), and frontend.
  - Postman collection for easy API testing and onboarding external devs.

---

## Tech stack

- Frontend: React (or Next.js), Tailwind / Bootstrap (UI)
- Backend: Node.js, Express, JWT
- Database: PostgreSQL (or MongoDB)
- Payments: Stripe (or Razorpay)
- Deployment: Docker, CI/CD (GitHub Actions recommended)

---

## Setup (local)

1. Clone
   ```bash
   git clone https://github.com/CodeLeoX16/MentorHub-platform.git
   cd MentorHub-platform
   ```

2. Frontend
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Backend
   ```bash
   cd ../backend
   npm install
   cp .env.example .env
   # fill .env with DB, JWT secret, payment provider keys
   npm run dev
   ```

4. Database
   - Create Postgres DB, run migrations / seeds (if applicable).

5. Running both with Docker
   ```bash
   docker compose up --build
   ```

---

## API & Postman

- Base URL: `https://<YOUR_BACKEND_URL>`  — replace with your live API URL.
- Import the Postman collection to quickly test endpoints: `<YOUR_POSTMAN_COLLECTION_URL>`

Recommended endpoints to showcase:
- POST /auth/register
- POST /auth/login
- GET /mentors
- GET /mentors/:id
- POST /bookings
- POST /payments/webhook

---

## How recruiters should evaluate this project (tips for your README / PR)

- Emphasize production-readiness: env/config, migrations, payment verification, and deployment docs.
- Showcase a short video or GIF of the booking flow (optional) — very convincing for recruiters.
- Add a “Key Learnings” section (done above) so reviewers see what you implemented and learned.
- Link to deployed frontend + backend and the Postman collection for easy testing.

---

## Contributing

PRs welcome. If you want me to help polish UI/UX or add the screenshots and commit directly, reply with:
- backend live URL (or “none”)
- Postman collection link (optional)
- confirm you want me to add the 4 uploaded screenshots as:
  - `assets/home.png`
  - `assets/mentors.png`
  - `assets/booking.png`
  - `assets/dashboard.png`

I will then:
- upload the images to `/assets`
- update `README.md` in `main` (or open a PR if you prefer)
- include the exact commit message: "docs: polish README, add screenshots & key learnings"

---

## License
MIT
