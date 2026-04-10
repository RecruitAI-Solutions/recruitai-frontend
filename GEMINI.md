# RecruitAI Frontend - Gemini Context (v2.0)

This document is the **foundational mandate** for all AI agents. It defines the project's architecture, strict coding standards, and newly implemented advanced features.

---

## 🏗️ Project Architecture & Features

### 1. Core Tech Stack
- **Framework:** React 19 + TypeScript + Vite 7 (SWC)
- **State Management:** Redux Toolkit (Global Auth) & TanStack React Query v5 (Server State)
- **Styling:** TailwindCSS v4 with Semantic Tokens (`index.css`)
- **API Client:** Axios with automated JWT refresh interceptor (`src/services/api/axiosInstance.ts`)

### 2. Feature-Based Modules (`src/features/`)
Each module (e.g., `auth`, `jobs`, `candidate`, `geocoding`) is self-contained:
- `types/`: Mandatory separation between Raw API (`Response`) and UI (`Model`) types.
- `services/`: Axios calls with mandatory transform functions.
- `hooks/`: TanStack Query hooks and complex UI logic (e.g., `useSkillInput`, `useLocationInput`).
- `components/`: Domain-specific UI (e.g., `JobCard`, `SkillInput`, `LocationInput`).
- `pages/`: Page-level components composed of feature components.

### 3. Key Advanced Features
- **Geocoding Integration:** Structured location search using `refId` (NOT raw text). Uses `LocationInput` with 300ms debounce.
- **Skill Selection:** Multi-skill autocomplete using `SkillInput` with standardized `Badge` UI.
- **Role-Based Access Control (RBAC):** Guarded routes for `candidate`, `recruiter`, and `admin`.

---

## 📜 Mandatory Engineering Standards

### 1. Separation of Concerns (THE "FLOW")
All data fetching **MUST** follow this sequence:
1.  **API Response:** Received in `services/`.
2.  **Transform Layer:** Normalizes fields, converts enums to labels, and formats dates/currencies.
3.  **React Query:** Caches the *transformed* object.
4.  **UI:** Consumes the clean `Job` or `User` model.

### 2. UI & Styling Rules
- **Semantic Tokens:** Use CSS variables (e.g., `text-primary`, `bg-surface`) defined in `index.css`. Avoid standard Tailwind colors (e.g., `text-blue-600`) for primary brand elements.
- **Layout Hierarchy:** `Page` → `Section` → `Container` → `Feature Components`.
- **Reusable Components:** Always check `src/shared/components/ui` (Button, Input, Badge, StatItem) before building new UI.
- **UX Standards:** 
    - Use `debounce` (300ms-500ms) for all search inputs.
    - Show `Loading Skeletons` during data fetching.
    - Implement clear `Empty States`.

### 3. Form Standards
- Use **React Hook Form** + **Yup** for validation.
- Complex inputs (Skills, Locations) **MUST** be integrated via `<Controller />`.
- Prefer the **Upsert Pattern**: Combine Create and Edit into a single page/component that toggles logic based on the presence of an `id`.

### 4. Enum & Mapping
- **NEVER** display raw enum numbers in the UI.
- Use `normalize[EnumName]` functions in the transform layer to map values to readable Vietnamese labels.

---

## 🛠️ Key Commands & Workflow

| Task | Command |
| :--- | :--- |
| Start Dev | `npm run dev` |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Test | (TODO: Implement Vitest) |

### Git Policy
- **DO NOT** commit `GEMINI.md` or `.gemini/` folder.
- **DO NOT** commit `.env` files.
- Propose clear, "why-focused" commit messages.

### Navigation
Always use the centralized `ROUTES` object from `@/config/routes.config.ts`. Hardcoded path strings are strictly forbidden.

---

🚀 **Final Objective:** Build a scalable, predictable frontend that separates raw data from presentation, ensuring 100% type safety and consistent UX across all roles.
