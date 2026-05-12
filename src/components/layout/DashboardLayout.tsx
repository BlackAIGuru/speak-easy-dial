import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Link } from "@tanstack/react-router";
import { Home, ChevronRight } from "lucide-react";

export function DashboardLayout({
  title,
  breadcrumb,
  children,
}: {
  title?: string;
  breadcrumb?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="flex h-14 items-center gap-2 border-b border-border px-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="rounded-md bg-secondary/60 px-2 py-1 text-foreground font-medium">
            {breadcrumb ?? title ?? "Dashboard"}
          </span>
        </header>
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
