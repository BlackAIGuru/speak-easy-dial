import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
export const Route = createFileRoute("/voice-library")({
  component: () => <ComingSoon title="Voice Library" description="Browse and manage AI voices for your agents." />,
  head: () => ({ meta: [{ title: "Voice Library · Synthesys" }] }),
});
