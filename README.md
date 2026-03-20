<p align="center">
  <img src="frontend/public/Logo.svg" alt="LumenID Logo" width="80" />
</p>

<h1 align="center">LumenID</h1>

<p align="center">
  <strong>Decentralized Identity & Verifiable Credential Platform</strong>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 📖 Overview

LumenID is a full-stack, role-based decentralized identity management platform for **issuing**, **holding**, and **verifying** W3C-style Verifiable Credentials. Built with a React frontend and Node.js/Express backend, the platform implements a three‑party trust model:

| Role | Description |
|------|-------------|
| **Customer (Holder)** | Creates a profile, receives credentials into a personal vault, and selectively discloses them via time-bounded share links. |
| **Verifier / Issuer (Admin)** | Issues credentials to holders, reviews pending submissions, manages revocations, and resolves DID documents from the Issuer and Verifier portals. |
| **Relying Party** | Verifies credential authenticity through a public verification portal — no account required. |

The system is designed with **blockchain and IPFS hook-points** throughout the backend services, ready for on-chain integration (Ethers.js + Polygon Amoy, Pinata IPFS).

---

## ✨ Features

### Identity & Credentials
- **Verifiable Credential Lifecycle** — Issue, accept, reject, revoke, and verify credentials
- **DID Resolution** — W3C-conformant `did:lumen:*` document resolution endpoint
- **Selective Disclosure** — Time-bounded share tokens for privacy-preserving credential sharing
- **Public Verification Portal** — Anyone can verify a credential by ID or share-link token
- **Credential Vault** — Encrypted-style dashboard for holders to manage their credentials

### Authentication & Authorization
- **JWT-based Authentication** — Secure login with bcrypt password hashing
- **Role-based Access Control** — Protected routes enforced on both frontend and backend
- **Session Management** — Session storage with automatic expiry detection and `lumen_unauthorized` global events

### User Experience
- **Cosmic-themed UI** — Animated cosmic background with particle effects
- **3D Identity Card** — Interactive, perspective-tracking LumenCard3D component
- **Page Transitions** — Smooth Framer Motion route transitions
- **Responsive Design** — Mobile-first layouts with dedicated responsive styles
- **Dark Mode** — Theme provider with system-preference detection via `next-themes`
- **Toast Notifications** — Sonner-powered notification system

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite 7** | Build tool & dev server |
| **React Router 7** | Client-side routing |
| **Tailwind CSS 4** | Utility-first styling |
| **shadcn/ui + Radix UI** | Accessible component primitives |
| **Framer Motion** | Animations & page transitions |
| **Axios** | HTTP client with interceptors |
| **React Hook Form + Zod** | Form validation |
| **Lucide React** | Icon library |
| **Sonner** | Toast notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js + Express** | REST API server |
| **JSON Web Tokens (JWT)** | Stateless authentication |
| **bcryptjs** | Password hashing |
| **uuid** | Unique credential & token IDs |
| **dotenv** | Environment configuration |
| **CORS** | Cross-origin resource sharing |

### Planned Integrations
| Technology | Purpose |
|------------|---------|
| **Ethers.js** | Blockchain interaction (Polygon Amoy) |
| **Pinata / IPFS** | Decentralized credential storage |
| **Supabase** | Persistent database (placeholder ready) |

---

## 📁 Project Structure

