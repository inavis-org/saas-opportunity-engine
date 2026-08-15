/**
 * Dashboard layout stays public until Sprint 3.
 *
 * `requireUser()` currently returns null and must not redirect. When Supabase
 * Auth is connected, this layout (or a middleware/proxy) should send
 * unauthenticated visitors to `/login` and scope data to `getCurrentUserId()`.
 */
export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return <div className="flex flex-1 flex-col bg-background">{children}</div>;
}
