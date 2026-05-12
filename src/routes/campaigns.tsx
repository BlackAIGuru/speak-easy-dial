import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Plus, MoreVertical, CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/campaigns")({
  component: CampaignsLayout,
  head: () => ({
    meta: [
      { title: "Campaigns · Synthesys" },
      { name: "description", content: "Manage your outbound calling campaigns." },
    ],
  }),
});

const campaigns = [
  { name: "4-8", status: "scheduled", date: "Apr 8, 2026, 12:27 PM", calls: 0, progress: 0, pickup: 0, voicemail: 0 },
  { name: "AI2", status: "cancelled", date: "Apr 8, 2026, 12:26 PM", calls: 999, progress: 100, pickup: 0, voicemail: 0 },
  { name: "4-6", status: "completed", date: "Apr 7, 2026, 12:09 AM", calls: 999, progress: 100, pickup: 22, voicemail: 0 },
  { name: "4-2 manual rerun 2026-04-03 16:07 ET", status: "completed", date: "Apr 3, 2026, 3:33 PM", calls: 999, progress: 100, pickup: 46, voicemail: 0 },
  { name: "test", status: "cancelled", date: "Apr 3, 2026, 12:56 PM", calls: 999, progress: 100, pickup: 11, voicemail: 0 },
  { name: "4-2", status: "completed", date: "Apr 3, 2026, 1:39 AM", calls: 999, progress: 100, pickup: 0, voicemail: 0 },
  { name: "part 5", status: "completed", date: "Apr 1, 2026, 4:26 PM", calls: 399, progress: 100, pickup: 19, voicemail: 0 },
];

function StatusPill({ status }: { status: string }) {
  const config = {
    scheduled: { Icon: Clock, color: "text-muted-foreground", border: "border-border", bg: "bg-secondary/40" },
    cancelled: { Icon: XCircle, color: "text-destructive", border: "border-destructive/30", bg: "bg-destructive/10" },
    completed: { Icon: CheckCircle2, color: "text-success", border: "border-success/30", bg: "bg-success/10" },
  }[status] ?? { Icon: Clock, color: "text-muted-foreground", border: "border-border", bg: "bg-secondary/40" };
  const { Icon, color, border, bg } = config;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs capitalize", color, border, bg)}>
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

function CampaignsLayout() {
  const loc = useLocation();
  if (loc.pathname !== "/campaigns") return <Outlet />;
  return (
    <DashboardLayout title="Campaigns">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Campaigns</h1>
          <Link to="/campaigns/new">
            <Button className="gap-1.5"><Plus className="h-4 w-4" />Create Campaign</Button>
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Campaigns" className="pl-9 bg-secondary/40 border-border" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-primary/15 border border-primary/40 text-primary px-4 py-1.5 text-xs font-medium">
              <Calendar className="h-3.5 w-3.5" /> Mar 11 - Apr 9 ▾
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-1.5 text-xs text-muted-foreground">
              Status ▾
            </button>
            <button className="text-xs text-primary hover:underline">Clear Filters</button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 pr-4 font-medium">Campaign</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Last Updated</th>
                  <th className="py-3 px-4 font-medium">Total Calls</th>
                  <th className="py-3 px-4 font-medium">Progress</th>
                  <th className="py-3 px-4 font-medium">Pickup</th>
                  <th className="py-3 px-4 font-medium">Voicemail</th>
                  <th className="py-3 pl-4" />
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr key={i} className="border-t border-border hover:bg-secondary/30 transition">
                    <td className="py-4 pr-4 font-medium">{c.name}</td>
                    <td className="py-4 px-4"><StatusPill status={c.status} /></td>
                    <td className="py-4 px-4 text-muted-foreground">{c.date}</td>
                    <td className="py-4 px-4">{c.calls}</td>
                    <td className="py-4 px-4">{c.progress}%</td>
                    <td className="py-4 px-4">{c.pickup}%</td>
                    <td className="py-4 px-4">{c.voicemail}%</td>
                    <td className="py-4 pl-4 text-muted-foreground"><MoreVertical className="h-4 w-4" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
