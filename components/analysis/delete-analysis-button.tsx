"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function DeleteAnalysisButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onDelete() {
    setPending(true);
    setError(null);
    try {
      const response = await fetch(`/api/analyses/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        setError(payload.error ?? "Delete failed");
        return;
      }
      router.push("/analysis");
      router.refresh();
    } catch {
      setError("Network error. The analysis was not deleted.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => void onDelete()}
        disabled={pending}
      >
        {pending ? "Deleting…" : "Delete analysis"}
      </Button>
      {error ? <p className="text-sm text-muted-foreground">{error}</p> : null}
    </div>
  );
}
