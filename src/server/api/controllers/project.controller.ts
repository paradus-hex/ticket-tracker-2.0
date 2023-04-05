import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import projectModel from "../models/project.model";
import { z } from "zod";

export const projectController = createTRPCRouter({
  getAllProjects: protectedProcedure.query(({ ctx }) =>
    projectModel.getAllProjects(ctx)
  ),
  createProject: protectedProcedure
    .input(z.object({ title: z.string().max(100), description: z.string() }))
    .mutation(({ input, ctx }) => projectModel.createProject(input)),
});
