Project Documentation — MentorHub Platform
========================================

Purpose
-------
This short, recruiter-focused document explains what the project is, why it solves the assignment, and how to quickly review and run the app locally or against the deployed demo. It highlights where to look in the codebase and provides quick curl examples to exercise the key flows.

Links
-----
- Live demo: https://mentorhub-platform-frontend2.onrender.com
- Repository: https://github.com/CodeLeoX16/MentorHub-platform

1) How the project meets the assignment (at-a-glance)
--------------------------------------
- User and Role Management
  - Users are created via `POST /v1/auth/signup` and managed in `backend/models/user.model.js`.
  - Roles supported: `viewer`, `analyst`, `admin`. Role persistence is in the user document (`role` field).
  - Role checks enforced by `middleware/auth.js` (`protect` + `restrictTo`).

- Financial Records Management
  - Transactions are stored in `backend/models/transaction.model.js` with fields: `amount`, `type` (income/expense), `category`, `date`, `notes`, `createdBy` and `isDeleted` (soft-delete).
  - CRUD endpoints in `routes/v1/transaction.route.js` and business logic in `services/transaction.service.js`.
  - Filtering by date, category, and type supported via query parameters on list endpoints.

-- Dashboard Summary APIs
  - Aggregation endpoint: `GET /v1/transaction/summary` returns totals: `totalIncome`, `totalExpense`, `netBalance`, `categoryTotals`, `recentActivity`, and basic monthly trends.
  - Implemented with Mongoose aggregation in `transaction.service.js`.

- Access Control Logic
  - Middleware enforces role permissions: viewers can read summaries and lists; analysts can read and run aggregations; admins can create/update/delete transactions and manage users.

- Validation and Error Handling
  - Request validation uses Joi schemas in `validations/*` (e.g., `transaction.validation.js`).
  - Controllers return consistent error responses using `helper/apiError.js` and `middleware/error.js`.

- Data Persistence
  - MongoDB (Mongoose) is used for persistence. The DB URL is configured by `backend/.env` (`DB_URL`).

2) Quick API summary (endpoints to show a reviewer)
----------------------------------
- Authentication
  - `POST /v1/auth/signup` — create user
  - `POST /v1/auth/signin` — returns `{ user, tokens }`
  - `POST /v1/auth/refresh-token` — rotate refresh token

- Transactions
  - `POST /v1/transaction` — create transaction (admin only)
  - `GET /v1/transaction` — list transactions (roles: viewer/analyst/admin) — supports `?type=income|expense`, `?category=...`, `?start=YYYY-MM-DD&end=YYYY-MM-DD`, `?page=&limit=`
  - `GET /v1/transaction/:id` — get one
  - `PATCH /v1/transaction/:id` — update (admin only)
  - `DELETE /v1/transaction/:id` — soft-delete (admin only)
  - `GET /v1/transaction/summary` — aggregated dashboard data
  - `GET /v1/transaction/export` — CSV export (admin only)

  3) How a recruiter / reviewer should evaluate this repo (fast path)
  -----------------------------------------------------------------
  - Run the demo and check: authentication, RBAC enforcement, transaction CRUD, and the `summary` API.
  - Key files to open (order matters):
    - `backend/controllers/auth.controller.js` — auth flow + token shape
    - `backend/middleware/auth.js` — `protect()` and `restrictTo()` logic
    - `backend/models/transaction.model.js` — transaction schema
    - `backend/services/transaction.service.js` — aggregation & export logic
    - `frontend/src/page/dashboard/admin.jsx` — how the UI consumes the summary and export endpoints

  4) Quick curl examples (use these to demonstrate features)
  -----------------------------------------------------
  # Sign in (replace email/password)
  ```
  curl -X POST https://mentorhub-platformbackend.onrender.com/v1/auth/signin \
    -H "Content-Type: application/json" \
    -d '{"email":"you@example.com","password":"yourpassword"}'
  ```

  # Get dashboard summary (attach access token from signin response)
  ```
  curl -H "Authorization: Bearer <ACCESS_TOKEN>" \
    https://mentorhub-platformbackend.onrender.com/v1/transaction/summary
  ```

  # Create a transaction (admin only)
  ```
  curl -X POST https://mentorhub-platformbackend.onrender.com/v1/transaction \
    -H "Authorization: Bearer <ACCESS_TOKEN>" \
    -H "Content-Type: application/json" \
    -d '{"amount":1000,"type":"income","category":"Consulting","date":"2026-04-01","notes":"Demo"}'
  ```

  # Export CSV (admin only)
  ```
  curl -H "Authorization: Bearer <ACCESS_TOKEN>" \
    -o transactions.csv \
    https://mentorhub-platformbackend.onrender.com/v1/transaction/export
  ```

  5) Evaluation mapping (assignment → where implemented)
  ---------------------------------------------------
  - User & Role Management: `backend/controllers/auth.controller.js`, `backend/models/user.model.js`, `backend/scripts/seedAdmin.js`
  - Financial Records: `backend/models/transaction.model.js`, `routes/v1/transaction.route.js`, `services/transaction.service.js`
  - Summaries & Aggregation: `services/transaction.service.js` (`summary` aggregation)
  - Access Control: `middleware/auth.js` (`protect` + `restrictTo`) used in routes
  - Validation & Errors: `validations/*.js`, `helper/apiError.js`, `middleware/error.js`

  6) Demo checklist (5 minutes)
  -----------------------------
  1. Ensure `backend/.env` is configured locally (or use deployed demo).  
  2. Seed an admin: `cd backend && npm run seed-admin` (creates an admin from `.env` values).  
  3. Start backend and frontend: `npm run dev` (backend) and `npm start` (frontend).  
  4. Sign in with admin credentials and verify the Admin Dashboard shows totals and CSV export.  
  5. Run the curl examples above to exercise APIs.

