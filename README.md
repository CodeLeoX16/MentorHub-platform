# MentorHub Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://mentorhub-platform-frontend2.onrender.com)
[![Stars](https://img.shields.io/github/stars/CodeLeoX16/MentorHub-platform?style=social)](https://github.com/CodeLeoX16/MentorHub-platform/stargazers)

TL;DR
-----
MentorHub connects mentors and mentees with scheduling, session notes, resource sharing, and simple matching. Try the live demo: https://mentorhub-platform-frontend2.onrender.com

Demo / Quick Preview
--------------------
Live demo: https://mentorhub-platform-frontend2.onrender.com

Screenshots / Demo images
- Place these image files in `docs/` (recommended filenames):
  - docs/screenshot-1-hero.png — Hero / Landing page
  - docs/screenshot-2-services.png — Mentor dashboard (Services list)
  - docs/screenshot-3-payment.png — Payment modal (UPI QR & options)
  - docs/screenshot-4-confirmation-email.png — Payment confirmation email

Hero / Landing page  
![Hero / Landing page](<img width="1901" height="1071" alt="Screenshot 2026-02-14 160224" src="https://github.com/user-attachments/assets/1bf310b9-24b4-414e-9bf5-6aeb05b8534f" />
)

Mentor dashboard — Services  
![Mentor dashboard — Services](docs/screenshot-2-services.png)

Payment modal — UPI QR and options  
![Payment modal — UPI QR and options](docs/screenshot-3-payment.png)

Payment confirmation email (meeting link & details)  
![Payment confirmation email](docs/screenshot-4-confirmation-email.png)

Why this project
----------------
Mentorship scales learning — MentorHub aims to make it easy for communities, bootcamps, and organizations to manage mentor/mentee relationships with a simple, modern web UI and an extensible backend.

Table of Contents
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install & Run (Local)](#install--run-local)
- [Usage](#usage)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

Features
--------
- Account types: Mentor and Mentee
- Profile pages with skills and availability
- Search and match by skills and availability
- Scheduling with Zoom API integration
- Session notes, resource sharing, and ratings
- Payments via Razorpay
- Email notifications via Nodemailer

Tech stack
----------
Frontend
- React (Create React App, React 18)
- React Router
- Ant Design
- Tailwind CSS utilities
- Axios
- Zustand (state management)
- React Hook Form
- React Hot Toast
- React Icons
- Moment
- React Modal
- Testing libs: @testing-library/*

Backend
- Node.js / Express
- MongoDB with Mongoose
- JWT authentication
- Joi validation
- Razorpay (payments)
- Zoom API (scheduling)
- Nodemailer (SMTP email)
- Cloudinary (media)
- Multer (uploads)
- cookie-parser, cors, dotenv, moment
- Dev: nodemon

Getting started
---------------

Prerequisites
- Node.js >= 16, npm or Yarn
- MongoDB (local or hosted like Atlas)
- SMTP credentials for sending emails (or a testing SMTP)
- Razorpay account/keys (for payments)
- Zoom API credentials (for scheduling) — optional but recommended
- Cloudinary account (optional, for media uploads)

Install & Run (Local)
---------------------
Clone the repo:
```bash
git clone https://github.com/CodeLeoX16/MentorHub-platform.git
cd MentorHub-platform
```

Install dependencies:
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

Environment files
- server/.env (example)
```
PORT=4000
MONGO_URI=mongodb://localhost:27017/mentorhub
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
ZOOM_API_KEY=your_zoom_api_key
ZOOM_API_SECRET=your_zoom_api_secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=your_smtp_password
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

- client/.env (example)
```
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_SITE_URL=http://localhost:3000
REACT_APP_CLOUDINARY_CLOUD_NAME=...
```

Run locally
```bash
# Backend (dev)
cd server
npm run dev   # runs nodemon

# Frontend (CRA)
cd ../client
npm start     # runs Create React App dev server
```

Open http://localhost:3000 and use the app. You can also visit the live demo: https://mentorhub-platform-frontend2.onrender.com

Tests
-----
- Frontend: uses @testing-library/*  
  Example:
  ```bash
  cd client
  npm test
  ```

- Backend: add your tests and run (example)
  ```bash
  cd server
  npm test
  ```

Usage
-----
- Sign up as Mentor or Mentee
- Complete your profile with skills and availability
- Search for mentors/mentees and request sessions
- Pay for sessions via Razorpay and receive a meeting link/email
- After a session, add notes and shared resources

Project structure (typical)
---------------------------
/client         # frontend (Create React App)
/server         # backend (Express)
/docs           # screenshots, GIFs, docs
/README.md
/LICENSE

Contributing
------------
We welcome contributions!
1. Fork the repo
2. Create a branch: git checkout -b feat/your-feature
3. Make changes, add tests, and run them
4. Open a Pull Request describing your changes

Guidelines:
- Keep PRs small and focused
- Add tests for new features or bug fixes
- Update README/docs when behavior changes

Roadmap
-------
- v0.1: Profiles, matching, scheduling (MVP)
- v0.2: Improved scheduling UX (Zoom deep links), notifications
- v1.0: Analytics, enhanced payment & subscription flows, public API

Maintainers & Code of Conduct
----------------------------
This project follows a [Code of Conduct](./CODE_OF_CONDUCT.md). Maintainer: CodeLeoX16

License
-------
MIT — see [LICENSE](./LICENSE).

Contact
-------
Project owner: CodeLeoX16  
Live demo: https://mentorhub-platform-frontend2.onrender.com

Acknowledgements
----------------
Thanks to the open-source community and the libraries used.
