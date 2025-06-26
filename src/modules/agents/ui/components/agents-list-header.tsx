"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { CreateAgentDialog } from "./create-agent-dialog";

export const AgentsListHeader = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium">My Agents</h5>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Agent
        </Button>
      </div>

      <CreateAgentDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={() => window.location.reload()}
      />
    </div>
  );
};