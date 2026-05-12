import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
export const Route = createFileRoute("/phone-numbers")({
  component: () => <ComingSoon title="Phone Numbers" description="Provision and manage your Twilio phone numbers." />,
  head: () => ({ meta: [{ title: "Phone Numbers · Synthesys" }] }),
});
