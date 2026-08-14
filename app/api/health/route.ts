import { NextResponse } from "next/server";
import { hasDatabaseUrl } from "@/lib/env";

export async function GET() {
  let database: "connected" | "unconfigured" | "error" = "unconfigured";

  if (hasDatabaseUrl()) {
    try {
      const { prisma } = await import("@/lib/db/prisma");
      await prisma.$queryRaw`SELECT 1`;
      database = "connected";
    } catch {
      database = "error";
    }
  }

  return NextResponse.json({
    data: {
      status: "ok",
      service: "market-intelligence",
      database,
      timestamp: new Date().toISOString(),
    },
    error: null,
  });
}
