import { createTRPCRouter, protectedProcedure } from "@/components/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentSchema } from "../schema";


export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async ({ }) => {
    const data = await db.select().from(agents);

    return data;
  }),
  create: protectedProcedure.input(agentSchema).mutation(async ({ input, ctx }) => {
    const data = await db.insert(agents).values({
      ...input,
      userId: ctx.session?.user.id as string
    });
    return data;
  }),
});