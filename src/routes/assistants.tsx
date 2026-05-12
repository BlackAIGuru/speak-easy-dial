import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
export const Route = createFileRoute("/assistants")({
  component: () => <ComingSoon title="Assistants" description="Configure and deploy your AI calling agents." />,
  head: () => ({ meta: [{ title: "Assistants · Synthesys" }] }),
});

*** Add File: src/routes/voice-library.tsx
import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
export const Route = createFileRoute("/voice-library")({
  component: () => <ComingSoon title="Voice Library" description="Browse and manage AI voices for your agents." />,
  head: () => ({ meta: [{ title: "Voice Library · Synthesys" }] }),
});

*** Add File: src/routes/contacts.tsx
import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
export const Route = createFileRoute("/contacts")({
  component: () => <ComingSoon title="Contacts" description="Manage your contact lists and segments." />,
  head: () => ({ meta: [{ title: "Contacts · Synthesys" }] }),
});

*** Add File: src/routes/phone-numbers.tsx
import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
export const Route = createFileRoute("/phone-numbers")({
  component: () => <ComingSoon title="Phone Numbers" description="Provision and manage your Twilio phone numbers." />,
  head: () => ({ meta: [{ title: "Phone Numbers · Synthesys" }] }),
});

*** Add File: src/routes/knowledge-bases.tsx
import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
export const Route = createFileRoute("/knowledge-bases")({
  component: () => <ComingSoon title="Knowledge Bases" description="Train your assistants on your business knowledge." />,
  head: () => ({ meta: [{ title: "Knowledge Bases · Synthesys" }] }),
});

*** Add File: src/routes/integrations.tsx
import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
export const Route = createFileRoute("/integrations")({
  component: () => <ComingSoon title="Integrations" description="Connect Twilio, CRMs, webhooks, and more." />,
  head: () => ({ meta: [{ title: "Integrations · Synthesys" }] }),
});

*** Add File: src/routes/settings.tsx
import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
export const Route = createFileRoute("/settings")({
  component: () => <ComingSoon title="Settings" description="Workspace, billing, and account preferences." />,
  head: () => ({ meta: [{ title: "Settings · Synthesys" }] }),
});

*** Add File: src/components/dashboard/ComingSoon.tsx
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Sparkles } from "lucide-react";

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <DashboardLayout title={title}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>

        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-16 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/15 grid place-items-center">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <p className="mt-4 font-medium">Coming soon</p>
          <p className="mt-1 text-sm text-muted-foreground">
            This section is being wired up to the backend.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
