import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/campaigns/new")({
  component: CreateCampaign,
  head: () => ({
    meta: [{ title: "Create Campaign · Synthesys" }],
  }),
});

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 py-6 border-b border-border last:border-b-0">
      <div>
        <p className="font-semibold">{label}</p>
        {hint && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function CreateCampaign() {
  const nav = useNavigate();
  const [agreed, setAgreed] = useState(false);
  return (
    <DashboardLayout title="Create Campaign" breadcrumb="Campaigns / New">
      <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Create Campaign</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure your campaign settings and upload your contact list.
        </p>

        <div className="mt-2">
          <Field label="Campaign Name" hint="Give this campaign a name for internal organization">
            <Input placeholder="Campaign Name" className="bg-input/60 border-border" />
          </Field>

          <Field label="Phone Number" hint="Select the phone number to use for this campaign">
            <select className="w-full rounded-md border border-border bg-input/60 px-3 py-2 text-sm">
              <option>Select Phone Number</option>
              <option>+1 909 936 1879</option>
            </select>
          </Field>

          <Field
            label="Upload CSV"
            hint="Upload your contact list as a CSV file (max 5MB). Your CSV must include a 'name' column and a 'phone' column, with one contact per row."
          >
            <label className="block cursor-pointer rounded-xl border-2 border-dashed border-primary/50 bg-primary/5 hover:bg-primary/10 transition p-10 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/15 grid place-items-center">
                <UploadCloud className="h-6 w-6 text-primary" />
              </div>
              <p className="mt-3 text-sm">
                <span className="text-primary font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="mt-1 text-xs text-muted-foreground">CSV files only (max. 5 MB)</p>
              <input type="file" accept=".csv" className="hidden" />
            </label>
          </Field>

          <Field label="Assistant" hint="Select the AI assistant to use for this campaign">
            <select className="w-full rounded-md border border-border bg-input/60 px-3 py-2 text-sm">
              <option>Select Assistant</option>
              <option>Outbound Assistant</option>
            </select>
          </Field>

          <Field label="Schedule" hint="Choose when to launch this campaign">
            <select className="w-full rounded-md border border-border bg-input/60 px-3 py-2 text-sm">
              <option>Send Now</option>
              <option>Schedule for later</option>
            </select>
          </Field>
        </div>

        <label className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 accent-primary"
          />
          <span>
            By Launching this Campaign, I acknowledge and agree to the{" "}
            <a className="text-primary hover:underline">Terms and Conditions</a>
          </span>
        </label>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => nav({ to: "/campaigns" })}>Cancel</Button>
          <Button disabled={!agreed}>Launch Campaign</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
