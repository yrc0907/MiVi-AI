"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { agentSchema, type Agent } from "@/modules/agents/schema"
import { trpc } from "@/components/trpc/client"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface CreateAgentDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function CreateAgentDialog({
  isOpen,
  onClose,
  onSuccess,
}: CreateAgentDialogProps) {
  const form = useForm<Agent>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const createAgentMutation = trpc.agents.create.useMutation({
    onSuccess: (data) => {
      toast.success(`Agent "${data.name}" created successfully.`);
      form.reset()
      onSuccess?.()
      onClose()
    },
    onError: (error) => {
      toast.error(`Failed to create agent: ${error.message}`);
      console.error(error)
    },
  })

  async function onSubmit(data: Agent) {
    createAgentMutation.mutate(data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Agent name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what this agent does"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                type="button"
                disabled={createAgentMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createAgentMutation.isPending}>
                {createAgentMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {createAgentMutation.isPending ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 