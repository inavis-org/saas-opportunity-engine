# Market Intelligence — Engineering & UI Skill

## Purpose

This document defines the engineering, architecture, UI, and development standards for the Market Intelligence project.

The goal is to build a production-ready SaaS that is:

* Simple
* Fast
* Lightweight
* Easy to maintain
* Cheap to operate initially
* Scalable when necessary
* Consistent across the codebase
* Easy for a solo developer to understand
* Reusable as a foundation for future SaaS products

Avoid unnecessary complexity. Prefer boring, proven technology over clever architecture.

---

# 1. Core Engineering Philosophy

Follow these principles in this order:

1. Simplicity
2. Maintainability
3. Developer velocity
4. User experience
5. Reliability
6. Performance
7. Scalability

Do not optimize for hypothetical scale.

Build for today's requirements while avoiding decisions that make future growth unnecessarily difficult.

### Default rule

If two solutions accomplish the same thing, choose the one with:

* fewer dependencies
* less code
* fewer services
* simpler deployment
* easier debugging
* better TypeScript support

Do not introduce infrastructure without a concrete requirement.

---

# 2. Technology Stack

## Application

* Next.js
* React
* TypeScript
* Next.js App Router

Use one Next.js application for both frontend and backend unless there is a strong technical reason to separate them.

---

## Styling

Use:

* Tailwind CSS
* shadcn/ui
* Lucide icons

Avoid:

* large custom CSS files
* multiple UI frameworks
* mixing component libraries
* unnecessary animation libraries

---

## Backend

Use Next.js Route Handlers and Server Actions where appropriate.

Do NOT create a separate backend service during the MVP unless technically necessary.

Keep business logic separate from UI components.

---

## Database

Use:

* PostgreSQL
* Supabase
* Prisma

PostgreSQL is the source of truth for application data.

Use Prisma for database access and migrations.

Avoid raw SQL unless Prisma cannot reasonably handle the operation or SQL provides a meaningful performance advantage.

---

## Authentication

Use Supabase Auth.

Supported authentication should initially include:

* Email
* Google

Additional providers should only be added when there is demonstrated demand.

Never implement authentication or password storage manually.

---

## AI

Use the OpenAI API initially.

All AI interactions MUST go through an internal AI service layer.

Example:

```
lib/
  ai/
    client.ts
    prompts.ts
    schemas.ts
    analyze-reviews.ts
```

Do not call the OpenAI API directly from UI components.

Do not expose AI provider implementation details throughout the application.

This allows the provider or models to be changed later without rewriting the application.

Whenever possible, request structured outputs rather than parsing arbitrary AI-generated text.

Validate AI responses before storing or displaying them.

---

## Payments

Use Stripe.

Billing logic must remain isolated from product logic.

Example:

```
lib/
  billing/
    stripe.ts
    plans.ts
    subscriptions.ts
```

Never trust subscription state sent from the client.

Verify billing status server-side.

---

## Email

Use Resend.

Email functionality includes:

* transactional emails
* reports
* competitor alerts
* account notifications
* future monitoring digests

Keep email templates separate from business logic.

---

## Background Jobs

Use Inngest when asynchronous processing becomes necessary.

Examples:

* analyzing large review datasets
* generating reports
* competitor monitoring
* scheduled scans
* email digests

Do not add background infrastructure before it is needed.

Short AI operations can initially execute normally through the application.

---

## Analytics

Use PostHog.

Track meaningful product events rather than every click.

Examples:

```
account_created
analysis_started
analysis_completed
report_viewed
competitor_added
opportunity_generated
subscription_started
```

Never send sensitive customer information to analytics unnecessarily.

---

## Deployment

Use Vercel.

Primary environments:

* Local
* Preview
* Production

Every pull request should be deployable as a preview environment when practical.

---

# 3. Application Structure

Prefer a structure similar to:

```
app/
  (marketing)/
  (auth)/
  dashboard/
  analysis/
  competitors/
  opportunities/
  api/

components/
  ui/
  layout/
  dashboard/
  analysis/
  competitors/

lib/
  ai/
  auth/
  billing/
  db/
  email/
  analytics/
  validation/
  utils/

prisma/

public/

types/

docs/

scripts/
```

Keep files close to the domain they belong to.

Do not create abstractions simply because they might be useful someday.

---

# 4. Server vs Client Components

Prefer Server Components.

Use Client Components only when the component requires:

* browser APIs
* interactive state
* event handlers
* client-side libraries
* real-time user interaction

Do not add `"use client"` to large page trees unnecessarily.

Push client boundaries as far down the component tree as practical.

---

# 5. TypeScript Rules

Use strict TypeScript.

Avoid:

```
any
```

Prefer explicit types and inferred types where obvious.

Use shared domain types when data crosses application boundaries.

Validate external data at runtime.

Recommended:

* Zod

