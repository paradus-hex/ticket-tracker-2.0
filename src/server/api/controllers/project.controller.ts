import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import projectModel from "../models/project.model";

export const projectController = createTRPCRouter({
  getAllProjects: protectedProcedure.query(({ ctx }) =>
    projectModel.getAllProjects(ctx)
  ),
});
