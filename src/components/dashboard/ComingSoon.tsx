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
          <p className="mt-1 text-sm text-muted-foreground">This section is being wired up to the backend.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
