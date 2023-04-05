import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import projectModel from "../models/project.model";
import { z } from "zod";
import { prisma } from "~/server/db";

const createProjectPayloadSchema = z.object({
  title: z.string().max(100),
  description: z.string(),
});

const updateProjectPayloadSchema = z.object({
  id: z.string(),
  title: z.string().max(100),
  description: z.string(),
});

export type CreateProjectPayloadType = z.infer<
  typeof createProjectPayloadSchema
>;

export type UpdateProjectPayloadType = z.infer<
  typeof updateProjectPayloadSchema
>;

export const projectController = createTRPCRouter({
  getAllProjects: protectedProcedure.query(({ ctx }) =>
    projectModel.getAllProjects(ctx)
  ),
  createProject: protectedProcedure
    .input(createProjectPayloadSchema)
    .mutation(({ input }) => projectModel.createProject(input)),
  deleteProject: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(
      async ({ input }) =>
        await prisma.project.delete({
          where: {
            id: input.id,
          },
        })
    ),
  updateProject: protectedProcedure
    .input(updateProjectPayloadSchema)
    .mutation(({ input }) =>
      prisma.project.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
        },
      })
    ),
});