```
LumenID/
├── backend/
│   ├── data/
│   │   └── mock-data.js            # In-memory mock users, credentials, DIDs
│   ├── middleware/
│   │   └── auth.middleware.js       # JWT verification & role guard
│   ├── routes/
│   │   ├── admin.routes.js          # Admin dashboard endpoints
│   │   ├── auth.routes.js           # Login / signup / session
│   │   ├── credential.routes.js     # Credential CRUD & verification
│   │   └── user.routes.js           # Profile & vault endpoints
│   ├── services/
│   │   ├── auth-service.js          # Registration, login, password logic
│   │   └── credential-service.js    # Issue, verify, revoke, share tokens
│   ├── utils/
│   │   └── response.js             # Standardized API response helpers
│   ├── .env.example                 # Environment variable template
│   ├── package.json
│   └── server.js                    # Express app entry point
│
├── frontend/
│   ├── public/                      # Static assets (Logo.svg, favicon)
│   ├── src/
│   │   ├── api/                     # Axios service layer
│   │   │   ├── apiClient.js         # Axios instance + interceptors
│   │   │   ├── adminService.js      # Admin API calls
│   │   │   ├── authService.js       # Auth API calls
│   │   │   ├── credentialService.js # Credential API calls
│   │   │   └── userService.js       # User/profile API calls
│   │   ├── components/
│   │   │   ├── admin/               # AdminDashboard, IssuerPortal, VerifierPortal
│   │   │   ├── auth/                # Login, Signup, RoleSelection, ForgotPassword
│   │   │   ├── customer/            # Dashboard, Profile, Vault, ProfileCreation
│   │   │   ├── icons/               # Custom LumenIcons SVG library
│   │   │   ├── issuer/              # NewIssuance, IdentityLogs, LegalStanding
│   │   │   ├── navigation/          # Role-specific nav bars (Admin, Customer, etc.)
│   │   │   ├── relying-party/       # PublicVerifyPortal, VerificationResult
│   │   │   ├── ui/                  # shadcn/ui component library (40+ primitives)
│   │   │   ├── vault/               # Credential vault panels & detail views
│   │   │   ├── CosmicBackground.jsx # Animated starfield background
│   │   │   ├── LandingPage.jsx      # Public landing page
│   │   │   ├── Layout.jsx           # Shared page layout shell
│   │   │   ├── LumenCard3D.jsx      # Interactive 3D identity card
│   │   │   ├── ProtectedRoute.jsx   # Role-based route guard
│   │   │   └── ...                  # Terms, Privacy, NotFound, AccessDenied
│   │   ├── constants/
│   │   │   └── routes.js            # Route path constants
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx      # Global auth state provider
│   │   ├── hooks/
│   │   │   ├── useAuthNavigation.js # Post-login redirect logic
│   │   │   └── useFormValidation.js # Reusable Zod validation hook
│   │   ├── lib/
│   │   │   ├── api-client.js        # Legacy API client
│   │   │   ├── api-endpoints.js     # Endpoint URL constants
│   │   │   ├── env.js               # Centralized env access
│   │   │   └── supabase-client.js   # Supabase placeholder (mock)
│   │   ├── services/
│   │   │   ├── auth-service.js      # Auth business logic
│   │   │   └── credential-service.js# Credential business logic
│   │   ├── styles/
│   │   │   ├── animations.js        # Framer Motion presets
│   │   │   ├── fonts.css            # Google Fonts imports
│   │   │   ├── index.css            # Global styles
│   │   │   ├── layout-geometry.css  # Spatial layout system
│   │   │   ├── responsive.css       # Breakpoint overrides
│   │   │   ├── tailwind.css         # Tailwind entry point
│   │   │   └── theme.css            # CSS custom properties
│   │   ├── App.jsx                  # App wrapper with providers
│   │   ├── main.jsx                 # React DOM entry
│   │   └── routes.jsx               # Route definitions
│   ├── .env                         # Frontend environment variables
│   ├── index.html                   # HTML entry with meta tags
│   ├── package.json
│   └── vite.config.js               # Vite configuration
│
├── .gitattributes
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or later
- **npm** (included with Node.js)

### 1. Clone the Repository

```bash
git clone https://github.com/Oumazshin/LumenID.git
cd LumenID
```

### 2. Start the Backend

```bash
cd backend
npm install
cp .env.example .env      # configure as needed
npm run dev                # starts on http://localhost:3001
```

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev                # starts on http://localhost:5173
```

### 4. Open in Browser

Navigate to **http://localhost:5173** — the frontend automatically proxies API requests to the backend.

### Build for Production

```bash
cd frontend
npm run build              # outputs to frontend/dist/
npm run preview            # preview the production build
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |
| `FRONTEND_URL` | `http://localhost:5173` | CORS allowed origin |
| `JWT_SECRET` | `lumenid_dev_secret_...` | JWT signing secret |
| `JWT_EXPIRES_IN` | `7d` | Token expiration |
| `NODE_ENV` | `development` | Environment mode |

