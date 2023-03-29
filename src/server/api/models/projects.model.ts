import { type ctxType } from "~/utils/types";

const projectsModel = {
  getAllProjects: (ctx: ctxType) => {
    return ctx.prisma.project.findMany();
  },
};

export default projectsModel;
