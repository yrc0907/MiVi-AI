import { createTRPCRouter, protectedProcedure } from "@/components/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentSchema } from "../schema";
import { count, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const agentUpdateSchema = agentSchema.partial().extend({
  id: z.string(),
});

export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const { page, pageSize } = input;
      const userId = ctx.session.user.id;

      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      const whereCondition = eq(agents.userId, userId);

      const [totalCountResult] = await db
        .select({ count: count() })
        .from(agents)
        .where(whereCondition);

      const totalCount = totalCountResult.count;
      const totalPages = Math.ceil(totalCount / pageSize);

      const data = await db
        .select()
        .from(agents)
        .where(whereCondition)
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      return {
        agents: data,
        pagination: {
          currentPage: page,
          pageSize,
          totalPages,
          totalCount,
        },
      };
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
  update: protectedProcedure
    .input(agentUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...dataToUpdate } = input;
      const userId = ctx.session.user.id;

      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, id));

      if (!existingAgent) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (existingAgent.userId !== userId) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await db.update(agents).set(dataToUpdate).where(eq(agents.id, id));

      const [updatedAgent] = await db.select().from(agents).where(eq(agents.id, id));

      return updatedAgent;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      const userId = ctx.session.user.id;

      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, id));

      if (!existingAgent) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (existingAgent.userId !== userId) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await db.delete(agents).where(eq(agents.id, id));

      return { success: true, id };
    }),
});