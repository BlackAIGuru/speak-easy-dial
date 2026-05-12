import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Play, MoreVertical, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/call-recordings")({
  component: CallRecordings,
  head: () => ({ meta: [{ title: "Call Recordings · Synthesys" }] }),
});

const rows = [
  { phone: "+13478539121", time: "Apr 8, 2026, 2:11 PM", dur: "12s", status: "READY", outcome: "Customer ended the call" },
  { phone: "+12673192498", time: "Apr 8, 2026, 2:02 PM", dur: "29s", status: "READY", outcome: "voicemail" },
  { phone: "+13478539121", time: "Apr 8, 2026, 2:02 PM", dur: "8s", status: "READY", outcome: "Customer ended the call" },
  { phone: "+13478539121", time: "Apr 8, 2026, 1:43 PM", dur: "10s", status: "READY", outcome: "Customer ended the call" },
  { phone: "+14159850907", time: "Apr 8, 2026, 1:33 PM", dur: "11s", status: "READY", outcome: "Customer ended the call" },
  { phone: "+13106075836", time: "Apr 6, 2026, 5:55 PM", dur: "52s", status: "READY", outcome: "voicemail" },
  { phone: "+13472689470", time: "Apr 6, 2026, 5:55 PM", dur: "36s", status: "READY", outcome: "voicemail" },
];

function Waveform() {
  return (
    <div className="flex items-center gap-[2px] h-6">
      {Array.from({ length: 32 }).map((_, i) => (
        <span
          key={i}
          className="w-[2px] bg-muted-foreground/70 rounded-full"
          style={{ height: `${20 + Math.abs(Math.sin(i)) * 80}%` }}
        />
      ))}
    </div>
  );
}

function CallRecordings() {
  return (
    <DashboardLayout title="Call Recordings">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Call Recordings</h1>
            <p className="mt-1 text-sm text-muted-foreground">View logs for your Assistants.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-full border border-dashed border-border px-4 py-1.5 text-xs">All Calls ▾</button>
            <button className="rounded-full border border-dashed border-border px-4 py-1.5 text-xs">All Assistants ▾</button>
            <button className="rounded-full bg-primary/15 border border-primary/40 text-primary px-4 py-1.5 text-xs">Mar 11 - Apr 9 ▾</button>
            <button className="rounded-full border border-dashed border-border px-4 py-1.5 text-xs">Filters</button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-3 px-5 font-medium">Type</th>
                <th className="py-3 px-3 font-medium">Assistant</th>
                <th className="py-3 px-3 font-medium">Customer Phone</th>
                <th className="py-3 px-3 font-medium">Call Recording</th>
                <th className="py-3 px-3 font-medium">Start Time</th>
                <th className="py-3 px-3 font-medium">Duration</th>
                <th className="py-3 px-3 font-medium">Status</th>
                <th className="py-3 px-3 font-medium">Call Outcome</th>
                <th className="py-3 px-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-border hover:bg-secondary/30 transition">
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1.5 text-primary text-xs font-medium">
                      <ArrowUpRight className="h-3.5 w-3.5" /> Outbound
                    </span>
                  </td>
                  <td className="py-4 px-3 text-muted-foreground">Outbound Assistant</td>
                  <td className="py-4 px-3 font-mono text-xs">{r.phone}</td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <button className="h-7 w-7 rounded-full bg-primary/20 grid place-items-center text-primary hover:bg-primary/30">
                        <Play className="h-3.5 w-3.5 fill-current" />
                      </button>
                      <Waveform />
                    </div>
                  </td>
                  <td className="py-4 px-3 text-muted-foreground text-xs">{r.time}</td>
                  <td className="py-4 px-3">{r.dur}</td>
                  <td className="py-4 px-3">
                    <span className="inline-flex items-center rounded-md bg-success/15 text-success px-2 py-0.5 text-[10px] font-bold tracking-wider">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-muted-foreground text-xs">{r.outcome}</td>
                  <td className="py-4 px-3 text-muted-foreground"><MoreVertical className="h-4 w-4" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
