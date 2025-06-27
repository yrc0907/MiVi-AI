'use client';

import { useEffect, useState } from 'react';
import type { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@/components/trpc/client';
import type { agents } from '@/db/schema';
import { agentSchema } from '../../schema';
import { Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

type Agent = Omit<typeof agents.$inferSelect, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

type ModifyAgentFormValues = z.infer<typeof agentSchema>;

interface ModifyAgentDialogProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

export function ModifyAgentDialog({ agent, isOpen, onClose }: ModifyAgentDialogProps) {
  const [isMounted, setIsMounted] = useState(false);
  const utils = trpc.useUtils();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ModifyAgentFormValues>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: agent.name,
      description: agent.description,
    }
  });

  useEffect(() => {
    setIsMounted(true);
    reset({
      name: agent.name,
      description: agent.description,
    });
  }, [agent, reset]);

  const updateAgentMutation = trpc.agents.update.useMutation({
    onSuccess: (data) => {
      toast.success(`Agent "${data.name}" updated successfully.`);
      utils.agents.getMany.invalidate();
      onClose();
    },
    onError: (error) => {
      toast.error(`Failed to update agent: ${error.message}`);
      console.error('Failed to update agent:', error);
    }
  });

  const onSubmit = (data: ModifyAgentFormValues) => {
    updateAgentMutation.mutate({ id: agent.id, ...data });
  };

  if (!isOpen || !isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className='flex items-center justify-between'>
          <h2 className="text-xl font-semibold text-gray-900">Modify your agent</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close">
            <X className='w-5 h-5 text-gray-500' />
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-1 mb-4">Update the details for your agent.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Agent name"
              {...register('name')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              rows={3}
              placeholder="Describe what this agent does"
              {...register('description')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={updateAgentMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateAgentMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 flex items-center"
            >
              {updateAgentMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {updateAgentMutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 