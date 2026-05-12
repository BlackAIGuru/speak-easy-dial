import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
export const Route = createFileRoute("/contacts")({
  component: () => <ComingSoon title="Contacts" description="Manage your contact lists and segments." />,
  head: () => ({ meta: [{ title: "Contacts · Synthesys" }] }),
});
