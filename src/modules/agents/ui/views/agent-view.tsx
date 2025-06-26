'use client'
import { ErrorState } from "@/components/common/error-state";
import { LoadingState } from "@/components/common/loading-state";
// import { ErrorState } from "@/components/common/error-state";
// import { LoadingState } from "@/components/common/loading-state";
import { trpc } from "@/components/trpc/client";

// export const AgentView = () => {
//   const trpc = useTRPC();
//   const data = useQuery(trpc.agents.getMany.queryOptions());
//   if (data.isLoading) return <LoadingState title="Loading agents..." description="Please wait while we load the agents." />
//   if (data.isError) return <ErrorState title="Error loading agents" description="Please try again later." />
//   return <div>
//     {data.data?.map((agent) => (
//       <div key={agent.id}>{agent.name}</div>
//     ))}
//   </div>
// }

export const AgentView = () => {
  const [data] = trpc.agents.getMany.useSuspenseQuery();
  return <div>
    {data.map((agent) => (
      <div key={agent.id}>{agent.name}</div>
    ))}
  </div>
}


export const AgentViewLoading = () => {
  return (
    <LoadingState title="Loading agents..." description="Please wait while we load the agents." />
  )
}

export const AgentViewError = () => {
  return (
    <ErrorState title="Error loading agents" description="Please try again later." />
  )
}