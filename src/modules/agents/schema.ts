import { z } from "zod";

export const agentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export type Agent = z.infer<typeof agentSchema>;