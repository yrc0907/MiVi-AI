import { createTRPCRouter, protectedProcedure } from "@/components/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentSchema } from "../schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";


export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async ({ }) => {
    const data = await db.select().from(agents);

    return data;
  }),
  create: protectedProcedure
    .input(agentSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(ctx.session.user.id);
      if (!ctx.session.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      try {
        const newAgentId = crypto.randomUUID();
        await db.insert(agents).values({
          id: newAgentId,
          ...input,
          userId: ctx.session.user.id,
        });

        const [data] = await db
          .select()
          .from(agents)
          .where(eq(agents.id, newAgentId));

        if (!data) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to retrieve the agent after creation.",
          });
        }

        return data;
      } catch (error) {
        console.error("Failed to create agent:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred on the server.",
          cause: error,
        });
      }
    }),
});