<details>
<summary>🔮 Future Integration Variables</summary>

| Variable | Description |
|----------|-------------|
| `RPC_URL` | Polygon Amoy RPC endpoint |
| `REGISTRY_CONTRACT_ADDRESS` | On-chain DID registry address |
| `ISSUER_PRIVATE_KEY` | Issuer wallet private key |
| `PINATA_API_KEY` | IPFS (Pinata) API key |
| `PINATA_API_SECRET` | IPFS (Pinata) API secret |
</details>

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:3001/api` | Backend API base URL |

---

## 🔌 API Reference

All endpoints are prefixed with `/api`. Authenticated routes require the `Authorization: Bearer <token>` header.

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | ✗ | Create a new account |
| `POST` | `/login` | ✗ | Login and receive JWT |
| `POST` | `/logout` | ✓ | Invalidate session |
| `GET` | `/session` | ✓ | Validate current session |

### Users — `/api/users`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/me` | ✓ | Get current user profile |
| `PUT` | `/me` | ✓ | Update current user profile |

### Credentials — `/api/credentials`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | ✓ | Get user's credentials |
| `GET` | `/:id` | ✓ | Get credential by ID |
| `POST` | `/issue` | ✓ (Issuer) | Issue a new credential |
| `POST` | `/:id/accept` | ✓ (Holder) | Accept a pending credential |
| `POST` | `/:id/reject` | ✓ (Holder) | Reject a pending credential |
| `POST` | `/:id/revoke` | ✓ (Issuer) | Revoke an issued credential |
| `GET` | `/verify/:id` | ✗ | Verify a credential (public) |
| `POST` | `/share` | ✓ | Create a time-bounded share link |
| `GET` | `/shared/:token` | ✗ | Resolve a share token (public) |
| `GET` | `/search` | ✓ | Search credentials by filters |

### Admin — `/api/admin`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/stats` | ✓ (Admin) | Platform statistics |

### DID — `/api/did`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/:did` | ✗ | Resolve a DID document |

### Health

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/health` | ✗ | Service health check |

---

## 🔐 Authentication Flow

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Landing     │────▶│  Role        │────▶│  Login /     │
│  Page        │     │  Selection   │     │  Signup      │
└─────────────┘     └──────────────┘     └──────┬───────┘
                                                 │
                                           JWT issued
                                                 │
                              ┌───────────────────┼───────────────────┐
                              ▼                   ▼                   ▼
                    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
                    │  Customer    │    │  Admin       │    │  Issuer /    │
                    │  Dashboard   │    │  Dashboard   │    │  Verifier    │
                    │  + Vault     │    │              │    │  Portal      │
                    └──────────────┘    └──────────────┘    └──────────────┘
```

1. **Landing Page** → user selects their role (Customer or Verifier/Issuer)
2. **Login / Signup** → backend issues a JWT, stored in `sessionStorage`
3. **Protected Dashboard** → `<ProtectedRoute>` checks role before rendering
4. **Session Sync** → global `lumen_unauthorized` event auto-clears stale sessions

---

## 🎨 Design System

LumenID uses a custom cosmic-themed design system built on top of **Tailwind CSS 4** and **shadcn/ui**:

- **40+ UI Primitives** — Accordion, Dialog, Tabs, Table, Form, Select, and more
- **Custom Animations** — Page transitions, hover effects, and scroll-triggered reveals
- **Cosmic Background** — Animated starfield with parallax particles
- **3D Identity Card** — Mouse-tracking perspective transforms on the holder's card
- **Role-specific Navigation** — Dedicated nav components per user role
- **Responsive Breakpoints** — Mobile, tablet, and desktop layouts via `responsive.css`

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/my-feature`
3. **Install** dependencies in both `backend/` and `frontend/`
4. **Develop** with hot-reload: run `npm run dev` in both directories
5. **Lint** the frontend: `npm run lint`
6. **Commit** with a descriptive message
7. **Push** and open a **Pull Request**

---

## 📄 License

This project is open source. See [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with ❤️ using React, Express, Tailwind CSS, and shadcn/ui
</p>
