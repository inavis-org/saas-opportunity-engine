import { z } from "zod";

const optionalString = z.string().optional();

const serverSchema = z.object({
  DATABASE_URL: optionalString,
  OPENAI_API_KEY: optionalString,
  STRIPE_SECRET_KEY: optionalString,
  STRIPE_WEBHOOK_SECRET: optionalString,
  SUPABASE_SERVICE_ROLE_KEY: optionalString,
  RESEND_API_KEY: optionalString,
  NODE_ENV: optionalString,
});

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: optionalString,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: optionalString,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: optionalString,
  NEXT_PUBLIC_APP_URL: optionalString,
});

export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;

export function getServerEnv(): ServerEnv {
  return serverSchema.parse(process.env);
}

export function getClientEnv(): ClientEnv {
  return clientSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  });
}

export function hasDatabaseUrl(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
