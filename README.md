# TMPLOCKR

![tmplockr](public/tmplockr.png)

Temporary storage with enforced limits.

tmplockr is a constrained digital locker for files and notes.  
Everything has a quota. Nothing is meant to live forever.

If you hit a limit, the operation fails. Cleanup is required.

---

## What It Is

- Authenticated user dashboard
- File uploads backed by ImageKit
- Plain text notes
- Sharing via short 4-digit access codes
- Hard per-user limits:
  - 100MB total storage
  - 10 notes
  - 5 active shares

No public indexes. No soft limits. No silent expansion.

---

## Stack

- Next.js 15 (App Router)
- TypeScript
- PostgreSQL (Neon)
- Drizzle ORM
- ImageKit
- Tailwind CSS + shadcn/ui

---

## Setup

```bash
git clone https://github.com/d1rshan/tmplockr.git
cd tmplockr
pnpm install
````

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
JWT_SECRET=replace-this
IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
```

```bash
pnpm drizzle-kit push
pnpm dev
```

Runs on `http://localhost:3000`.

---

## Structure

```txt
src/
├─ app/          # Routes and server actions
├─ components/   # Shared UI
├─ features/     # Auth, dashboard, home
├─ lib/          # DB and utilities
└─ types.ts
```
