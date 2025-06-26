"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/components/trpc/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { agentSchema, type Agent } from "@/modules/agents/schema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

interface NewAgentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewAgentDialog({ isOpen, onClose }: NewAgentDialogProps) {
  const trpc = useTRPC();
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Agent>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Agent created successfully",
        });
        reset();
        onClose();
        router.refresh();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to create agent",
          variant: "destructive",
        });
      },
    });
  
  )

  const onSubmit = (data: Agent) => {
    createAgent.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Agent</DialogTitle>
          <div className="text-sm text-muted-foreground">
            Create a new agent
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter agent name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Enter agent instructions"
                className="min-h-[100px]"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={createAgent.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createAgent.isPending}>
              {createAgent.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 