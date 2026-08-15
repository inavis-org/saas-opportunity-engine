# Agent workstreams

Parallel Cloud Agents must stay on isolated directories so Git merges stay cheap. `main` must remain deployable after every merge.

Base branch for new work: `main`.

Every agent:

- Creates `cursor/<workstream>-25e7` (or the Cloud Agent default branch) and a **draft** PR
- Does not merge
- Runs `npm run lint` and `npm run build`
- Leaves a demo of `/analysis/new` working unless the workstream is docs-only

## Ownership

| Workstream | Owns | Must not edit |
| --- | --- | --- |
| review-import | `lib/sources/`, `app/analysis/new/`, `app/api/analyses/route.ts` | `lib/ai/client.ts`, Prisma schema |
| ai-pipeline | `lib/ai/` | UI pages, billing |
| report-ui | `app/analysis/page.tsx`, `components/analysis/` | `lib/ai/client.ts` |
| marketing | `app/page.tsx`, `app/(marketing)/` if added | dashboard, analysis API |
| auth-shell | `lib/auth/`, `app/(auth)/`, `app/dashboard/` | analysis pipeline |
| types-schema | `prisma/`, `types/index.ts`, `lib/ai/schemas.ts` | UI (coordinate; schema changes are sequential) |

Shared files (`app/layout.tsx`, `components/layout/`, `package.json`, `prisma/schema.prisma`) require rebasing onto the latest workstream branch or an integrator PR.

## Prompt template

```
Repository: inavis-org/saas-opportunity-engine
Workstream: <name>
Read market-intelligence/docs/SKILL.md and AGENT_WORKSTREAMS.md.

Implement the next increment for this workstream only.
Do not expand Prisma unless this is types-schema.
Open a draft PR. Do not merge.
Success: npm run build passes and the owned feature can be demonstrated.
```

## Integrator

After parallel PRs exist, one agent rebases them, fixes conflicts, and keeps `/api/health` green. A human merges to `main`. Vercel then updates production.
