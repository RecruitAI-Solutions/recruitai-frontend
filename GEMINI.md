# RecruitAI Frontend - Gemini Context

This document provides essential context and instructions for AI agents working on the RecruitAI Frontend project.

## Project Overview

RecruitAI Frontend is a modern recruitment platform built with **React 19**, **TypeScript**, and **Vite**. It features an AI-powered matching system and role-based access control for Candidates, Recruiters, and Admins.

### Core Tech Stack

- **Framework:** React 19 + TypeScript + Vite 7 (SWC)
- **Styling:** TailwindCSS v4
- **State Management:**
  - **Global:** Redux Toolkit (Auth & User session)
  - **Server State:** TanStack React Query v5 (Data fetching & caching)
- **Routing:** React Router DOM v7 (Role-based guarding)
- **API Client:** Axios (with automated token refresh interceptors)
- **Forms:** React Hook Form + Yup (Schema-based validation)
- **Notifications:** react-hot-toast

## Project Structure

The project follows a modular, feature-based architecture:

- `src/app/`: Redux store configuration and typed hooks.
- `src/config/`: Centralized route paths (`routes.config.ts`) and API constants.
- `src/features/`: Domain-specific modules (e.g., `auth`, `jobs`, `candidate`). Each feature co-locates its components, hooks, services, and slices.
- `src/routes/`: Complex routing logic, including guards (`ProtectedRoute`, `RoleBasedRoute`) and role-specific configurations.
- `src/services/`: Cross-cutting services like the Axios instance and localStorage utilities.
- `src/shared/`: Reusable UI components (`src/shared/components/ui`) and Layouts.
- `src/pages/`: Top-level standalone pages (Home, 404, Unauthorized).

## Development Conventions

### Path Aliases

Always use the `@` alias for imports from the `src` directory (configured in `vite.config.ts` and `tsconfig.json`).

- Example: `import { Button } from "@/shared/components/ui/Button";`

### Authentication & Roles

The application supports three roles: `candidate`, `recruiter`, and `admin`.

- Role-based redirects are handled in `src/routes/utils/roleRedirect.ts`.
- Protected routes are managed via `ProtectedRoute` and `RoleBasedRoute` components.

### API Integration

- Use **Axios Instance** (`src/services/api/axiosInstance.ts`) for all HTTP requests to benefit from automatic token handling and interceptors.
- Use **TanStack React Query** hooks for data fetching to ensure consistent server state management.
- API endpoints are centralized in `src/config/endpoints/`.

### UI & Styling

- Follow the existing TailwindCSS v4 patterns.
- Prefer reusable components from `src/shared/components/ui`.
- All forms must use **React Hook Form** with **Yup** validation.

## Key Commands

| Action                | Command           |
| :-------------------- | :---------------- |
| **Start Development** | `npm run dev`     |
| **Build Project**     | `npm run build`   |
| **Lint Codebase**     | `npm run lint`    |
| **Preview Build**     | `npm run preview` |

## Authentication Flow (JWT)

1. Tokens (`access_token`, `refresh_token`) are stored in `localStorage`.
2. Axios request interceptor attaches the Bearer token automatically.
3. On `401 Unauthorized`, the response interceptor attempts a silent refresh.
4. If refresh fails, tokens are cleared and the user is redirected to `/login`.

## Navigation & Routes

Centralized route constants are located in `src/config/routes.config.ts`. Always use these constants instead of hardcoded strings for internal navigation.

## Additional Coding References

### Core Principles

1.1 Separation of Concerns (MANDATORY)
Do not mix API logic, data transformation, and UI in the same layer.
Follow this strict flow:
API (raw response)
→ Transform layer
→ React Query (data fetching)
→ UI components
1.2 Backend is the Source of Truth
Do not hardcode business logic (roles, permissions, enums) on the frontend.
Always rely on backend data.
The frontend is responsible only for rendering.
1.3 Normalize Data Before UI
All backend responses must be transformed before reaching UI.
UI must never consume raw API response directly.

### Transform Layer Rules

2.1 Always Use Transform Functions
Every API response must go through a transform function.

Example:

transformJob()
transformJobListItem()
2.2 Responsibilities of Transform Layer
Normalize inconsistent fields (e.g., cvId → id)
Convert enums to readable labels
Format data (dates, numbers, sizes)
Ensure consistent data shape for UI

### UI Architecture Rules

3.1 Layout System
Use Container for width control
Use Section for vertical spacing
3.2 Component Hierarchy
Page
→ Section
→ Container
→ Feature Components
3.3 Reusable Components (MANDATORY)
Build reusable components instead of duplicating code

Examples:

JobCard
JobList
JobSearch
StatusBadge

### Enum & Mapping Rules

4.1 Do Not Use Raw Enum Values in UI
UI must not display raw enum values (numbers or codes)
10.2 Always Map Enum to Label

Example:

1 → "Full-time"
2 → "Part-time"
10.3 Use Normalize Functions
normalizeEmploymentType(value)
normalizeExperienceLevel(value)
All enum conversion logic must be centralized
Avoid hardcoding labels in components

### UX Rules

51 Loading State
Always show loading skeletons when fetching data
52 Empty State
Show clear message when no data is available

Example:

"No jobs found"
"No CV uploaded"
5.3 Disabled State
Disable buttons and actions during loading or processing
Prevent duplicate actions
13.4 Smooth Interaction
Use debounce for search inputs (e.g., 300ms)
Avoid excessive API calls

### Error Handling

Never let the UI crash
Always handle API errors gracefully
Show clear and user-friendly error messages
Provide fallback UI when data is unavailable
6.1 Goal

The frontend system must be:

Scalable
Maintainable
Predictable
Reusable
🚀 Final Objective

Build a frontend architecture that:

Separates concerns clearly
Works seamlessly with backend APIs
Supports role-based and permission-based UI
Is ready for AI-driven features (e.g., CV parsing, job matching)
Can scale for future features without major refactoring
