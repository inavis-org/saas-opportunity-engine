import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-6 py-16">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Authentication ships in Sprint 3. This shell is ready for Supabase
          Auth (email and Google) without blocking analysis.
        </p>
      </div>
      <Button render={<Link href="/analysis/new" />} nativeButton={false}>
        Continue to analysis
      </Button>
    </div>
  );
}
