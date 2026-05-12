import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
export const Route = createFileRoute("/integrations")({
  component: () => <ComingSoon title="Integrations" description="Connect Twilio, CRMs, webhooks, and more." />,
  head: () => ({ meta: [{ title: "Integrations · Synthesys" }] }),
});
