# RecruitAI Frontend

An AI-powered recruitment platform built with **React 19**, **TypeScript**, and **Vite**. This frontend connects to a .NET Core API and features role-based access control, AI-assisted job matching, and a modular, scalable architecture.

---

## 🚀 Tech Stack

- **Core:** [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/), [Vite 7 (SWC)](https://vitejs.dev/)
- **State Management:**
  - **Global:** [Redux Toolkit](https://redux-toolkit.js.org/) (Auth & User session)
  - **Server State:** [TanStack React Query v5](https://tanstack.com/query/latest) (Data fetching & caching)
- **Styling:** [TailwindCSS v4](https://tailwindcss.com/)
- **Routing:** [React Router DOM v7](https://reactrouter.com/en/main)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup)
- **Utilities:** [Axios](https://axios-http.com/) (API client), [Lucide React](https://lucide.dev/) (Icons), [React Hot Toast](https://react-hot-toast.com/) (Notifications)

---

## 📂 Architecture & Project Structure

The project follows a **feature-based architecture**, where domain logic, components, and services are co-located for better maintainability and scalability.

```
src/
├── app/                  # Redux store configuration and custom hooks
├── config/               # App-wide constants (routes, API endpoints)
├── features/             # Domain-specific modules (auth, jobs, candidate)
│   └── [feature]/        # Each feature contains components, hooks, pages, services, types
├── routes/               # Routing logic, guards (Protected/Role-based), and configurations
├── services/             # Core services (Axios instance, local storage, Query Client)
├── shared/               # Reusable UI components, layouts, and utilities
│   ├── components/ui/    # Atomic UI components (Button, Input, Badge, etc.)
│   └── layouts/          # Layout wrappers (Public, Candidate, Dashboard)
└── pages/                # Top-level standalone pages (Home, 404, Unauthorized)
```

### Key Design Patterns

1.  **Separation of Concerns:** API logic is isolated in `services/`, business logic in custom `hooks/`, and UI in `components/`.
2.  **Data Transform Layer:** Raw API responses are normalized and transformed in the `services/` layer before reaching the UI components, ensuring a consistent data model.
3.  **Role-Based Access Control (RBAC):** Routes are dynamically generated based on the authenticated user's role (`candidate`, `recruiter`, `admin`).
4.  **Automatic Token Refresh:** A response interceptor in the Axios instance silently refreshes JWT access tokens to provide a seamless user experience.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0 or higher)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/recruitai-frontend.git
    cd recruitai-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    Create a `.env` file in the root directory and add:
    ```env
    VITE_API_BASE_URL=http://localhost:5000/api
    ```

### Running Locally

```bash
# Start the development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🛡️ Authentication & Security

- **JWT Authentication:** Secure storage of access and refresh tokens in `localStorage`.
- **Route Guards:**
  - `PublicRoute`: Prevents authenticated users from accessing login/register pages.
  - `ProtectedRoute`: Ensures users are authenticated before accessing private areas.
  - `RoleBasedRoute`: Restricts access to specific features based on the user's role.

---

## 🎨 UI & Styling

- **Tailwind v4:** Modern, utility-first styling with a custom design system.
- **Atomic UI:** A library of reusable components found in `src/shared/components/ui`.
- **Layout System:** Centralized layouts (`CandidateLayout`, `DashboardLayout`) for consistent navigation and structure across different user roles.

---

*Built with ❤️ for the RecruitAI ecosystem.*
