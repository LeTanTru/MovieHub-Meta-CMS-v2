# MovieHub CMS Meta

Admin CMS for managing MovieHub platform data and operations.  
Built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, and **TanStack Query**.

## Overview

This project is a web-based CMS focused on:

- Authentication and profile management
- Admin account management
- Customer and business management
- Group, permission, and group-permission management
- Server provider configuration
- Media/file upload integration

The app is integrated with backend APIs using centralized API and route configuration, with permission-aware navigation and guards.

## Tech Stack

- Next.js 16 (App Router, standalone output)
- React 19 + TypeScript
- Tailwind CSS 4
- TanStack Query
- React Hook Form + Zod
- Radix UI + custom reusable UI components
- Yarn (package manager)

## Project Structure

```text
src/
  app/                 # App Router pages (admin, customer, business, profile, auth)
  components/          # Shared UI and form components
  constants/           # API config, app constants, storage keys
  hooks/               # Reusable hooks for list/save/query logic
  queries/             # API query/mutation layers
  routes/              # Route definitions and permission metadata
  store/               # Zustand/global state
  utils/               # HTTP, text, and helper utilities
```

## Prerequisites

- Node.js 20+
- Yarn 1.x (lockfile-based workflow)

## Getting Started

1. Install dependencies:

```bash
yarn
```

2. Create your environment file:

```bash
cp .env.example .env
```

Windows PowerShell alternative:

```powershell
Copy-Item .env.example .env
```

3. Fill required environment variables in `.env` (see below).

4. Start development server:

```bash
yarn dev
```

App runs on: `http://localhost:3002`

## Environment Variables

Based on runtime schema in `src/config.ts`, configure:

```env
NEXT_PUBLIC_NODE_ENV=
NEXT_PUBLIC_API_ENDPOINT_URL=
NEXT_PUBLIC_TENANT_ID=        # optional
NEXT_PUBLIC_URL=
NEXT_PUBLIC_TINYMCE_URL=
NEXT_PUBLIC_API_MEDIA_URL=
NEXT_PUBLIC_GRANT_TYPE=
NEXT_PUBLIC_APP_USERNAME=
NEXT_PUBLIC_APP_PASSWORD=
NEXT_PUBLIC_GRANT_TYPE_REFRESH_TOKEN=
NEXT_PUBLIC_MEDIA_HOST=
NEXT_PUBLIC_CLIENT_TYPE=
```

> Note: `.env.example` may not include all required keys. Ensure all variables above are present.

## Available Scripts

- `yarn dev` — start local development server on port `3002`
- `yarn clean-dev` — clear `.next` then start dev server
- `yarn build` — production build
- `yarn start` — run production server on port `3002`
- `yarn lint` — run ESLint
- `yarn format` — format code with Prettier

## Docker

This repository includes a multi-stage `Dockerfile` that builds a standalone Next.js runtime image.

Build:

```bash
docker build -t moviehub-cms-meta .
```

Run:

```bash
docker run --rm -p 3002:3002 moviehub-cms-meta
```

## Notes

- The project uses permission codes in route/API config for access control behavior.
- `next.config.ts` enables `output: "standalone"` for optimized container deployments.