Use Zod for:

* API inputs
* forms
* environment variables
* AI structured responses
* external API responses where appropriate

Never assume external data matches its TypeScript type.

---

# 6. API Design

Keep APIs boring.

Prefer predictable REST-style endpoints or Server Actions.

Example:

```
POST /api/analyses
GET  /api/analyses/:id
GET  /api/competitors
POST /api/competitors
```

Return consistent responses.

Example:

```
{
  "data": {},
  "error": null
}
```

Errors should be meaningful but must not expose internal implementation details.

Validate every external input.

---

# 7. Security

Security is not optional.

Always:

* validate user input
* verify authentication server-side
* verify resource ownership
* keep secrets server-side
* use environment variables
* validate uploaded files
* sanitize untrusted content when necessary
* rate-limit expensive endpoints
* protect AI endpoints from abuse

Never expose:

* database credentials
* Stripe secrets
* Supabase service keys
* OpenAI keys
* internal prompts containing sensitive logic

Never trust a user-provided user ID.

Derive identity from the authenticated session.

---

# 8. Data Collection

The product may analyze customer feedback from external sources.

Do not assume every website permits automated scraping.

Data collection implementations must consider:

* official APIs
* website terms
* rate limits
* robots directives where applicable
* licensing
* user-provided datasets

Prefer official APIs, licensed data, or user-provided/imported data where practical.

Keep source integrations modular.

Example:

```
lib/
  sources/
    reddit.ts
    csv.ts
    manual.ts
```

Each source should produce a normalized internal review format.

Example conceptual model:

```
Review {
  source
  externalId
  content
  rating
  author
  publishedAt
  productId
}
```

Downstream AI analysis should operate on normalized data rather than source-specific formats.

---

# 9. AI Reliability

Never present unsupported AI conclusions as facts.

Whenever possible, insights should be traceable to evidence.

For example:

```
Complaint:
"Mobile application is unreliable"

Frequency:
31%

Evidence:
73 reviews
```

Users should eventually be able to inspect representative reviews supporting an insight.

Separate:

* extracted facts
* calculated metrics
* AI interpretations
* AI recommendations

Do not allow the model to fabricate statistics.

Statistics must come from application calculations whenever possible.

---

# 10. UI Philosophy

The application is a research and intelligence product.

The UI should feel:

* clean
* intelligent
* trustworthy
* data-focused
* calm
* premium
* fast

Think:

financial dashboard + modern SaaS + research tool

Avoid making the product look like a generic AI chatbot.

---

# 11. Visual Design

Prefer:

* neutral backgrounds
* restrained accent colors
* strong typography
* subtle borders
* moderate border radius
* clear spacing
* high information density without clutter

Avoid:

* excessive gradients
* glassmorphism everywhere
* giant rounded cards
* excessive shadows
* neon AI aesthetics
* unnecessary animations
* decorative elements without purpose

Data should be the visual focus.

---

# 12. Typography

Typography must establish strong hierarchy.

Use approximately:

```
Page Title
Section Heading
Card Title
Body
Metadata
Caption
```

Avoid excessive font sizes.

Dashboard interfaces should prioritize information density.

Use muted text for secondary information.

Never rely solely on color to communicate meaning.

---

# 13. Layout

Desktop dashboard:

```
Sidebar
    Dashboard
    Analyses
    Competitors
    Opportunities
    Reports

Main Content
    Header
    Primary Content
```

Keep navigation stable.

Avoid deeply nested navigation.

Users should generally reach important features within two interactions.

---

# 14. Dashboard

The dashboard should answer:

"What should I look at right now?"

Potential sections:

* Recent analyses
* Watched competitors
* Emerging complaints
* New opportunities
* Market signals

Do not fill the dashboard with vanity metrics.

Every dashboard component should help the user make a decision.

---

# 15. Analysis UI

A competitor analysis should prioritize:

1. Executive summary
2. Opportunity score
3. Major complaints
4. Feature requests
5. Sentiment
6. Customer segments
7. Pricing feedback
8. Supporting evidence
9. Suggested opportunities

The user should understand the important findings within approximately 30 seconds.

---

# 16. Opportunity Score

Never display an unexplained magic number.

If the application says:

```
Opportunity Score
84 / 100
```

users should be able to understand why.

Possible factors:

```
Demand             22 / 25
Pain intensity     20 / 25
Competition        13 / 20
Willingness to pay 16 / 20
Trend              8 / 10
```

The exact formula can evolve.

Transparency matters more than pretending the score is perfectly scientific.

---

# 17. Evidence-First UX

Every important insight should eventually support:

```
View evidence
```

Example:

```
Slow Performance

Mentioned in 184 reviews
27% of negative feedback

[View evidence]
```

Opening the evidence displays representative source material.

This builds trust and differentiates the application from generic AI summaries.

---

# 18. Loading States

