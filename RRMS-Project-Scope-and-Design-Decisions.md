# RRMS SE Engineer Development Task — Project Scope & Design Decisions

## 1. Task Requirements Summary

- Consume the JSONing API (products, product detail, carts, users).
- Framework: React (chosen from Angular/Vue/Next.js options).
- Home page with two buttons: "Products" and "Carts".
- **Products**: list view (table or cards) showing Name, Price, Category, Stock. Clicking a
  row/card shows full detail (adds Description, Rating, Image URL, SKU). Detail view must be
  dismissible/collapsible. An "Add" button opens a form with all fields mandatory; on save,
  show a success message and close the form. No backend persistence is required — this step
  exists purely to demonstrate form validation.
- **Carts**: list view showing User first/last name, Date, Status, item count. Clicking a
  row/card shows full detail: user email, city/state/zip, phone, and the products in the cart
  (name, description, quantity).
- Tailwind CSS is a stated "plus."
- Deliverable: public GitHub repo + hosted on a free service.

## 2. API Analysis (from live inspection of the public endpoint)

Base URL used for verification: `https://api.jsoning.com/mock/public`

**`GET /products`**
```json
{
  "id": "1", "name": "Wireless Mouse", "description": "...",
  "price": 29.99, "category": "Peripherals", "stock": 150,
  "sku": "WMOUSE-001", "image_url": "https://example.com/images/wirelessmouse.jpg",
  "rating": { "rate": 4.5, "count": 200 }
}
```
Maps 1:1 onto every field the spec requires for both the list and detail views.

**`GET /users`**
```json
{
  "id": "1", "firstname": "John", "lastname": "Doe",
  "email": "john.doe@example.com", "username": "johndoe",
  "address": "123 Maple Street", "city": "Springfield", "state": "IL",
  "zipcode": "62704", "country": "USA", "phone": "555-1234"
}
```

**`GET /carts`**
```json
{
  "id": "1", "userId": 5,
  "items": [ { "productId": 2, "quantity": 1 } ],
  "date": "2024-08-09T14:32:00Z", "status": "Pending"
}
```

The mock service (`jsoning-api`) supports basic CRUD (GET/POST/PUT/PATCH/DELETE) and simple
`?page`/`?limit` pagination, but **no relation-embedding/expand support**.

### Key gaps this reveals and how they shape the design

1. **No embedded relations.** Carts only contain `userId`/`productId`, never the related
   user/product objects, even though the spec's cart-detail view requires user name/email/
   address and product name/description. *Design decision:* fetch `products` and `users` once
   and join them client-side into the cart data via `Map<id, entity>` lookups, rather than
   issuing N+1 requests per cart row.
2. **ID type mismatch.** `user.id` is returned as a **string**, `cart.userId` as a **number**.
   A naive `===` comparison during the join will silently fail. *Design decision:* normalize
   all IDs to strings at the data-access boundary before any lookup/join.
3. **Referential integrity is not guaranteed.** Sample data includes a cart with
   `userId: null` (abandoned cart) and other carts referencing `userId` values that don't
   exist in the sampled user set. *Design decision:* the cart detail view must render a
   graceful fallback ("Guest / user data unavailable") instead of crashing or leaving blank
   fields when a lookup misses.
4. **`image_url` values don't resolve to real images** (confirmed explicitly in the task
   PDF). *Design decision:* attach an `onError` handler to product images that swaps in a
   placeholder box/icon rather than showing a broken-image glyph.

## 3. Technology Stack & Rationale

| Area | Choice | Why |
|---|---|---|
| Build tool | Vite | CRA is deprecated; Vite gives fast HMR and is the current community default for React SPAs. |
| Language | TypeScript | The API has a small, stable, well-defined shape (Product/User/Cart) — modeling it as interfaces catches join/typo bugs at compile time. |
| Styling | Tailwind CSS | Explicitly called out as a "plus" in the spec; utility classes make the responsive table→card collapse cheap to implement. |
| Routing | React Router | Spec allows SPA-state-toggle or real routes; real routes (`/`, `/products`, `/carts`) give shareable URLs and back-button support for near-zero extra cost. |
| Data fetching/caching | TanStack Query (React Query) | Provides loading/error/success state and caching without hand-rolled `useEffect`/`useState` boilerplate across four resources. A lightweight custom `useFetch` hook is an acceptable simpler fallback. |
| Forms/validation | React Hook Form + Zod | Spec requires all Add-Product fields to be mandatory; a single Zod schema drives both the TypeScript type and the runtime validation messages. |
| Modals/dialogs | Headless UI (Tailwind ecosystem) | Product/cart detail and Add Product are naturally modal; gives focus-trap, Esc-to-close, and ARIA wiring for free. |
| Global state | None (no Redux/Zustand) | All shared data is server state, handled by React Query; only small local UI state (expanded row, form open) remains. Avoiding a store here is a deliberate choice, not an omission. |
| Hosting | Vercel (or Netlify) | Zero-config for Vite/React, free tier, auto-deploy from the public GitHub repo. |

