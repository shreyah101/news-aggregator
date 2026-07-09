# News Aggregator — Complete Project Context

---

## ✅ College Certification Requirements — Compliance Checklist

This project was built specifically to satisfy the following college full-stack certification requirements:

> **Project:** News Aggregator  
> **Required Tech Stack:** MongoDB, ReactJS, NodeJS, ExpressJS  
> **Domain:** News  
> **Learning Outcomes:** Understanding of CRUD operations, User Authentication

---

### ✅ Requirement 1: Aggregate news articles from various sources or categories
| What's Required | How It's Implemented | File |
|---|---|---|
| Aggregate news from various sources | Fetches live news from **NewsAPI** with automatic fallback to local JSON dataset | `server/controllers/newsController.js` |
| Filter by categories | `GET /api/news/category/:name` endpoint supports all major categories | `server/routes/newsRoutes.js` |
| Category navigation in UI | Navbar links and dedicated `CategoryFeed` page for every category | `client/src/pages/CategoryFeed.jsx` |

---

### ✅ Requirement 2: Allow users to filter, search, and personalize their news feed
| What's Required | How It's Implemented | File |
|---|---|---|
| **Filter** by category | Users click any category (Technology, Business, Sports, etc.) to see filtered news | `client/src/pages/CategoryFeed.jsx` |
| **Search** news | Navbar search bar triggers `GET /api/news/search?q=...` and shows results live | `client/src/pages/SearchFeed.jsx` |
| **Personalize** news feed | During registration AND profile editing, users select preferred categories saved to their MongoDB profile | `client/src/pages/Register.jsx`, `Profile.jsx` |
| Personalization stored | `preferredCategories` array saved per user in MongoDB | `server/models/User.js` |

---

### ✅ Requirement 3: MERN Tech Stack — All Four Technologies Used

#### M — MongoDB
- Cloud-hosted on **MongoDB Atlas** (Mumbai region, M0 Free Tier)
- Used to store **Users** and **Bookmarks** as collections
- Accessed via **Mongoose ODM** with defined schemas and relationships
- Evidence: `server/config/db.js`, `server/models/User.js`, `server/models/Bookmark.js`

#### E — Express.js
- Powers the entire **REST API backend**
- All 11 API routes defined using `express.Router()`
- Middleware stack: `cors`, `helmet`, `express.json()`, `express-validator`, custom `authMiddleware`
- Evidence: `server/server.js`, `server/routes/`, `server/middleware/`

#### R — React.js
- Powers the entire **frontend UI**
- Built with **functional components** and **React hooks** (`useState`, `useEffect`, `useContext`)
- **React Router DOM** for multi-page navigation (8 routes)
- **Context API** for global authentication state management
- Evidence: `client/src/App.jsx`, `client/src/pages/`, `client/src/components/`

#### N — Node.js
- The **runtime environment** that executes the Express.js server
- All backend code runs on Node.js (CommonJS module system)
- Deployed on **Render** as a Node.js web service
- Evidence: `server/server.js`, `server/package.json`

---

### ✅ Requirement 4: CRUD Operations Demonstrated
| Operation | Description | API Endpoint | File |
|---|---|---|---|
| **C**reate | Register a new user | `POST /api/auth/register` | `authController.js` |
| **C**reate | Save an article as a bookmark | `POST /api/bookmarks` | `bookmarkController.js` |
| **R**ead | Fetch latest news articles | `GET /api/news` | `newsController.js` |
| **R**ead | Fetch news by category | `GET /api/news/category/:name` | `newsController.js` |
| **R**ead | Search news by keyword | `GET /api/news/search?q=` | `newsController.js` |
| **R**ead | Fetch user's saved bookmarks | `GET /api/bookmarks` | `bookmarkController.js` |
| **R**ead | Fetch user profile | `GET /api/profile` | `userController.js` |
| **U**pdate | Update name, password, preferences | `PUT /api/profile` | `userController.js` |
| **D**elete | Remove a saved bookmark | `DELETE /api/bookmarks/:id` | `bookmarkController.js` |

