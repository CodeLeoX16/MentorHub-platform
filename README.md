# MentorHub Platform 🚀

[Live Demo](https://mentorhub-platform-frontend2.onrender.com) • A modern, friendly place to connect mentors and mentees

[![Live Demo](https://img.shields.io/badge/Live-Demo-Visit%20Now-brightgreen)](https://mentorhub-platform-frontend2.onrender.com) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE) [![Issues](https://img.shields.io/github/issues/CodeLeoX16/MentorHub-platform)](https://github.com/CodeLeoX16/MentorHub-platform/issues)  

---

Table of Contents
- [About](#about)
- [Demo & Screenshots](#demo--screenshots)
- [Why MentorHub?](#why-mentorhub)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Environment (Quick reference)](#environment-quick-reference)
- [Getting Started (Run locally)](#getting-started-run-locally)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Testing & CI](#testing--ci)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

---

## About
MentorHub is a beautiful, easy-to-use platform built to help professionals, students, and hobbyists find and book time with experienced mentors. It focuses on discoverability, scheduling, secure communication, and continuous feedback — all built with developer-friendly tools so contributors can add features fast.

## Demo & Screenshots
Try the live demo: https://mentorhub-platform-frontend2.onrender.com

Include screenshots/GIFs to show the experience (upload images into `/assets` and reference them here):

```markdown
![Home Screen](./assets/home.png)
![Booking Flow](./assets/booking.gif)
```

---

## Why MentorHub?
- Fast onboarding for mentors and mentees
- Built-in scheduling integrations (Zoom)
- Secure messaging and post-session feedback
- Payments and bookings via Razorpay
- Designed to be extensible for community contributors

---

## Key Features
- ✨ Create and manage mentor and mentee profiles
- 🔎 Search & filter mentors by skills, availability, and rating
- 📆 Book and manage mentoring sessions (Zoom + calendar support)
- 💬 Secure messaging between mentors and mentees
- ⭐ Session reviews and rating system
- 📱 Responsive UI for desktop and mobile

---

## Tech Stack

Frontend
- React (Create React App, React 18)
- React Router
- Ant Design + Tailwind CSS utilities (for fast, consistent UI)
- Axios for HTTP requests
- Zustand for lightweight state management
- React Hook Form, React Hot Toast, React Icons
- Moment, React Modal
- Testing: @testing-library/react & related libs

Backend
- Node.js + Express
- MongoDB (Mongoose)
- JWT authentication
- Joi for validation
- Payments: Razorpay
- Scheduling: Zoom API integration
- Emails: Nodemailer (SMTP)
- Media: Cloudinary (via Multer uploads)
- Utilities: cookie-parser, cors, dotenv, moment
- Dev: nodemon

---

## Environment (Quick reference)

Create a `.env` for the backend and (if needed) a `.env` for the frontend. Example values below — replace placeholders with real secrets.

Backend (.env)
```env
PORT=<port number>
DB_URL=<mongodb url>

CLOUDINARY_CLOUD_NAME=<cloudinary cloud name>
CLOUDINARY_API_KEY=<cloudinary api key>
CLOUDINARY_API_SECRET=<cloudinary api secret>

SMTP_USERNAME=<smtp username>
SMTP_PASSWORD=<smtp password>
EMAIL_FROM=<email from>
SMTP_HOST=<smtp host>
SMTP_PORT=<smtp port>

RAZORPAY_KEY_ID=<razorpay key id>
RAZORPAY_KEY_SECRET=<razorpay key secret>

ZOOM_ACCOUNT_ID=<zoom account id>
ZOOM_CLIENT_ID=<zoom client id>
ZOOM_CLIENT_SECRET=<zoom client secret>
```

Frontend (.env)
```env
REACT_APP_BASE_URL=http://localhost:4000/api    # or your API URL
REACT_APP_RAZORPAY_KEY_ID=<razorpay_key_id>
```

Security note: never commit `.env` files or secrets to the repo. Use GitHub Actions secrets / Render/Heroku environment settings for production.

---

## Getting Started — Run Locally

These are example commands — adjust to your repo layout (monorepo vs single project).

1. Clone
```bash
git clone https://github.com/CodeLeoX16/MentorHub-platform.git
cd MentorHub-platform
```

2. Install dependencies
- Monorepo (frontend + backend)
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

- Single project
```bash
npm install
```

3. Configure environment variables
- Create `.env` files as shown above in backend and frontend folders.

4. Start servers
```bash
# Backend
cd backend
npm run dev        # or `npm start` depending on your scripts

# Frontend
cd ../frontend
npm run start      # CRA dev server, usually opens at http://localhost:3000
```

Optional: Docker
- If you prefer Docker, add a `docker-compose.yml` to orchestrate MongoDB, backend, and frontend and run:
```bash
docker-compose up --build
```

---

## Quick API check
After backend starts (e.g. http://localhost:4000):
```bash
curl http://localhost:4000/api/health
# -> { "status": "ok" } (example)
```

---

## Usage (User flows)
- Sign up as mentor or mentee
- Mentor: add expertise, hourly rates, available slots, profile picture
- Mentee: browse mentors, pick time, pay via Razorpay, join session (Zoom), leave review
- Messaging: contact mentor pre/post booking
- Admins: view bookings, manage users, handle disputes

---

## Project Structure (example)
```
/frontend       # React app (Create React App)
  /src
    /components
    /pages
    /services
/backend        # Express API
  /src
    /models
    /routes
    /controllers
    /utils
```
Update this section to reflect the true layout if necessary.

---

## Testing & CI
- Frontend: @testing-library/react
- Backend: Jest / supertest (if present)
- Suggested: add GitHub Actions for:
  - lint
  - test
  - build
  - deploy (Render/Heroku)

Example CI badges (add to top once configured):
```markdown
[![Tests](https://img.shields.io/github/actions/workflow/status/CodeLeoX16/MentorHub-platform/ci.yml?branch=main)](...)
```

---

## Contributing — We ♥ contributions
Want to help build MentorHub? Great! Follow these steps:

1. Star the repo ⭐ and fork it
2. Create a descriptive branch: `git checkout -b feat/booking-improvements`
3. Commit logically with meaningful messages
4. Push the branch: `git push origin feat/booking-improvements`
5. Open a Pull Request and describe:
   - What you changed
   - Why it helps
   - Screenshots or recordings of UI changes
6. Follow code style, add tests where applicable

Helpful contribution ideas:
- Improve the matching algorithm
- Add calendar sync (Google/Outlook)
- Improve tests & CI
- Add mobile-friendly styling / PWA support
- Add i18n support

Code of Conduct
- Please follow a friendly Code of Conduct — file `CODE_OF_CONDUCT.md` (suggested)

Maintainer Tips
- Use issue templates and PR templates for faster reviews
- Label beginner-friendly issues with `good first issue`

---

## Roadmap
Planned improvements:
- Google / Outlook calendar sync
- Real-time chat (WebSockets)
- Advanced mentor recommendation engine
- Mobile apps (React Native)
- Organization / team accounts

Want to help implement any roadmap item? Open an issue or a draft PR and tag it with `help wanted`.

---

## License
MIT © 2026 — See the [LICENSE](./LICENSE) file.

---

## Contact
Maintained by CodeLeoX16 — open an issue, discussion, or contact via GitHub.

---

If you'd like, I can:
- generate ready-to-paste GitHub Action CI badges and config,
- create issue templates (bug/feature/good-first-issue),
- add a PR template and Code of Conduct,
- or scan the repo and fill in exact commands and structure for the README.

Tell me which next step you want and I’ll prepare it.
