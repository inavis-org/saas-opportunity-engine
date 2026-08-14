# SaaS Opportunity Engine

An AI-powered competitor intelligence platform for SaaS founders.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma + PostgreSQL (Supabase)

## Local development

```bash
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate Prisma client and build for production |
| `npm run lint` | Run ESLint |
| `npm run format` | Format files with Prettier |

## Documentation

Product and engineering docs live in [`market-intelligence/docs/`](market-intelligence/docs/).

## Cloud Agent environment

Repository-managed environment configuration is in [`.cursor/environment.json`](.cursor/environment.json).
