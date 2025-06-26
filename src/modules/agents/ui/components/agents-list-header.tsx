"use client"
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { NewAgentDialog } from "./new-agent-dialog";

export const AgentsListHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium">My Agents</h5>
        <Button onClick={() => setIsOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Agent
        </Button>
      </div>
      <NewAgentDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};