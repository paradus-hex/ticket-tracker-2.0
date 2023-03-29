import { type ctxType } from "~/utils/types";

const projectModel = {
  getAllProjects: (ctx: ctxType) => ctx.prisma.project.findMany(),
};

export default projectModel;
