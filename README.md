## MentorHub Platform

Full-stack mentorship marketplace with mentor discovery, bookings, availability management, and Razorpay-backed payments.

### Stack
- Frontend: React (CRA), React Router, Ant Design, Tailwind utilities, Axios, Zustand state
- Backend: Node/Express, MongoDB/Mongoose, JWT auth, Cloudinary uploads, Razorpay payments, Zoom scheduling, Nodemailer (SMTP)
- Deployment: Render (backend service + frontend static site)

### Features
- Auth (student/mentor), profile and services management
- Mentor discovery, service details, booking with availability slots
- Razorpay checkout and booking confirmation email/Zoom link
- Dashboard: bookings, schedule/availability, payments view

### Local Setup
1) Prereqs: Node 18+ and MongoDB connection string.
2) Backend
   - `cd backend`
   - `npm install`
   - Copy [backend/.env.example](backend/.env.example) to `.env` and fill values (see Env Vars).
   - Run: `npm run dev` (or `npm start`).
3) Frontend
   - `cd frontend`
   - `npm install`
   - Create `.env` with `REACT_APP_BASE_URL` pointing to your backend (e.g., `http://localhost:5000/v1`) and `REACT_APP_RAZORPAY_KEY_ID`.
   - Run: `npm start` (CRA dev server on 3000).

### Env Vars
- Backend (.env):
  - `PORT`, `DB_URL`
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
  - `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_HOST`, `SMTP_PORT`, `EMAIL_FROM`
  - `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
  - `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`
  - `JWT_ACCESS_SECRET`, `JWT_ACCESS_EXPIRATION_MINUTES`, `JWT_VERIFICATION_SECRET`, `JWT_VERIFICATION_EXPIRATION_MINUTES`
- Frontend (.env):
  - `REACT_APP_BASE_URL`
  - `REACT_APP_RAZORPAY_KEY_ID`

### Build/Deploy
- Frontend (static site on Render):
  - Root: `frontend`
  - Build: `npm install && npm run build`
  - Publish: `build`
  - Redirect: `/* -> /index.html`
  - Set `NODE_VERSION=18.20.4` (or 20.x LTS) and frontend env vars.
- Backend (Render web service):
  - Root: `backend`
  - Build: `npm install`
  - Start: `npm start`
  - Set backend env vars above.

### Useful Scripts
- Backend: `npm run dev` (nodemon), `npm start`
- Frontend: `npm start`, `npm run build`

### Notes
- Payment history in the dashboard pulls live bookings; use the Refresh button to see latest statuses after payments.
- Lint warnings are clean; CRA warning about `@babel/plugin-proposal-private-property-in-object` is addressed via devDependency.