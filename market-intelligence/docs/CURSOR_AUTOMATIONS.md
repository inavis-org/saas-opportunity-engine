# Cursor Automations

Create each automation in the Cursor dashboard. Point them at `github.com/inavis-org/saas-opportunity-engine` and the Cloud Agent environment **Market Intelligence Platform**.

## Automation A — PR quality gate

**Trigger:** Pull request opened or updated  
**Prompt:**

```
You are the quality-gate agent for saas-opportunity-engine.

1. Read market-intelligence/docs/AGENT_WORKSTREAMS.md and only touch files owned by this PR's workstream, plus conflict fixes.
2. Run npm run lint and npm run build.
3. If either fails, fix the smallest set of files and push to the same branch.
4. Do not merge the PR. Do not change secrets.
5. Comment on the PR with: lint result, build result, and the Vercel preview URL if a vercel.app comment already exists.
```

## Automation B — Production smoke

**Trigger:** Push to `main`  
**Prompt:**

```
After main is updated:

1. If NEXT_PUBLIC_APP_URL or a documented production URL exists in README.md, GET /api/health.
2. Expect JSON { "data": { "status": "ok" }, "error": null }.
3. If health fails, open a draft PR with a fix. Do not revert main.
4. Optionally notify Slack that production was updated, without posting secrets.
```

## Automation C — Feature implementer (manual / @mention)

**Trigger:** Manual or issue labeled `agent-implement`  
**Prompt:**

```
Implement only the workstream named in the issue/PR title.
Follow market-intelligence/docs/AGENT_WORKSTREAMS.md file ownership.
Open a draft PR. Do not merge. Keep main deployable.
```