## 4. Application Architecture

```
src/
  api/
    client.ts            # fetch wrapper, base URL from VITE_API_BASE_URL
    products.ts           # getProducts(), getProduct(id)
    users.ts              # getUsers()
    carts.ts              # getCarts()
  types/
    product.ts, user.ts, cart.ts
  hooks/
    useProducts.ts, useCarts.ts, useUsers.ts   # React Query wrappers
    useEnrichedCarts.ts   # joins carts + users + products, string-normalized IDs
  pages/
    Home.tsx
    Products.tsx
    Carts.tsx
  components/
    products/ ProductTable.tsx, ProductCard.tsx, ProductDetailModal.tsx, AddProductForm.tsx
    carts/    CartTable.tsx, CartCard.tsx, CartDetailModal.tsx
    ui/       Button.tsx, Modal.tsx, Spinner.tsx, ErrorState.tsx, EmptyState.tsx, Badge.tsx
  App.tsx                # route table
  main.tsx
```

### Routing plan
`/` (Home with two buttons) → `/products` and `/carts`. Row/card clicks open a modal over the
current list route (rather than navigating to a detail URL) — this matches the spec's
"dismiss/collapse the detail view" language more literally while still giving real routes for
the two top-level sections.

### Responsive layout decision
Render a `<table>` at `md:` and above, and a stacked card layout below `md`, driven by
Tailwind responsive classes over the same dataset — satisfies "table or card view" while also
covering mobile use without maintaining two separate components.

## 5. Add Product Form — Field Design

| Field | Type | Validation |
|---|---|---|
| Name | text | required, non-empty |
| Price | number | required, > 0 |
| Category | text or select (seeded from existing categories) | required |
| Description | textarea | required, non-empty |
| Number in-stock | integer | required, ≥ 0 |
| Rating — rate | number | required, 0–5 |
| Rating — count | integer | required, ≥ 0 |
| Image URL | text | required, well-formed URL |
| SKU | text | required, non-empty |

On submit: validate all fields via the Zod schema → display a success banner/toast
("Product added successfully") → close the modal. No POST is fired against the mock API,
since the spec states explicitly this step exists to demonstrate validation, not persistence.

## 6. Cross-Cutting UX Concerns

- **Loading states:** spinner or skeleton rows while React Query resolves each resource.
- **Error states:** a reusable `ErrorState` component if a fetch fails (relevant since the
  base URL is swappable between local API and the public mock).
- **Empty states:** explicit "No products found" / "No carts found" messaging.
- **Accessibility:** semantic HTML, ARIA labels on modals, Esc-to-dismiss and focus trapping
  (handled by Headless UI), visible focus states via Tailwind.

## 7. Environment & Deployment

- `.env` variable `VITE_API_BASE_URL`, defaulting to
  `https://api.jsoning.com/mock/public` for the deployed build, swappable to the local API
  for development.
- Public GitHub repository with a README covering setup, environment variables, and a short
  "Design Decisions" section referencing this document.
- Deploy via Vercel, connected to the GitHub repo for auto-deploy on push.

## 8. Suggested Phased Plan

| Phase | Content | Rough Effort |
|---|---|---|
| 0 | Vite + React + TS + Tailwind scaffold, ESLint/Prettier, env vars | 1–2 hrs |
| 1 | API/data layer + types + connectivity check (local & public) | 1–2 hrs |
| 2 | Router shell + Home page | 0.5 hr |
| 3 | Products list (responsive table/card) + detail modal | 2–3 hrs |
| 4 | Add Product form + validation + success flow | 1.5–2 hrs |
| 5 | Carts list + client-side join logic + detail modal (incl. null-user handling) | 2–3 hrs |
| 6 | Polish: loading/error/empty states, accessibility pass, responsive QA | 1–2 hrs |
| 8 | Deploy to Vercel + finalize public repo/README | 0.5–1 hr |