AI operations can take time.

Never leave users staring at an unexplained spinner.

Show progress states such as:

```
Collecting feedback...

Normalizing reviews...

Identifying themes...

Extracting feature requests...

Calculating opportunity score...

Generating recommendations...
```

This makes long-running operations feel intentional.

---

# 19. Empty States

Every empty state should tell the user what to do next.

Bad:

```
No analyses.
```

Good:

```
You haven't analyzed a market yet.

Analyze a competitor to discover customer complaints,
feature requests, and potential opportunities.

[Start Analysis]
```

---

# 20. Error States

Errors should explain:

1. What happened
2. Whether the user's data is safe
3. What they can do next

Bad:

```
Error 500
```

Better:

```
We couldn't complete this analysis.

Your uploaded reviews are still available.
Try running the analysis again.

[Retry]
```

---

# 21. Responsive Design

Desktop is the primary experience because the application contains research and data-heavy workflows.

However, all pages must remain usable on:

* mobile
* tablet
* laptop
* desktop

Do not attempt to reproduce complex desktop tables exactly on mobile.

Transform them into stacked cards or simplified views where appropriate.

---

# 22. Accessibility

Always:

* use semantic HTML
* provide keyboard navigation
* label form controls
* maintain sufficient contrast
* provide visible focus states
* use buttons for actions
* use links for navigation

Accessibility should come naturally from good component design.

---

# 23. Performance

Do not prematurely optimize.

But avoid obvious problems.

Prefer:

* Server Components
* pagination
* lazy loading
* optimized images
* database indexes
* small client bundles

Avoid sending entire review datasets to the browser unnecessarily.

Process large datasets server-side.

---

# 24. Dependencies

Before installing a package, ask:

"Can this reasonably be implemented with what we already have?"

Avoid dependencies for trivial functionality.

When adding dependencies, prefer:

* actively maintained projects
* large communities
* strong TypeScript support
* clear documentation
* minimal runtime overhead

Do not install multiple libraries solving the same problem.

---

# 25. Testing

Prioritize tests around business-critical behavior.

High priority:

* authentication
* billing
* analysis pipeline
* opportunity scoring
* permissions
* data normalization

Do not chase arbitrary coverage percentages.

Test behavior that would cost money, trust, or customers if it broke.

---

# 26. Logging

Log meaningful application events.

Include enough context to debug failures.

Never log:

* passwords
* authentication tokens
* API keys
* payment information
* unnecessary personal data

AI failures should include operational metadata such as model, operation, timing, and error category without exposing sensitive content unnecessarily.

---

# 27. Environment Variables

Validate environment variables at startup.

Conceptually:

```
DATABASE_URL
OPENAI_API_KEY
STRIPE_SECRET_KEY
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
```

Maintain:

```
.env.example
```

Never commit real secrets.

---

# 28. Git Practices

Keep commits small and meaningful.

Examples:

```
feat: add competitor analysis
fix: handle empty review dataset
refactor: isolate ai client
docs: update architecture
chore: update dependencies
```

Do not commit generated files, secrets, or temporary debugging code.

---

# 29. MVP Discipline

Before implementing something, ask:

"Does this help us validate whether someone will pay?"

For the initial MVP, prioritize:

* authentication
* feedback input/import
* review normalization
* complaint extraction
* feature request extraction
* evidence
* opportunity suggestions
* basic report
* billing

Do NOT prioritize:

* enterprise permissions
* complex teams
* mobile apps
* public API
* elaborate animations
* dozens of integrations
* microservices
* advanced monitoring

Ship the smallest product capable of producing a genuine "wow" moment.

---

# 30. Product North Star

The product is NOT:

"AI that summarizes reviews."

The product is:

"Market intelligence that helps founders decide what to build."

Every feature should move toward answering:

```
What problems exist?

How painful are they?

Who has them?

What are they currently paying?

What alternatives exist?

Where are competitors weak?

What opportunity exists?

What evidence supports this conclusion?
```

---

# 31. Future SaaS Reusability

Architecture should allow generic infrastructure to be reused in future products.

Potential reusable modules:

```
auth/
billing/
email/
ai/
analytics/
database/
layouts/
account-settings/
```

However:

Do not turn this project into a framework.

First build the product.

Extract reusable infrastructure only after patterns have appeared multiple times.

---

# 32. Final Decision Rule

When uncertain between:

```
clever vs boring
→ choose boring

custom vs established
→ choose established

abstraction vs duplication
→ tolerate small duplication first

microservice vs monolith
→ choose monolith

new dependency vs existing capability
→ use existing capability

perfect vs shipped
→ ship
```

Build software that is easy to understand six months later.

The objective is not to demonstrate engineering complexity.

The objective is to build a useful product, acquire paying customers, learn quickly, and create a technical foundation that makes the next SaaS easier to launch.
