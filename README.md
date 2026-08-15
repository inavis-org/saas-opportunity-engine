# SaaS Opportunity Engine

An AI-powered competitor intelligence platform for SaaS founders.

**Production URL:** not assigned yet. Import this repo in Vercel (see [SETUP.md](market-intelligence/docs/SETUP.md)). After the first production deploy, replace this line with `https://<project>.vercel.app` and set the GitHub repo homepage to the same URL.

## Workstream PRs

`#4` and `#5` are on `main`. Remaining feature PRs (`#6`–`#9`) are integrated in this Sprint 2 branch. A human merges to `main`.

| Workstream | PR |
| --- | --- |
| Wave 0 deploy + MVP | [#4](https://github.com/inavis-org/saas-opportunity-engine/pull/4) (merged) |
| AI pipeline | [#5](https://github.com/inavis-org/saas-opportunity-engine/pull/5) (merged) |
| Report UI | [#6](https://github.com/inavis-org/saas-opportunity-engine/pull/6) |
| Marketing | [#7](https://github.com/inavis-org/saas-opportunity-engine/pull/7) |
| Review import | [#8](https://github.com/inavis-org/saas-opportunity-engine/pull/8) |
| Auth shell | [#9](https://github.com/inavis-org/saas-opportunity-engine/pull/9) |

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