3) Data models (high level)
---------------------------
- User
  - Fields: `email`, `passwordHash`, `name`, `role`, `isActive`, `createdAt`.

- Transaction
  - Fields: `amount: Number`, `type: String` (`income`|`expense`), `category: String`, `date: Date`, `notes: String`, `createdBy: ObjectId`, `isDeleted: Boolean`.

4) Access control matrix (summary)
----------------------------------
- Viewer: Read-only access to lists and summary endpoints.
- Analyst: Read access + aggregate endpoints; cannot create/modify/delete.
- Admin: Full access to manage users and transactions, export CSVs, and run debug endpoints.

5) Validation and errors
------------------------
- Joi schemas validate incoming payloads; controllers return HTTP 400 for validation errors and appropriate HTTP statuses for other failures.
- Common error wrapper `apiError` ensures consistent `{ message, statusCode, details? }` responses.

6) Persistence and deployment notes
---------------------------------
- DB: MongoDB (Atlas recommended). Use `DB_URL` env var.
- Secrets: All secrets are read from `backend/.env` in development; use provider env UI (Render/Heroku) in production. Do not commit secrets.
- Render specifics: backend should read `process.env.PORT`. Render usually provides the port automatically; you only need to set it explicitly if you require a fixed value.

7) How to run (concise)
-----------------------
- Backend dev
```
cd backend
npm install
cp .env.example .env   # fill values
npm run dev
```

- Frontend dev
```
cd frontend
npm install
# set REACT_APP_BASE_URL to https://<your-backend-host>/v1 when deployed
npm start
```

8) Tests & quality
------------------
- Tests are not yet provided in this repo; recommended: add Jest tests for `services/*` and controller-level integration tests.

9) Implemented optional enhancements
-----------------------------------
- JWT access + refresh token rotation with refresh tokens persisted in DB.
- CSV export for transactions (admin-only) and a frontend download flow.
- Soft-delete for transactions (`isDeleted`).

10) Assumptions & tradeoffs
--------------------------
- Single-tenant model: no account multi-tenancy implemented.
- Roles are simple strings on the `user` document for clarity.
- Aggregations favor clarity over extreme performance; consider precomputed metrics for large datasets.

11) Next recommended improvements
--------------------------------
- Add OpenAPI/Swagger documentation for automated API docs.
- Add unit & integration tests with CI (GitHub Actions).
- Add rate-limiting, helmet, and input sanitization for production.
- Consider paginated pre-aggregations or a reporting collection for large-scale analytics.

12) Where to find code
---------------------
- Backend main entry: `backend/index.js` (or `backend/app.js`).
- Auth: `backend/controllers/auth.controller.js`, `backend/services/token.service.js`, `backend/models/token.model.js`.
- Transactions: `backend/models/transaction.model.js`, `backend/services/transaction.service.js`, `backend/controllers/transaction.controller.js`.

If you want, I can:
- Add an OpenAPI YAML file describing the endpoints.
- Generate example curl requests for each endpoint.
- Expand the document with sample responses and a Postman collection.

---
End of documentation (created to match the assignment). If you'd like specific expansions (Swagger, Postman collection, or sample data), tell me which and I will add them.
