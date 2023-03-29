import { type ctxType } from "./../../../utils/types";

const userModel = {
  getAllUsers: (ctx: ctxType) => ctx.prisma.user.findMany(),
};

export default userModel;
