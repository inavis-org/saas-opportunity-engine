import { Button } from "@/components/ui/button";
import Link from "next/link";

const QUESTIONS = [
  "What problems exist?",
  "How painful are they?",
  "Who has them?",
  "What are they currently paying?",
  "Where are competitors weak?",
  "What evidence supports this?",
];

const STEPS = [
  {
    step: "01",
    title: "Import competitor feedback",
    body: "Paste reviews or upload CSV. The engine normalizes source text into a single review set you can inspect.",
  },
  {
    step: "02",
    title: "Extract complaints and requests",
    body: "Recurring themes, feature asks, and pricing friction are grouped with counts — not a one-paragraph summary.",
  },
  {
    step: "03",
    title: "Score the opportunity",
    body: "Demand, pain, competition, willingness to pay, and trend are shown as factors so the number is explainable.",
  },
];

const SCORE_FACTORS = [
  { label: "Demand", value: 22, max: 25 },
  { label: "Pain intensity", value: 20, max: 25 },
  { label: "Competition", value: 13, max: 20 },
  { label: "Willingness to pay", value: 16, max: 20 },
  { label: "Trend", value: 8, max: 10 },
];

const COMPLAINTS = [
  { theme: "Mobile export crashes", mentions: 73, share: "31%" },
  { theme: "Support response lag", mentions: 41, share: "17%" },
  { theme: "Pricing vs. value", mentions: 38, share: "16%" },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <main className="flex flex-1 flex-col">
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:py-20">
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Market intelligence for founders
              </p>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                What should I build next?
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                Turn competitor reviews into complaints, feature requests, and an
                evidence-backed opportunity score — so you decide with data, not
                vibes.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  render={<Link href="/analysis/new" />}
                  nativeButton={false}
                  size="lg"
                >
                  Start analysis
                </Button>
                <Button
                  render={<Link href="/dashboard" />}
                  variant="outline"
                  nativeButton={false}
                  size="lg"
                >
                  Open dashboard
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Import reviews in minutes. Inspect the evidence behind every
                insight.
              </p>
            </div>

            <aside
              aria-label="Example opportunity snapshot"
              className="rounded-lg border bg-card"
            >
              <div className="flex items-baseline justify-between border-b px-5 py-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Example snapshot
                  </p>
                  <p className="mt-1 font-medium">Competitor review set</p>
                </div>
                <p className="text-sm tabular-nums text-muted-foreground">
                  184 reviews
                </p>
              </div>
              <div className="space-y-5 px-5 py-5">
                <div>
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                      Opportunity score
                    </p>
                    <p className="text-3xl font-semibold tracking-tight tabular-nums">
                      79
                      <span className="text-base font-medium text-muted-foreground">
                        {" "}
                        / 100
                      </span>
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {SCORE_FACTORS.map((factor) => (
                      <li
                        key={factor.label}
                        className="grid grid-cols-[1fr_auto] items-center gap-3 text-sm"
                      >
                        <span className="text-muted-foreground">
                          {factor.label}
                        </span>
                        <span className="tabular-nums">
                          {factor.value} / {factor.max}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm font-medium">Top complaints</p>
                  <ul className="mt-3 space-y-2">
                    {COMPLAINTS.map((row) => (
                      <li
                        key={row.theme}
                        className="flex items-baseline justify-between gap-3 text-sm"
                      >
                        <span>{row.theme}</span>
                        <span className="shrink-0 tabular-nums text-muted-foreground">
                          {row.mentions} · {row.share}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto w-full max-w-5xl px-6 py-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              From raw feedback to a build decision
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              The product is not a review summarizer. It is research tooling for
              deciding what to ship.
            </p>
            <ol className="mt-10 grid gap-6 sm:grid-cols-3">
              {STEPS.map((item) => (
                <li key={item.step} className="rounded-lg border p-5">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {item.step}
                  </p>
                  <h3 className="mt-3 font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto w-full max-w-5xl px-6 py-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              Every important finding should be inspectable
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Statistics come from the review set. Interpretations stay labeled.
              Unsupported conclusions are not presented as facts.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-5">
                <p className="font-medium">Complaints with frequency</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Themes include mention counts and share of negative feedback so
                  you can rank pain, not anecdotes.
                </p>
              </div>
              <div className="rounded-lg border p-5">
                <p className="font-medium">Explainable scores</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Opportunity scores break into demand, pain, competition,
                  willingness to pay, and trend — never a magic number.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-5xl px-6 py-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              Questions the analysis is built to answer
            </h2>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
              {QUESTIONS.map((question) => (
                <li key={question} className="bg-background px-5 py-4 text-sm">
                  {question}
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-col gap-4 border-t pt-10 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">Ready to inspect a market?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Start with a competitor review set. You will see complaints,
                  requests, and a scored opportunity.
                </p>
              </div>
              <Button
                render={<Link href="/analysis/new" />}
                nativeButton={false}
                size="lg"
              >
                Start analysis
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
