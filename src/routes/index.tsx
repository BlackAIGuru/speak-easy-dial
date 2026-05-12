import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard · Synthesys" },
      { name: "description", content: "Insights on calls, costs, and agent efficiency." },
    ],
  }),
});

const callData = Array.from({ length: 22 }, (_, i) => ({
  date: `Mar ${10 + i}`,
  calls: Math.round(80 + Math.sin(i * 0.7) * 60 + Math.random() * 80),
  msgs: Math.round(20 + Math.cos(i * 0.5) * 15 + Math.random() * 20),
}));

const usageData = Array.from({ length: 30 }, (_, i) => ({
  d: i,
  v: Math.round(40 + Math.sin(i * 0.4) * 30 + Math.random() * 40),
}));

function Stat({
  label,
  value,
  delta,
  positive = true,
}: {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
}) {
  return (
    <div className="flex-1 px-6 py-5 border-r border-border last:border-r-0">
      <p className="text-sm text-muted-foreground text-center">{label}</p>
      <div className="mt-3 flex items-baseline justify-center gap-2">
        <span className="text-3xl font-semibold tracking-tight">{value}</span>
        <span className={`text-sm font-medium ${positive ? "text-success" : "text-destructive"}`}>
          {delta}
        </span>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">Welcome to Synthesys</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Insights on calls, costs, and agent efficiency.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-end px-4 pt-4">
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition">
              <Calendar className="h-3.5 w-3.5" />
              11 March 2026 - 09 April 2026
            </button>
          </div>
          <div className="flex flex-col md:flex-row">
            <Stat label="Number of Calls" value="4,775" delta="396.92%" />
            <Stat label="Number of Messages" value="0" delta="0%" positive={false} />
            <Stat label="Success Rate" value="0%" delta="0%" positive={false} />
            <Stat label="Average Duration" value="0m 23s" delta="82%" />
          </div>
          <div className="h-64 px-4 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={callData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 265)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "oklch(0.65 0.02 260)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.22 0.02 265)",
                    border: "1px solid oklch(0.28 0.02 265)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="calls"
                  stroke="var(--color-success)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="msgs"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Call Analysis</h2>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-xs">
                Outbound Assistant ▾
              </button>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Add Analytics
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium">Usage</p>
            <p className="text-xs text-muted-foreground">Minutes used</p>
            <div className="h-48 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData}>
                  <defs>
                    <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 265)" vertical={false} />
                  <XAxis dataKey="d" tick={{ fill: "oklch(0.65 0.02 260)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: "oklch(0.22 0.02 265)", border: "1px solid oklch(0.28 0.02 265)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={2} fill="url(#usageGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
