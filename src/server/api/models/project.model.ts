import { prisma } from "./../../db";
import { type ctxType } from "~/utils/types";
import {
  type DeleteProjectPayloadType,
  type CreateProjectPayloadType,
  type UpdateProjectPayloadType,
} from "../controllers/project.controller";
const projectModel = {
  getAllProjects: (ctx: ctxType) => ctx.prisma.project.findMany(),

  createProject: (input: CreateProjectPayloadType) =>
    prisma.project.create({
      data: {
        title: input.title,
        description: input.description,
      },
    }),

  deleteProject: async (input: DeleteProjectPayloadType) =>
    await prisma.project.delete({
      where: {
        id: input.id,
      },
    }),

  updateProject: (input: UpdateProjectPayloadType) =>
    prisma.project.update({
      where: {
        id: input.id,
      },
      data: {
        title: input.title,
        description: input.description,
      },
    }),
};

export default projectModel;