---

### ✅ Requirement 5: User Authentication
| Auth Feature | Implementation | File |
|---|---|---|
| Password hashing | `bcryptjs` with 10 salt rounds — passwords are never stored in plain text | `authController.js` |
| JWT token issued on login/register | `generateToken(user._id)` signs a JWT valid for 30 days | `utils/generateToken.js` |
| JWT verification on protected routes | `authMiddleware.js` reads `Authorization: Bearer` header and verifies token | `middleware/authMiddleware.js` |
| Protected API routes | `/api/profile` and `/api/bookmarks` require a valid JWT | `routes/userRoutes.js`, `bookmarkRoutes.js` |
| Protected frontend routes | `ProtectedRoute.jsx` redirects unauthenticated users to `/login` | `components/ProtectedRoute.jsx` |
| Session persistence | `AuthContext.jsx` reads token from `localStorage` on page load and restores session | `context/AuthContext.jsx` |
| Input validation | `express-validator` validates all fields on register and login endpoints | `routes/authRoutes.js` |

---

## 1. Project Overview

**Name:** NewsAgg — News Aggregator  
**Type:** Full-Stack Web Application (College Certification Project)  
**Purpose:** A personalized news aggregator platform where users can browse top headlines, search for news, filter by categories, save bookmarks, and manage their profile with topic preferences.  
**Architecture:** MERN Stack (MongoDB, Express.js, React.js, Node.js)  
**Deployment:**
- Frontend → [Vercel](https://vercel.com/)
- Backend → [Render](https://render.com/)
- Database → [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud)

---

## 2. Tech Stack (Mandatory)

### Frontend
| Technology | Purpose |
|---|---|
| **React.js (Vite)** | UI framework using functional components and hooks |
| **React Router DOM** | Client-side routing and navigation |
| **Axios** | HTTP client for communicating with the backend API |
| **Tailwind CSS v3** | Utility-first CSS framework for styling |
| **Context API** | Global state management (auth state) |
| **Lucide React** | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web server framework |
| **Mongoose (ODM)** | MongoDB Object Document Mapper |
| **JWT (jsonwebtoken)** | JSON Web Token generation and verification |
| **bcryptjs** | Password hashing |
| **express-validator** | Request body input validation |
| **helmet** | Security headers middleware |
| **cors** | Cross-Origin Resource Sharing configuration |
| **dotenv** | Environment variable management |
| **axios** | HTTP client for fetching from NewsAPI |

### Database
| Technology | Purpose |
|---|---|
| **MongoDB Atlas** | Cloud-hosted NoSQL document database |
| **Mongoose** | Schema definition and querying |

### DevOps & Tools
| Technology | Purpose |
|---|---|
| **Git & GitHub** | Version control and repository hosting |
| **Vercel** | Frontend deployment platform |
| **Render** | Backend deployment platform |
| **.env files** | Environment-specific secret management |

---

## 3. Project Folder Structure

```
news_agg/
│
├── .gitignore                  # Root-level Git ignore (ignores node_modules, .env)
├── README.md                   # Project documentation
├── CONTEXT.md                  # This file — complete project context
│
├── client/                     # React Frontend (Vite)
│   ├── .env                    # Local environment variables (ignored by Git)
│   ├── .env.example            # Template for environment variables
│   ├── index.html              # Entry HTML file
│   ├── package.json            # Frontend dependencies
│   ├── tailwind.config.js      # Tailwind CSS v3 configuration
│   ├── postcss.config.js       # PostCSS configuration (required for Tailwind)
│   ├── vite.config.js          # Vite bundler configuration
│   └── src/
│       ├── main.jsx            # React DOM root renderer
│       ├── App.jsx             # Root component, router setup, AuthProvider wrapper
│       ├── index.css           # Global styles with Tailwind directives
│       │
│       ├── context/
│       │   └── AuthContext.jsx     # Auth state, login/register/logout functions
│       │
│       ├── services/
│       │   └── api.js              # Centralized Axios instance with JWT interceptor
│       │
│       ├── components/
│       │   ├── Navbar.jsx          # Responsive navbar with search, links, auth state
│       │   ├── Footer.jsx          # Simple site footer
│       │   ├── NewsCard.jsx        # Article display card (image, title, bookmark, read more)
│       │   ├── BookmarkButton.jsx  # Toggle bookmark button with API integration
│       │   ├── LoadingSpinner.jsx  # Animated loading indicator
│       │   └── ProtectedRoute.jsx  # Wraps protected pages, redirects if not logged in
│       │
│       └── pages/
│           ├── Home.jsx            # Homepage with top headlines grid
│           ├── Login.jsx           # Login form
│           ├── Register.jsx        # Registration form with category preference selection
│           ├── Profile.jsx         # User profile editor (name, password, interests)
│           ├── Bookmarks.jsx       # Grid of user's saved articles
│           ├── CategoryFeed.jsx    # Filtered news feed by category
│           ├── SearchFeed.jsx      # Search results page
│           └── NotFound.jsx        # 404 error page
│
└── server/                     # Express.js Backend (Node.js)
    ├── .env                    # Local secrets (ignored by Git)
    ├── .env.example            # Template for environment variables
    ├── .gitignore              # Server-level gitignore
    ├── server.js               # Entry point — sets up Express, middleware, routes
    │
    ├── config/
    │   └── db.js               # Mongoose connection to MongoDB Atlas
    │
    ├── models/
    │   ├── User.js             # User schema (name, email, password, preferredCategories)
    │   └── Bookmark.js         # Bookmark schema (user ref, article data, category)
    │
    ├── controllers/
    │   ├── authController.js       # Register, Login, GetMe logic
    │   ├── userController.js       # Get and Update user profile logic
    │   ├── newsController.js       # Fetch news from NewsAPI with local JSON fallback
    │   └── bookmarkController.js   # Get, Add, Remove bookmarks logic
    │
    ├── routes/
    │   ├── authRoutes.js           # POST /register, POST /login, GET /me
    │   ├── userRoutes.js           # GET /profile, PUT /profile
    │   ├── newsRoutes.js           # GET /news, GET /news/search, GET /news/category/:name
    │   └── bookmarkRoutes.js       # GET, POST /bookmarks, DELETE /bookmarks/:id
    │
    ├── middleware/
    │   ├── authMiddleware.js       # JWT verification; protects private routes
    │   └── errorMiddleware.js      # Centralized error handling for all routes
    │
    ├── utils/
    │   └── generateToken.js        # Generates a signed JWT from a user ID
    │
    └── data/
        └── sample_news.json        # Local JSON fallback dataset (6 sample articles)
```

---

## 4. Database Schemas (Mongoose)

### User Schema (`models/User.js`)
```
name              String  (required)
email             String  (required, unique, lowercase)
password          String  (required, hashed with bcrypt)
preferredCategories [String] (default: ['General'])
timestamps        createdAt, updatedAt (auto)
```

### Bookmark Schema (`models/Bookmark.js`)
```
user              ObjectId  (ref: 'User', required)
title             String    (required)
url               String    (required)
urlToImage        String
source            String
publishedAt       Date
description       String
category          String
timestamps        createdAt, updatedAt (auto)
```

**Relationship:** Each `Bookmark` document holds a reference to the `User` who saved it (`user` field). This is a one-to-many relationship (one user has many bookmarks).

---

## 5. REST API Endpoints

### Auth Routes (`/api/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive a JWT token |
| GET | `/api/auth/me` | Private (JWT) | Get currently logged-in user |

### User/Profile Routes (`/api/profile`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/profile` | Private (JWT) | Fetch user profile |
| PUT | `/api/profile` | Private (JWT) | Update name, password, or preferred categories |

### News Routes (`/api/news`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/news` | Public | Get top headlines |
| GET | `/api/news/search?q=term` | Public | Search news by keyword |
| GET | `/api/news/category/:name` | Public | Get news by category name |

### Bookmark Routes (`/api/bookmarks`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/bookmarks` | Private (JWT) | Get all bookmarks for logged-in user |
| POST | `/api/bookmarks` | Private (JWT) | Save an article as a bookmark |
| DELETE | `/api/bookmarks/:id` | Private (JWT) | Remove a bookmark by its ID |

---

## 6. Authentication Flow

1. **Registration:** User submits name, email, password (and optionally preferred categories) to `POST /api/auth/register`. The server validates input using `express-validator`, checks if the email already exists, hashes the password using `bcryptjs` (salt rounds: 10), saves the user to MongoDB, and returns a JWT token + user data.

2. **Login:** User submits email and password to `POST /api/auth/login`. The server finds the user by email, compares the submitted password against the stored hash using `bcrypt.compare()`. If they match, a JWT token is returned.

3. **Token Storage:** The JWT token is stored in `localStorage` on the client side.

4. **Axios Interceptor:** In `services/api.js`, a request interceptor runs before every API call. It reads the token from `localStorage` and automatically attaches it as an `Authorization: Bearer <token>` header.

5. **Protected Routes (Backend):** The `authMiddleware.js` reads the `Authorization` header, verifies the token using `jwt.verify()`, finds the user in the database, and attaches the user object to `req.user`. If the token is missing or invalid, a `401 Unauthorized` response is returned.

6. **Protected Routes (Frontend):** The `ProtectedRoute.jsx` component reads the auth state from `AuthContext`. If the user is not logged in, it redirects to `/login`. Otherwise, it renders the child component.

7. **Session Persistence:** On page load, `AuthContext.jsx` checks if a token exists in `localStorage`. If it does, it calls `GET /api/auth/me` to validate the token and restore the user's logged-in state.

---

## 7. News Data Flow (With Fallback)

The `newsController.js` implements a smart two-tier data strategy:

1. **Primary Source — NewsAPI:** If a valid `NEWS_API_KEY` is present in the environment variables, the controller makes an outbound HTTP request to `https://newsapi.org/v2/...` using Axios to fetch real-time, live news.

2. **Fallback Source — Local JSON:** If the `NEWS_API_KEY` is missing, set to the placeholder, or if the NewsAPI request fails for any reason, the controller catches the error and instead reads from `server/data/sample_news.json`. This ensures the application is **100% functional even without an API key**, which is critical for offline demos and college evaluations.

---

## 8. Frontend Architecture & State Management

- **Context API (`AuthContext`):** A single global context provides `user`, `loading`, `login()`, `register()`, and `logout()` to the entire component tree. This avoids prop-drilling.

- **Axios Instance (`services/api.js`):** Instead of importing Axios directly in each component, all API calls go through a single pre-configured instance with the base URL and auth interceptor already set up.

- **Component Design:** Functional components with hooks (`useState`, `useEffect`, `useContext`). No class components are used anywhere.

- **Routing:** React Router DOM v6 with `<Routes>` and `<Route>` components. Dynamic routes are used for `/category/:name` and `/search?q=`.

---

## 9. Security Measures

| Measure | Implementation |
|---|---|
| Password Hashing | `bcryptjs` with 10 salt rounds |
| Authentication | JWT with 30-day expiration |
| Route Protection | Custom `authMiddleware` on private API routes |
| Security Headers | `helmet` middleware on all responses |
| CORS Policy | Restricted to the specific `FRONTEND_URL` environment variable |
| Input Validation | `express-validator` on all auth endpoints |
| Secret Management | All secrets in `.env` files, never committed to Git |

---

## 10. CRUD Operations Demonstrated

| Operation | Where |
|---|---|
| **CREATE** | Register new user (`POST /api/auth/register`) |
| **CREATE** | Save a bookmark (`POST /api/bookmarks`) |
| **READ** | Fetch news articles (`GET /api/news`, `/category`, `/search`) |
| **READ** | Fetch user profile (`GET /api/profile`) |
| **READ** | Fetch saved bookmarks (`GET /api/bookmarks`) |
| **UPDATE** | Update user profile and preferences (`PUT /api/profile`) |
| **DELETE** | Remove a bookmark (`DELETE /api/bookmarks/:id`) |

---

## 11. Frontend Routes

| Route | Component | Protected? |
|---|---|---|
| `/` | `Home.jsx` | No |
| `/login` | `Login.jsx` | No |
| `/register` | `Register.jsx` | No |
| `/category/:name` | `CategoryFeed.jsx` | No |
| `/search` | `SearchFeed.jsx` | No |
| `/profile` | `Profile.jsx` | ✅ Yes |
| `/bookmarks` | `Bookmarks.jsx` | ✅ Yes |
| `*` (any other) | `NotFound.jsx` | No |

---

## 12. UI/UX Design Principles

- **Style:** Minimalistic, modern, clean — resembling a real news website, NOT a dashboard.
- **Color Palette:** White background (`#ffffff`), light gray accents (`gray-50`, `gray-100`), single primary accent color Blue (`primary-600` = `#2563eb`).
- **Typography:** System font stack via Tailwind's `font-sans`, anti-aliased.
- **Layout:** Responsive CSS grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) for news cards.
- **Cards:** Rounded corners (`rounded-xl`), subtle shadow (`shadow-sm`, `hover:shadow-md`), image on top.
- **Explicitly Avoided:** Glassmorphism, heavy gradients, animated backgrounds, complex transitions.

---

## 13. Environment Variables

### Server (`server/.env`)
```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=<your_random_secret_string>
NEWS_API_KEY=<your_newsapi_key>
FRONTEND_URL=<your_vercel_url>
NODE_ENV=development
```

### Client (`client/.env`)
```
VITE_API_URL=<your_render_backend_url>/api
```

> ⚠️ Both `.env` files are listed in `.gitignore` and are NEVER pushed to GitHub. Environment variables are configured directly on Render and Vercel dashboards for production.

---

## 14. Deployment Architecture

```
[User's Browser]
      |
      | HTTPS Request
      ▼
[Vercel — React Frontend]
      |
      | Axios HTTP calls to /api/...
      ▼
[Render — Express Backend]
      |
      | Mongoose queries
      ▼
[MongoDB Atlas — Cloud Database]
      |
      | (if NEWS_API_KEY present)
      ▼
[NewsAPI.org — External News Source]
```

- **Vercel** serves the static built React app globally via CDN.
- **Render** runs the Node.js/Express server as a Web Service.
- **MongoDB Atlas** hosts the database on the cloud (AWS Mumbai region, M0 Free Tier).
- **NewsAPI** is a third-party service providing real-time news articles.

---

## 15. Key Design Decisions

1. **Monorepo Structure:** Both `client/` and `server/` live in the same Git repository. Vercel and Render are each pointed to their respective subdirectory via the "Root Directory" setting.

2. **Local Fallback News Data:** The `sample_news.json` fallback ensures the project works in offline demos and evaluation environments where a live API key may not work or may have been rate-limited.

3. **Axios Interceptor Pattern:** Centralizing the JWT token injection in `services/api.js` means every API call is automatically authenticated without repeating any code.

4. **Context API over Redux:** For a project of this scope, Context API is sufficient and far easier to explain to a non-technical evaluator, avoiding the complexity of Redux boilerplate.

5. **Tailwind CSS v3:** Specifically downgraded from the newly released v4, which requires a different PostCSS plugin setup (`@tailwindcss/postcss`), to maintain compatibility with the standard `tailwind.config.js` and `postcss.config.js` setup.
