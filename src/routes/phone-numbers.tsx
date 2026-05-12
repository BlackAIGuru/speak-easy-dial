import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Phone, Plus, Search, MoreHorizontal, Globe, ShieldCheck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/phone-numbers")({
  component: PhoneNumbers,
  head: () => ({ meta: [{ title: "Phone Numbers · Castwave" }] }),
});

const numbers = [
  { id: 1, number: "+1 (909) 936-1879", label: "Main Outbound", country: "US", type: "Local", status: "Active", capabilities: ["Voice", "SMS"], assistant: "Outbound Sales", monthly: "$1.15" },
  { id: 2, number: "+1 (415) 555-2210", label: "California Campaigns", country: "US", type: "Local", status: "Active", capabilities: ["Voice"], assistant: "Survey Bot", monthly: "$1.15" },
  { id: 3, number: "+44 20 7946 0123", label: "UK Operations", country: "GB", type: "National", status: "Pending", capabilities: ["Voice", "SMS"], assistant: "—", monthly: "$2.00" },
  { id: 4, number: "+1 (800) 555-0134", label: "Toll-Free Support", country: "US", type: "Toll-Free", status: "Active", capabilities: ["Voice", "SMS"], assistant: "Support Agent", monthly: "$2.50" },
  { id: 5, number: "+1 (212) 555-9988", label: "NYC Outreach", country: "US", type: "Local", status: "Suspended", capabilities: ["Voice"], assistant: "—", monthly: "$1.15" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-success/15 text-success border-success/30",
    Pending: "bg-warning/15 text-warning border-warning/30",
    Suspended: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium ${map[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {status}
    </span>
  );
}

function PhoneNumbers() {
  const [q, setQ] = useState("");
  const filtered = numbers.filter((n) =>
    (n.number + n.label + n.assistant).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <DashboardLayout title="Phone Numbers">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Phone Numbers</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Provision and manage Twilio numbers used for outbound campaigns.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Buy Number
          </Button>
        </div>

        {/* KPI cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Active Numbers", value: "3", icon: Phone, accent: "text-success" },
            { label: "Countries", value: "2", icon: Globe, accent: "text-primary" },
            { label: "Verified Caller IDs", value: "5 / 5", icon: ShieldCheck, accent: "text-warning" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                  <p className="mt-1 text-2xl font-semibold">{s.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${s.accent}`} />
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between gap-3 p-4 border-b border-border">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search numbers..."
                className="pl-9 bg-input/60 border-border"
              />
            </div>
            <select className="rounded-md border border-border bg-input/60 px-3 py-2 text-sm">
              <option>All statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Suspended</option>
            </select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capabilities</TableHead>
                <TableHead>Linked Assistant</TableHead>
                <TableHead>Monthly</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((n) => (
                <TableRow key={n.id}>
                  <TableCell className="font-mono text-sm">{n.number}</TableCell>
                  <TableCell>{n.label}</TableCell>
                  <TableCell>{n.country}</TableCell>
                  <TableCell>{n.type}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {n.capabilities.map((c) => (
                        <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{n.assistant}</TableCell>
                  <TableCell>{n.monthly}</TableCell>
                  <TableCell><StatusBadge status={n.status} /></TableCell>
                  <TableCell>
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
