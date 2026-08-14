/**
 * Session helpers (auth shell).
 *
 * Sprint 3 will wire these to Supabase Auth (email + Google). Do not add
 * `@supabase/ssr` or `@supabase/supabase-js` until that sprint — they are
 * not in package.json today, and analysis must keep working without accounts.
 *
 * Until then:
 * - Identity is always "anonymous" (`getCurrentUserId()` returns null).
 * - Do not gate `/dashboard` or `/analysis` on a session.
 * - Never trust a client-supplied user id; Sprint 3 must derive identity
 *   from the verified cookie/session only.
 *
 * Planned Sprint 3 shape (do not implement here):
 * 1. Create a server Supabase client from cookies (`createServerClient`).
 * 2. `getCurrentUserId` → `supabase.auth.getUser()` then `user.id`.
 * 3. `requireUser` → redirect to `/login` when unauthenticated.
 * 4. Protect user-owned analyses in route handlers using that id.
 */

export type AuthUser = {
  id: string;
  email: string | null;
};

/**
 * Returns the authenticated user id, or null when there is no session.
 * Always null until Sprint 3 connects Supabase Auth.
 */
export function getCurrentUserId(): string | null {
  return getCurrentUser()?.id ?? null;
}

/**
 * Returns the authenticated user, or null when there is no session.
 * Always null until Sprint 3 — the app stays usable without signing in.
 */
export function getCurrentUser(): AuthUser | null {
  // Sprint 3: replace with `const { data } = await supabase.auth.getUser()`.
  // Keep this sync until the Supabase client exists so Server Components
  // can call it without a dependency.
  return null;
}

/**
 * Placeholder for dashboard/API guards.
 *
 * Must not redirect or throw today. Sprint 3 should redirect unauthenticated
 * visitors to `/login` and restrict analyses to the session user.
 */
export function requireUser(): AuthUser | null {
  return getCurrentUser();
}

/**
 * True when public Supabase URL/anon key are present. Does not prove Auth
 * is configured — only that env placeholders were filled.
 */
export function hasSupabasePublicConfig(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
