# RecruitAI — Frontend

> AI-powered recruitment platform frontend built with **React 19 + TypeScript + Vite**.
> Connects to the [RecruitAI Backend](../recruitai-api) (.NET Core Web API).

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Authentication & Roles](#authentication--roles)
- [Available Routes](#available-routes)
- [Key Features](#key-features)
- [Scripts](#scripts)

---

## Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 (SWC) |
| Styling | TailwindCSS v4 |
| Global State | Redux Toolkit + React Redux |
| Server State | TanStack React Query v5 |
| HTTP Client | Axios (with interceptors) |
| Routing | React Router DOM v7 |
| Forms | React Hook Form + Yup |
| Notifications | react-hot-toast |

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** >= 18.x
- **npm** >= 9.x (or pnpm / yarn)
- The **RecruitAI backend** running at `http://localhost:5000`

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd recruitai-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file at the project root (see [Environment Variables](#environment-variables)):

```bash
cp .env.example .env
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

> The Vite dev server proxies all `/api` requests to `http://localhost:5000` automatically — no CORS issues in development.

---

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the RecruitAI backend API | `http://localhost:5000` |

---

## Project Structure

```
src/
├── app/                        # Redux store & typed hooks
│   ├── store.ts                # configureStore (auth reducer)
│   └── hooks.ts                # useAppDispatch, useAppSelector
│
├── config/                     # App-wide constants
│   ├── routes.config.ts        # Centralized ROUTES object (all path strings)
│   └── api.config.ts           # API base URL, endpoint constants
│
├── features/                   # Domain feature modules (co-located)
│   └── auth/
│       ├── components/         # LoginForm, RegisterForm, OAuthButtons,
│       │                       # LogoutButton, ForgotPasswordForm,
│       │                       # ResetPasswordForm, VerifyEmailForm,
│       │                       # ChangePasswordForm
│       ├── hooks/              # useLogin, useRegister, useLogout,
│       │                       # useForgotPassword, useResetPassword,
│       │                       # useVerifyEmail, useChangePassword
│       ├── pages/              # LoginPage, RegisterPage, OAuthCallbackPage,
│       │                       # ForgotPasswordPage, ResetPasswordPage,
│       │                       # VerifyEmailPage
│       ├── services/           # authApi.ts — Axios calls + response transforms
│       ├── slices/             # authSlice.ts — Redux state
│       └── types/              # auth.types.ts — all TypeScript types & enums
│
├── routes/                     # Routing architecture
│   ├── configs/                # Per-role route config files
│   │   ├── index.tsx           # createRouteConfig() — composes all routes
│   │   ├── publicRoutes.config.tsx
│   │   ├── CandidateRoutes.config.tsx
│   │   ├── RecruiterRoutes.config.tsx
│   │   ├── AdminRoutes.config.tsx
│   │   └── ErrorRoutes.config.tsx
│   ├── utils/
│   │   └── roleRedirect.ts     # redirectByRole(), isPublicRoute()
│   ├── AppRoutes.tsx           # Root router (reads Redux auth state)
│   ├── ProtectedRoute.tsx      # Guard: requires authentication
│   ├── PublicRoute.tsx         # Guard: redirects if already logged in
│   └── RoleBasedRoute.tsx      # Guard: restricts by role
│
├── services/                   # Cross-feature services
│   ├── api/
│   │   ├── axiosInstance.ts    # Axios instance + request/response interceptors
│   │   └── QueryClient.ts      # TanStack Query client configuration
│   └── storage/
│       └── localStorage.ts     # Token get/set/clear utilities
│
├── shared/                     # Reusable across all features
│   ├── layouts/
│   │   ├── Sidebar.tsx         # Reusable sidebar (accepts navItems prop)
│   │   ├── Topbar.tsx          # Sticky top bar with mobile hamburger
│   │   ├── CandidateLayout.tsx # Layout wrapper for candidate pages
│   │   ├── RecruiterLayout.tsx # Layout wrapper for recruiter pages
│   │   └── AdminLayout.tsx     # Layout wrapper for admin pages
│   └── components/ui/
│       ├── Input.tsx           # Reusable input (forwardRef + RHF compatible)
│       └── Button.tsx          # Reusable button (variants + loading state)
│
└── pages/                      # Top-level standalone pages
    ├── HomePage.tsx
    ├── NotFoundPage.tsx         # 404
    └── UnauthorizedPage.tsx     # 403
```

---

## Authentication & Roles

The system supports **three user roles**, each with a separate dashboard and navigation:

| Role | Color Theme | Dashboard Route |
|---|---|---|
| `candidate` | Blue | `/candidate/dashboard` |
| `recruiter` | Emerald | `/recruiter/dashboard` |
| `admin` | Violet | `/admin/dashboard` |

### Login Methods

- **Email + Password** — standard credential-based login
- **Google OAuth** — redirects to backend OAuth endpoint, returns JWT via callback
- **GitHub OAuth** — same flow as Google

### Token Storage

- `access_token` and `refresh_token` are stored in **localStorage**
- Access token is attached to every request via Axios request interceptor
- On `401` response, the interceptor automatically calls `POST /auth/refresh-token`, updates the stored access token, and retries the original request
- If the refresh fails, tokens are cleared and the user is redirected to `/login`

### Route Guards

| Component | Behavior |
|---|---|
| `PublicRoute` | Accessible only when **not** authenticated. Authenticated users are redirected to their role dashboard. Wraps: `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email` |
| `ProtectedRoute` | Requires authentication. Unauthenticated users are redirected to `/login` with `location.state.from` preserved. |
| `RoleBasedRoute` | Requires a specific role. Wrong-role users are redirected to `/401`. |

---

## Available Routes

### Public Routes

| Path | Page | Description |
|---|---|---|
| `/` | HomePage | Landing page with login/register links |
| `/login` | LoginPage | Email/password + OAuth login |
| `/register` | RegisterPage | Account registration (candidate or recruiter) |
| `/forgot-password` | ForgotPasswordPage | Request password reset email |
| `/reset-password` | ResetPasswordPage | Set new password via email link (`?email=&token=`) |
| `/verify-email` | VerifyEmailPage | Auto-verifies on load via URL params (`?email=&token=`) |
| `/auth/callback` | OAuthCallbackPage | OAuth redirect handler (parses JWT from query params) |

### Candidate Routes (requires `candidate` role)

| Path | Page |
|---|---|
| `/candidate/dashboard` | Candidate Dashboard |
| `/candidate/jobs` | Job listing |
| `/candidate/jobs/:id` | Job detail |
| `/candidate/cv` | CV management (upload + history) |
| `/candidate/application` | My applications |
| `/candidate/application/:id` | Application detail + AI result |

### Recruiter Routes (requires `recruiter` role)

| Path | Page |
|---|---|
| `/recruiter/dashboard` | Recruiter Dashboard |
| `/recruiter/jobs` | My job postings |
| `/recruiter/jobs/create` | Create new job |
| `/recruiter/jobs/:id/edit` | Edit job |
| `/recruiter/jobs/:id` | Job detail |
| `/recruiter/jobs/:jobId/applicants` | Applicant list for a job |
| `/recruiter/jobs/:jobId/applicants/:applicantId` | Applicant detail + AI score |

### Admin Routes (requires `admin` role)

| Path | Page |
|---|---|
| `/admin/dashboard` | Admin Dashboard |
| `/admin/users` | User management (ban / activate) |
| `/admin/categories` | Skill master data (CRUD) |
| `/admin/analytics` | System statistics |

### Error Routes

| Path | Page |
|---|---|
| `/401` | Unauthorized (wrong role) |
| `/404` | Not Found |
| `*` | Catch-all → Not Found |

---

## Key Features

### Automatic Token Refresh
When any API call returns `401 Unauthorized`, the Axios response interceptor silently refreshes the access token using the stored refresh token and retries the failed request — no user interaction required.

### Role-Based Redirect After Login
After a successful login (credential or OAuth), the app reads the user's role from the JWT and redirects automatically to the correct dashboard using `redirectByRole()`.

### OAuth Callback Handling
`OAuthCallbackPage` decodes the JWT payload directly in the browser (`atob(token.split(".")[1])`) to extract user info and dispatch `setCredentials`, making the OAuth flow identical to the credential flow from Redux's perspective.

### Form Validation
All forms use **React Hook Form** + **Yup** schema validation. Schemas are TypeScript-inferred (`yup.InferType<>`), and field errors are displayed inline. All inputs are disabled during pending mutations to prevent double-submission.

### Persistent Auth State
On page refresh, `authSlice` initializes `isAuthenticated` from the presence of a stored `access_token` in localStorage, keeping the user logged in across sessions without an extra API call on mount.

---

## Scripts

```bash
# Start development server (http://localhost:5173)
npm run dev

# Type-check + build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

---

## Backend Connection

This frontend expects the RecruitAI backend running at `http://localhost:5000`.

Key API endpoints consumed:

| Endpoint | Used by |
|---|---|
| `POST /auth/login` | `useLogin` |
| `POST /auth/register` | `useRegister` |
| `POST /auth/logout` | `useLogout` |
| `POST /auth/refresh-token` | Axios interceptor (auto) |
| `GET /auth/me` | User hydration |
| `POST /auth/forgot-password` | `useForgotPassword` |
| `POST /auth/reset-password` | `useResetPassword` |
| `POST /auth/verify-email` | `useVerifyEmail` |
| `POST /auth/change-password` | `useChangePassword` |
| `GET /auth/external-login/:provider` | OAuth redirect |

---

*RecruitAI Frontend — built with ❤️ using React + TypeScript*
