import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
export const Route = createFileRoute("/assistants")({
  component: () => <ComingSoon title="Assistants" description="Configure and deploy your AI calling agents." />,
  head: () => ({ meta: [{ title: "Assistants · Synthesys" }] }),
});
