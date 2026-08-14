import { Button } from "@/components/ui/button";
import { hasSupabasePublicConfig } from "@/lib/auth";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Accounts ship in Sprint 3. Continue to analysis without signing in.",
};

export default function LoginPage() {
  const supabaseConfigured = hasSupabasePublicConfig();

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-8 px-6 py-16">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Account
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Authentication ships in Sprint 3 with Supabase Auth. You will be able
          to sign in with email or Google, reset a password, and keep analyses
          in a private workspace.
        </p>
      </div>

      <div className="space-y-3 rounded-lg border p-4">
        <p className="text-sm font-medium">Coming in Sprint 3</p>
        <div className="flex flex-col gap-2">
          <Button type="button" disabled>
            Continue with email
          </Button>
          <Button type="button" variant="outline" disabled>
            Continue with Google
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {supabaseConfigured
            ? "Supabase public env vars are set. Auth packages are not installed yet, so sign-in stays disabled."
            : "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then Sprint 3 can connect Auth."}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Analysis does not require an account. Start a competitor review import
          anytime — accounts will attach ownership later without blocking the
          MVP.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button render={<Link href="/analysis/new" />} nativeButton={false}>
            Continue to analysis
          </Button>
          <Button
            render={<Link href="/dashboard" />}
            variant="outline"
            nativeButton={false}
          >
            View dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
