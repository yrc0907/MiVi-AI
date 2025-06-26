import { getQueryClient, trpc } from "@/components/trpc/server";
import { AgentView, AgentViewError, AgentViewLoading } from "@/modules/agents/ui/views/agent-view";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function AgentsPage() {
  const quertClinet = getQueryClient();
  await quertClinet.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(quertClinet)}>
      <Suspense fallback={<AgentViewLoading />}>
        <ErrorBoundary fallback={<AgentViewError />}>
          <AgentView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}