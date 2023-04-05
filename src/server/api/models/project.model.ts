import { prisma } from "./../../db";
import { type ctxType } from "~/utils/types";

const projectModel = {
  getAllProjects: (ctx: ctxType) => ctx.prisma.project.findMany(),
  createProject: (input: { title: string; description: string }) =>
    prisma.project.create({
      data: {
        title: input.title,
        description: input.description,
      },
    }),
};

export default projectModel;
