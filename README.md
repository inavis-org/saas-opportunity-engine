# SaaS Opportunity Engine

An AI-powered competitor intelligence platform for SaaS founders.

**Production URL:** pending Vercel import — follow [`market-intelligence/docs/SETUP.md`](market-intelligence/docs/SETUP.md) then replace this line with `https://<project>.vercel.app`.

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

Health: [http://localhost:3000/api/health](http://localhost:3000/api/health)  
Analyze: [http://localhost:3000/analysis/new](http://localhost:3000/analysis/new)

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate Prisma client, migrate when `DATABASE_URL` is set, production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format files with Prettier |
| `npm run db:migrate` | Apply Prisma migrations |

## Deploy

1. Import this GitHub repo into Vercel (see [SETUP.md](market-intelligence/docs/SETUP.md)).
2. Set env vars (Supabase pooler `DATABASE_URL`, anon key, service role, optional OpenAI).
3. Every PR gets a Preview URL. `main` is Production.

## Documentation

| Doc | Purpose |
| --- | --- |
| [PRD](market-intelligence/docs/PRD.md) | Product requirements |
| [SPRINTS](market-intelligence/docs/SPRINTS.md) | Execution roadmap |
| [SKILL](market-intelligence/docs/SKILL.md) | Engineering and UI standards |
| [SETUP](market-intelligence/docs/SETUP.md) | Vercel, MCP, plugins, secrets |
| [AGENT_WORKSTREAMS](market-intelligence/docs/AGENT_WORKSTREAMS.md) | Parallel Cloud Agent file ownership |
| [CURSOR_AUTOMATIONS](market-intelligence/docs/CURSOR_AUTOMATIONS.md) | Automation prompts |

## Cloud Agent environment

Repository-managed environment configuration is in [`.cursor/environment.json`](.cursor/environment.json).
