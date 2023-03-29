import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import projectsModel from "../models/projects.model";

export const projectController = createTRPCRouter({
  getAllProjects: protectedProcedure.query(({ ctx }) => {
    return projectsModel.getAllProjects(ctx);
  }),
});
