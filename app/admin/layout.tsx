import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login page renders without the shell; all shell-protected pages live
  // inside the (shell) route group with its own layout.
  return <>{children}</>;
}
