# Mobile Hub

> **Mobile Hub** — A modern e-commerce web application to buy smartphones and mobile accessories. Built with Next.js, TypeScript, Tailwind CSS, NextAuth, MongoDB, and essential utilities such as `bcryptjs`, `sweetalert2`, and `react-hot-toast`.

> Link to the [live demo](https://mobile-hub-ecru.vercel.app/)

------

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech stack & Packages](#tech-stack--packages)
- [Repository structure](#repository-structure)
- [Installation & Setup](#installation--setup)
  - [Environment variables](#environment-variables)
  - [Scripts](#scripts)
- [Key configuration snippets](#key-configuration-snippets)
  - [TypeScript](#typescript)
  - [Tailwind CSS](#tailwind-css)
  - [MongoDB connection helper](#mongodb-connection-helper)
  - [NextAuth (example)](#nextauth-example)
  - [Using bcryptjs for password hashing](#using-bcryptjs-for-password-hashing)
  - [Showing notifications with react-hot-toast](#showing-notifications-with-react-hot-toast)
  - [Using SweetAlert2 for confirmations](#using-sweetalert2-for-confirmations)
- [Development notes & best practices](#development-notes--best-practices)
- [Deployment](#deployment)
- [License](#license)

---

## About

**Mobile Hub** is a sample mobile-phone storefront intended as a starter template for developers. The repository demonstrates an idiomatic setup for a production-capable Next.js + TypeScript application with authentication (NextAuth) and a MongoDB backend. It includes common developer conveniences like Tailwind CSS for design, `react-hot-toast` for transient notifications, and `sweetalert2` for friendly modal confirmations.

## Features

- User sign-up / sign-in (NextAuth)
- Password hashing (bcryptjs)
- Product listing, product details, shopping cart basic flow (examples)
- Admin area to CRUD products (protected routes)
- Client-side notifications (react-hot-toast)
- Confirmation dialogs for destructive actions (SweetAlert2)
- Responsive UI with Tailwind CSS
- TypeScript-ready codebase

## Tech stack & Packages

This project uses the following notable dependencies (recommended versions shown as example — update as needed):

- `next` — React framework for production (e.g. `14.x` or `15.x`)
- `react` / `react-dom` — peer dependencies of Next.js
- `typescript` — static typing for JS
- `tailwindcss` — utility-first CSS framework
- `next-auth` — authentication for Next.js
- `mongodb` — official MongoDB driver
- `bcryptjs` — password hashing on server side
- `react-hot-toast` — lightweight toast notifications
- `sweetalert2` — nicer alert/confirmation modals

### Example `package.json` `dependencies` excerpt

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next-auth": "^5.0.0",
    "mongodb": "^5.10.0",
    "bcryptjs": "^2.4.3",
    "react-hot-toast": "^2.4.0",
    "sweetalert2": "^11.7.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24"
  }
}


/mobile-hub
├─ .next
├─ node_modules
├─ public
│  ├─ images
│  └─ favicon.ico
├─ src
│  ├─ app
│  │  ├─ layout.tsx
│  │  ├─ globals.css
│  │  ├─ page.tsx            # Home / Landing
│  │  ├─ products
│  │  │  ├─ page.tsx         # Product listing
│  │  │  └─ [id]
│  │  │     └─ page.tsx      # Product detail
│  │  ├─ auth
│  │  │  └─ sign-in.tsx
│  │  └─ dashboard
│  │     └─ page.tsx         # protected admin area
│  ├─ components
│  │  ├─ Header.tsx
│  │  ├─ Footer.tsx
│  │  ├─ ProductCard.tsx
│  │  └─ CartWidget.tsx
│  ├─ lib
│  │  ├─ mongodb.ts         # Mongo connection helper
│  │  └─ auth.ts            # NextAuth options
│  ├─ hooks
│  │  └─ useCart.ts
│  ├─ pages (if using pages router)
│  ├─ styles
│  │  └─ tailwind.css
│  ├─ types
│  │  └─ index.d.ts
│  └─ utils
│     ├─ bcrypt.ts          # wrapper for bcrypt usage
│     └─ validators.ts
├─ .env.example
├─ next.config.js
├─ tailwind.config.cjs
├─ postcss.config.cjs
├─ tsconfig.json
├─ package.json
└─ README.md
