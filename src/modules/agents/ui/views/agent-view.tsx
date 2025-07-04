'use client'
import { ErrorState } from "@/components/common/error-state";
import { LoadingState } from "@/components/common/loading-state";
// import { ErrorState } from "@/components/common/error-state";
// import { LoadingState } from "@/components/common/loading-state";
import { trpc } from "@/components/trpc/client";
import { Bot, MoreHorizontal, Pencil, Trash2, Video, Loader2, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { agents } from "@/db/schema";
import { ModifyAgentDialog } from "../components/modify-agent-dialog";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDebounce } from 'use-debounce';

type Agent = Omit<typeof agents.$inferSelect, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

const AgentCard = ({ agent, onModify, onDelete, isDeleting }: { agent: Agent, onModify: () => void, onDelete: () => void, isDeleting: boolean }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between hover:border-gray-300 transition-colors duration-200">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{agent.name}</p>
          <p className="text-sm text-gray-500">{agent.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600 font-medium">6 meetings</span>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setIsDropdownOpen(prev => !prev)} className="p-2 rounded-full hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Agent options" disabled={isDeleting}>
            {isDeleting ? <Loader2 className="w-5 h-5 text-gray-500 animate-spin" /> : <MoreHorizontal className="w-5 h-5 text-gray-500" />}
          </button>
          {isDropdownOpen && !isDeleting && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 border">
              <ul>
                <li>
                  <button onClick={() => { onModify(); setIsDropdownOpen(false); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Pencil className="w-4 h-4" />
                    Modify
                  </button>
                </li>
                <li>
                  <button onClick={() => { onDelete(); setIsDropdownOpen(false); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const AgentList = ({ search }: { search: string }) => {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setPage(1);
  }, [search]);

  const { data, isLoading, isFetching, error } = trpc.agents.getMany.useQuery(
    { page, pageSize, search },
    { placeholderData: (previousData) => previousData }
  );

  const utils = trpc.useUtils();

  const [modifyingAgent, setModifyingAgent] = useState<Agent | null>(null);
  const [deletingAgent, setDeletingAgent] = useState<Agent | null>(null);

  const deleteAgentMutation = trpc.agents.delete.useMutation({
    onSuccess: () => {
      toast.success("Agent deleted successfully.");
      utils.agents.getMany.invalidate();
    },
    onError: (error) => {
      toast.error(`Failed to delete agent: ${error.message}`);
      console.error("Failed to delete agent:", error);
    },
    onSettled: () => {
      setDeletingAgent(null);
    }
  });

  const handleDelete = () => {
    if (deletingAgent) {
      deleteAgentMutation.mutate({ id: deletingAgent.id });
    }
  };

  if (isLoading || !data) {
    return <AgentViewLoading />;
  }

  if (error) {
    return <ErrorState title="Error loading agents" description={error.message} />;
  }

  const { agents, pagination } = data;

  return (
    <div className="space-y-4">
      <div className="min-h-[340px] relative">
        {isFetching && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        )}
        {agents.length > 0 ? (
          agents.map((agent: Agent) => (
            <div key={agent.id} className="mb-4">
              <AgentCard
                agent={agent}
                onModify={() => setModifyingAgent(agent)}
                onDelete={() => setDeletingAgent(agent)}
                isDeleting={deleteAgentMutation.isPending && deleteAgentMutation.variables?.id === agent.id}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No agents found.</p>
          </div>
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-6">
          <div>
            <p className="text-sm text-gray-700">
              Page <span className="font-medium">{pagination.currentPage}</span> of <span className="font-medium">{pagination.totalPages}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={pagination.currentPage === 1 || isFetching}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
              disabled={pagination.currentPage === pagination.totalPages || isFetching}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {modifyingAgent && (
        <ModifyAgentDialog
          agent={modifyingAgent}
          isOpen={!!modifyingAgent}
          onClose={() => setModifyingAgent(null)}
        />
      )}

      <AlertDialog open={!!deletingAgent} onOpenChange={(open) => !open && setDeletingAgent(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the agent
              &quot;{deletingAgent?.name}&quot; and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteAgentMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export const AgentView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search agents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition"
        />
      </div>
      <AgentList search={debouncedQuery} />
    </div>
  )
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