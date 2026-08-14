export default function AuthLayout({ children }: LayoutProps<"/login">) {
  return <div className="flex flex-1 flex-col bg-background">{children}</div>;
}
