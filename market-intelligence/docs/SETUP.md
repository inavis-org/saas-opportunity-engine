# Setup: Vercel, MCP, plugins, and Automations

This is the human checklist required for a **public production URL**. Cloud Agents cannot create a Vercel project or paste secrets without your dashboard login.

Supabase project already used by this repo:

- Project ref: `sqkzekpcqyydhmawqcjq`
- API URL: `https://sqkzekpcqyydhmawqcjq.supabase.co`
- Dashboard: https://supabase.com/dashboard/project/sqkzekpcqyydhmawqcjq

The initial Prisma schema (User, Competitor, Analysis, Review, Insight) is applied on that project.

## 1. Vercel (required for the live link)

1. Sign in at [vercel.com](https://vercel.com) with the GitHub account that can access `inavis-org/saas-opportunity-engine`.
2. **Add New Project** → Import `saas-opportunity-engine`.
3. Framework: Next.js. Root directory: `.` Production branch: `main`.
4. Enable **Preview Deployments** for every pull request.
5. Add environment variables for **Production** and **Preview**:

| Name | Notes |
| --- | --- |
| `DATABASE_URL` | Supabase **transaction pooler** URI, port `6543`, add `?sslmode=require`. Project Settings → Database. |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://sqkzekpcqyydhmawqcjq.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project Settings → API (anon or publishable key) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only. Never expose to the client. |
| `OPENAI_API_KEY` | Optional for the landing page. Required for LLM analysis. |
| `NEXT_PUBLIC_APP_URL` | Set after the first deploy, e.g. `https://<project>.vercel.app` |

6. Deploy. Production URL appears on the project **Domains** tab.
7. Smoke test: `GET https://<production-host>/api/health` should return `"status":"ok"`.
8. Optional: set the GitHub repo homepage to that production URL (Settings → General → Website).

If `prisma migrate deploy` fails because tables already exist, baseline with:

```bash
npx prisma migrate resolve --applied 20260814120000_init
```

## 2. Cursor MCP servers (Desktop)

Settings → Cursor Settings → MCP. Authenticate these:

| Server | Why |
| --- | --- |
| **Vercel** (official plugin) | Deployments, env, logs, production URL |
| **Supabase** | Schema, SQL, logs, advisors |
| **Context7** | Current Next.js / library docs |
| **Slack** | Optional status posts when Automations finish |

Optional later: Datadog (product spec currently uses PostHog, not Datadog).

Copy [`.cursor/mcp.json.example`](../../.cursor/mcp.json.example) to `.cursor/mcp.json` locally if you manage MCP from the repo. Do not commit secrets.

## 3. Cursor plugins / skills

Enable the Vercel plugin pack plus:

- Design: shadcn, Next.js, React best practices
- Develop: AI SDK, Auth / Supabase, Vercel Storage
- Debug: Verification, Vercel Functions
- Deploy: Vercel CLI, Deployments / CI, Env vars

## 4. Cursor Automations

Create these in the Cursor dashboard (this agent cannot create Automations, only look them up by UUID).

Repo: `inavis-org/saas-opportunity-engine`  
Environment: [Market Intelligence Platform](https://cursor.com/dashboard/cloud-agents/environments/e/85a65b17-980a-11f1-ba66-0e7d0216e441)

Paste-ready prompts: [`CURSOR_AUTOMATIONS.md`](CURSOR_AUTOMATIONS.md)

Suggested triggers:

1. Pull request opened → review, fix lint/build, do not merge
2. Push to `main` → verify `/api/health` on production if `NEXT_PUBLIC_APP_URL` is set

## 5. API keys still needed for later sprints

- Stripe (billing)
- Resend (email) + verified domain
- Google OAuth client for Supabase Auth
- PostHog (Sprint 7 analytics)

Never commit real secrets. [`.env.example`](../../.env.example) lists names only.
