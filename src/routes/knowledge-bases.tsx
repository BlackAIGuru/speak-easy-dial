import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
export const Route = createFileRoute("/knowledge-bases")({
  component: () => <ComingSoon title="Knowledge Bases" description="Train your assistants on your business knowledge." />,
  head: () => ({ meta: [{ title: "Knowledge Bases · Synthesys" }] }),
});
