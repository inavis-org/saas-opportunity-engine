# SPRINTS.md

# SaaS Opportunity Engine

## Execution Roadmap

Version: 1.0

---

# Goal

Build and launch the MVP as quickly as possible while maintaining production-quality code.

Every sprint must produce something that can be deployed, tested, or demonstrated.

The objective is **not** to build every planned feature.

The objective is to validate that founders are willing to pay for market intelligence that helps them discover SaaS opportunities.

---

# Development Principles

Every sprint should:

* End with a working application
* Keep the `main` branch deployable
* Avoid unnecessary complexity
* Include documentation updates
* Prioritize customer value over technical perfection
* Ship small, iterate fast

---

# Sprint 0 — Foundation

## Goal

Prepare the project for long-term development.

### Tasks

### Repository

* [ ] Initialize Git repository
* [ ] Configure branch strategy
* [ ] Configure `.gitignore`

### Next.js Setup

* [ ] Next.js (App Router)
* [ ] TypeScript
* [ ] Tailwind CSS
* [ ] shadcn/ui
* [ ] ESLint
* [ ] Prettier

### Folder Structure

* [ ] Create project structure
* [ ] Create `lib`
* [ ] Create `components`
* [ ] Create `types`
* [ ] Create `docs`
* [ ] Create `scripts`

### Documentation

* [ ] README.md
* [ ] PRD.md
* [ ] SKILL.md
* [ ] SPRINTS.md
* [ ] ROADMAP.md
* [ ] ARCHITECTURE.md

### Infrastructure

* [ ] Create Supabase project
* [ ] Configure PostgreSQL
* [ ] Configure Prisma
* [ ] Configure Vercel
* [ ] Create OpenAI API key
* [ ] Create Stripe account
* [ ] Configure environment variables

### Success Criteria

* Local development works
* Application deploys successfully
* Empty production deployment is live

---

# Sprint 1 — MVP Core (Validate the Idea)

## Goal

Build the smallest version that proves the product is valuable.

### Features

Review Import

* [ ] Upload CSV
* [ ] Paste review text
* [ ] Parse uploaded data

AI Analysis

* [ ] Extract complaints
* [ ] Extract feature requests
* [ ] Group similar complaints
* [ ] Generate executive summary

Report

* [ ] Show complaints
* [ ] Show requested features
* [ ] Show AI summary

### Success Criteria

A user can upload review data and receive meaningful insights in minutes.

---

# Sprint 2 — Data Persistence & Dashboard

## Goal

Allow users to save and revisit analyses.

### Database

* [ ] User model
* [ ] Analysis model
* [ ] Review model
* [ ] Competitor model

### Dashboard

* [ ] Dashboard layout
* [ ] Recent analyses
* [ ] Analysis history
* [ ] Delete analysis
* [ ] Search analyses

### Success Criteria

Users can create, save, and reopen analyses.

---

# Sprint 3 — Authentication & Accounts

## Goal

Introduce user accounts and secure data.

### Features

Authentication

* [ ] Email login
* [ ] Google login
* [ ] Logout
* [ ] Password reset

Account

* [ ] Profile page
* [ ] Account settings

Authorization

* [ ] Protect dashboard
* [ ] Restrict access to user-owned data

### Success Criteria

Each user has a private workspace.

---

# Sprint 4 — Market Intelligence

## Goal

Transform summaries into actionable insights.

### Features

* [ ] Complaint frequency
* [ ] Feature request ranking
* [ ] Sentiment analysis
* [ ] Opportunity Score
* [ ] AI opportunity recommendations
* [ ] Supporting evidence

### Dashboard

* [ ] Executive Summary
* [ ] Complaint Breakdown
* [ ] Opportunity Cards
* [ ] Insights Panel

### Success Criteria

Users can understand the biggest market opportunities without reading raw reviews.

---

# Sprint 5 — Competitor Comparison

## Goal

Help founders compare products.

### Features

* [ ] Compare two competitors
* [ ] Compare complaints
* [ ] Compare feature requests
* [ ] Compare sentiment
* [ ] Compare pricing feedback

### Dashboard

* [ ] Comparison table
* [ ] Opportunity gaps
* [ ] Winner by category

### Success Criteria

Users can identify underserved market segments.

---

# Sprint 6 — Billing

## Goal

Launch paid subscriptions.

### Stripe

* [ ] Free plan
* [ ] Pro plan
* [ ] Subscription management
* [ ] Billing portal
* [ ] Usage limits

### Features

Free

* Limited analyses

Pro

* Unlimited analyses
* Export reports
* Opportunity recommendations
* Saved history

### Success Criteria

A user can subscribe and unlock premium features.

---

# Sprint 7 — Polish & Beta Launch

## Goal

Prepare for real users.

### Improvements

* [ ] Improve UI
* [ ] Improve loading states
* [ ] Improve empty states
* [ ] Improve error handling
* [ ] Improve accessibility
* [ ] Improve performance

### Testing

* [ ] End-to-end testing
* [ ] Authentication testing
* [ ] AI pipeline testing
* [ ] Billing testing

### Analytics

* [ ] PostHog
* [ ] Error monitoring
* [ ] Basic event tracking

### Success Criteria

Application is stable enough for beta users.

---

# Sprint 8 — Customer Validation

## Goal

Learn from real users before expanding the product.

### Tasks

* [ ] Onboard first beta users
* [ ] Observe usage sessions
* [ ] Collect feedback
* [ ] Fix major usability issues
* [ ] Prioritize requested improvements

### Success Criteria

At least five active users complete analyses and provide actionable feedback.

---

# Sprint 9 — Public Launch

## Goal

Release the MVP publicly.

### Marketing

* [ ] Landing page
* [ ] Pricing page
* [ ] Product Hunt launch
* [ ] Reddit launch
* [ ] LinkedIn launch
* [ ] X launch

### Documentation

* [ ] User guide
* [ ] FAQ
* [ ] Privacy Policy
* [ ] Terms of Service

### Success Criteria

Acquire the first paying customer.

---

# Post-MVP Roadmap

## Version 2

* Multi-source review aggregation
* Reddit integration
* Product Hunt integration
* Capterra integration
* G2 integration (where permitted)
* Opportunity trends
* Daily market monitoring

---

## Version 3

* AI market reports
* Competitor tracking
* Email alerts
* Team workspaces
* Shared reports
* Export to PDF
* Export to CSV

---

## Version 4

* Startup idea discovery engine
* Market Heat Map
* Industry dashboards
* AI roadmap suggestions
* Pricing intelligence
* Market growth signals
* Investor reports

---

# Definition of Done

A sprint is complete only when:

* All planned features are implemented.
* Code has been reviewed (if applicable).
* The application builds successfully.
* The application is deployed.
* No critical bugs remain.
* Documentation is updated.
* The `main` branch is stable.
* The feature can be demonstrated end-to-end.

---

# Guiding Principle

> **Ship the smallest product that creates a "wow" moment.**

Everything else can wait.

If a feature does not help a founder answer **"What should I build next?"**, it should not delay the MVP.
