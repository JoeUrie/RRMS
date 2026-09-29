# RRMS Product & Cart Viewer

A React + TypeScript application built for the RRMS SE Engineer Development Task. Consumes
the [JSONing mock API](https://jsoning.com/api/) to browse products and carts.

**Live demo:** (https://rrms-one.vercel.app/)
**Design decisions write-up:** see `RRMS-Project-Scope-and-Design-Decisions.md` in this repo for the full rationale behind every technology and architecture choice made in this project.

## Tech Stack

- React 20 + TypeScript, scaffolded with Vite
- Tailwind CSS v4
- React Router (data router API) for `/`, `/products`, `/carts`
- TanStack Query for data fetching/caching
- React Hook Form + Zod for the Add Product form validation
- Headless UI for accessible modals

## Getting Started

```bash
npm install
cp .env.example .env   # then edit VITE_API_BASE_URL if needed
npm run dev
```

The app expects an environment variable:

```
VITE_API_BASE_URL=https://api.jsoning.com/mock/public
```

Point this at your locally running instance of the API (e.g. `http://localhost:3000`) if
you'd prefer to develop against a local copy instead of the public mock endpoint.

## Build & Preview Production Locally

```bash
npm run build
npm run preview
```

## Deployment

This project is deployed on Vercel. `vercel.json` contains a rewrite rule required for
client-side routing (React Router) to work correctly on direct links and page refreshes —
without it, routes like `/products` and `/carts` would 404 on a static host.

Environment variables are configured directly in the Vercel dashboard
(Project → Settings → Environment Variables) rather than committed to the repo.

## Notable Design Decisions (short version)

- **Client-side data joining for carts**: the API does not support relation-embedding, so
  carts (`userId`, `items[].productId`) are joined against `/users` and `/products` in
  `useEnrichedCarts.ts`, with IDs normalized to strings to handle a string/number ID
  mismatch observed in the live API.
- **Graceful degradation**: carts with a missing or `null` `userId` render a "Guest /
  user data unavailable" state instead of crashing.
- **No backend persistence for Add Product**: per the task spec, the form demonstrates
  client-side validation only; no POST request is made on submit.

Full rationale for every decision — including why each library was chosen — is in
`RRMS-Project-Scope-and-Design-Decisions.md`.
