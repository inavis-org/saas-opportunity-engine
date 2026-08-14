<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cloud Agent development

- Install dependencies: `./scripts/cloud-agent-install.sh` (or `npm ci`)
- Start dev server: `npm run dev -- --hostname 0.0.0.0 --port 3000`
- Health check: `GET /api/health` (JSON `data.status` is `"ok"` even if the database is unconfigured)
- Product docs: `market-intelligence/docs/`
- Setup (Vercel, MCP, Automations): `market-intelligence/docs/SETUP.md`
- Parallel workstreams: `market-intelligence/docs/AGENT_WORKSTREAMS.md`

## Cursor Cloud specific instructions

- Do not wait for a Vercel production URL inside this VM. The public URL is created when the GitHub repo is imported in Vercel.
- Demo the product at `/` (marketing), `/analysis/new` (import + report), and `/api/health`.
- Heuristic analysis works without `OPENAI_API_KEY`. LLM analysis runs when that env var is set.
- `DATABASE_URL` is optional for Cloud Agent boots. Persistence runs only when it is set.
- Read `node_modules/next/dist/docs/` before changing Next.js APIs.
