import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
export const Route = createFileRoute("/settings")({
  component: () => <ComingSoon title="Settings" description="Workspace, billing, and account preferences." />,
  head: () => ({ meta: [{ title: "Settings · Synthesys" }] }),
});
