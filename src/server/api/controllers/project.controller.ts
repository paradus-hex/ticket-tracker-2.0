import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import projectModel from "../models/project.model";
import { z } from "zod";

const createProjectPayloadSchema = z.object({
  title: z.string().max(100),
  description: z.string(),
});
export type CreateProjectPayloadType = z.infer<
  typeof createProjectPayloadSchema
>;

export const projectController = createTRPCRouter({
  getAllProjects: protectedProcedure.query(({ ctx }) =>
    projectModel.getAllProjects(ctx)
  ),
  createProject: protectedProcedure
    .input(createProjectPayloadSchema)
    .mutation(({ input, ctx }) => projectModel.createProject(input)),
});
