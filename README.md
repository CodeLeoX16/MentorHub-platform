# MentorHub Platform 🚀  
### Book Mentoring Sessions • Secure Payments • Zoom Integration

A modern full-stack mentoring platform where users can discover mentors, book sessions, pay securely via Razorpay, and join meetings through Zoom.

🔗 **Live Demo:** https://mentorhub-platform-frontend2.onrender.com

---

## 🏆 Project Highlights (What makes this impressive)

✅ Real-world **Payment Gateway Integration (Razorpay)**  
✅ Secure **JWT Authentication System**  
✅ **Zoom Meeting Scheduling API** integration  
✅ Custom **Email Notifications** using Nodemailer  
✅ Cloud media uploads via **Cloudinary**  
✅ Full-stack **MERN architecture**  
✅ Responsive modern UI with Ant Design + Tailwind  
✅ Production deployment on **Render**

---

## ✨ Features

### 👤 User System
- Mentor & Mentee account registration
- Secure login with JWT authentication
- Profile management with image upload

### 🔎 Mentor Discovery
- Search mentors by skills
- Filter by availability & pricing
- View mentor profiles

### 📅 Booking System
- Schedule mentoring sessions
- Availability slot management
- Booking dashboard

### 💳 Payment Integration
- Secure payments using Razorpay
- Order verification system
- Custom email receipts

### 🎥 Meeting Integration
- Zoom API session scheduling
- Automated meeting link generation

### 📩 Email System
- Payment confirmation emails
- Booking notifications
- Session updates

### 📱 UI Experience
- Fully responsive design
- Toast notifications
- Clean dashboard interface

---

## 🧰 Tech Stack

### Frontend
- React 18 (Create React App)
- React Router DOM
- Ant Design + Tailwind CSS
- Zustand (State Management)
- Axios for API calls
- React Hook Form
- React Hot Toast

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Joi Validation
- Razorpay Payment API
- Zoom API Integration
- Nodemailer Email System
- Cloudinary + Multer File Upload

---

## 📁 Project Structure

MentorHub-platform/
│
├── frontend/ # React App
│ ├── src/
│ │ ├── components/
│ │ ├── page/
│ │ ├── apiManger/
│ │ └── utils/
│
├── backend/ # Express API
│ ├── src/
│ │ ├── routes/
│ │ ├── controllers/
│ │ ├── models/
│ │ └── middleware/
│
└── README.md


---

## ⚡ Getting Started (Run Locally)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/CodeLeoX16/MentorHub-platform.git
cd MentorHub-platform
```

2️⃣ Install Dependencies
Frontend
cd frontend
npm install

Backend
cd ../backend
npm install

3️⃣ Setup Environment Variables
Create .env files (never commit secrets).

Backend .env
PORT=4000
DB_URL=YOUR_MONGODB_URL

CLOUDINARY_CLOUD_NAME=YOUR_NAME
CLOUDINARY_API_KEY=YOUR_KEY
CLOUDINARY_API_SECRET=YOUR_SECRET

SMTP_USERNAME=YOUR_SMTP_USERNAME
SMTP_PASSWORD=YOUR_SMTP_PASSWORD
SMTP_HOST=YOUR_SMTP_HOST
SMTP_PORT=YOUR_SMTP_PORT
EMAIL_FROM=YOUR_FROM_EMAIL

RAZORPAY_KEY_ID=YOUR_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET

ZOOM_ACCOUNT_ID=YOUR_ACCOUNT_ID
ZOOM_CLIENT_ID=YOUR_CLIENT_ID
ZOOM_CLIENT_SECRET=YOUR_CLIENT_SECRET
Frontend .env
REACT_APP_BASE_URL=http://localhost:4000/api
REACT_APP_RAZORPAY_KEY_ID=YOUR_KEY_ID
4) Run
# Backend
cd backend
npm run dev

# Frontend (new terminal)
cd frontend
npm start
Frontend: http://localhost:3000

✅ API Health Check
curl http://localhost:4000/api/health
Expected:

{ "status": "ok" }
🧾 Project Structure
MentorHub-platform/
  frontend/        # React app
    src/
      components/
      page/
      apiManger/
  backend/         # Express API
    src/
      routes/
      controllers/
      models/
      utils/
🚀 Deployment (Render)
Frontend (Static Site)
Root Directory: frontend

Build Command: npm install && npm run build

Publish Directory: build

Rewrite Rule (React Router):

/* -> /index.html (200)

Backend (Web Service)
Root Directory: backend

Build Command: npm install

Start Command: npm start

Add env vars in Render dashboard

🔐 Security Notes
Never commit .env files

Verify Razorpay payment signatures server-side

Validate all payloads with Joi

Use HTTPS in production

🗺️ Roadmap
Google/Outlook Calendar sync

Real-time chat (WebSockets)

Recommendations (ranking + personalization)

Admin analytics dashboard

Mobile app (React Native)

🤝 Contributing
Contributions are welcome:

Fork repo ⭐

Create branch: git checkout -b feat/feature-name

Commit: git commit -m "Add feature"

Push and open a PR

📄 License
MIT © 2026 — see LICENSE

📬 Contact
Maintained by CodeLeoX16
For suggestions: open an issue or discussion on GitHub.


---

### 3 quick upgrades that make recruiters trust it more
1) **Add real screenshots** in `/assets` (home, mentors, booking, dashboard).  
2) Add a **short “Key Learnings”** section (payments verification, JWT, deployment).  
3) Add a **Backend Live API URL** (if deployed) + Postman collection link (optional). 

If you want, paste:
- your backend live URL (if you deployed it)
- your main user flows (mentor/mentee/admin)
and I’ll tailor the “Highlights” + “Features” section to match exactly what you implemented.