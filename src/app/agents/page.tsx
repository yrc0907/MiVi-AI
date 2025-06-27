import { getQueryClient, trpc } from "@/components/trpc/server";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { AgentView, AgentViewError, AgentViewLoading } from "@/modules/agents/ui/views/agent-view";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const dynamic = 'force-dynamic';

export default async function AgentsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({ page: 1, pageSize: 5 }));
  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentViewLoading />}>
          <ErrorBoundary fallback={<AgentViewError />}>
            <AgentView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}