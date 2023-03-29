import { type ctxType } from "./../../../utils/types";

const userModel = {
  getAllUser: (ctx: ctxType) => {
    return ctx.prisma.user.findMany();
  },
};

export default userModel;
