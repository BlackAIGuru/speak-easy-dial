import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Megaphone,
  Bot,
  Mic2,
  Contact,
  Phone,
  BookOpen,
  AudioLines,
  Plug,
  Settings,
  Infinity as InfinityIcon,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/campaigns", label: "Campaigns", icon: Megaphone },
  { to: "/assistants", label: "Assistants", icon: Bot },
  { to: "/voice-library", label: "Voice Library", icon: Mic2 },
  { to: "/contacts", label: "Contacts", icon: Contact },
  { to: "/phone-numbers", label: "Phone Numbers", icon: Phone },
  { to: "/knowledge-bases", label: "Knowledge Bases", icon: BookOpen },
  { to: "/call-recordings", label: "Call Recordings", icon: AudioLines },
  { to: "/integrations", label: "Integrations", icon: Plug },
] as const;

export function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border">
        <InfinityIcon className="h-6 w-6 text-foreground" strokeWidth={2.5} />
        <span className="text-base font-semibold tracking-wide text-foreground">SYNTHESYS</span>
      </div>

      <button className="mx-3 mt-4 flex items-center justify-between gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-3 py-2.5 text-left hover:bg-sidebar-accent transition">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-primary to-primary-glow grid place-items-center text-[10px] font-bold text-primary-foreground">
            P
          </div>
          <span className="truncate text-sm text-sidebar-foreground">Paynet Process Group</span>
        </div>
        <ChevronsUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
      </button>

      <div className="px-3 mt-6">
        <p className="px-2 mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Navigation
        </p>
        <nav className="flex flex-col gap-0.5">
          {nav.map((item) => {
            const active =
              item.to === "/" ? path === "/" : path.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-3 mt-8">
        <p className="px-2 mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Account
        </p>
        <nav className="flex flex-col gap-0.5">
          <Link
            to="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              path.startsWith("/settings")
                ? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50",
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-4 text-xs text-muted-foreground">v1.0.0</div>
    </aside>
  );
}
