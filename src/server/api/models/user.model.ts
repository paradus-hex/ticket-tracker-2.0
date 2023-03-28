import { type Prisma, type PrismaClient } from "@prisma/client";
import { type Session } from "next-auth";

const userModel = {
  getAllUser: (ctx: {
    session: Session | null;
    prisma: PrismaClient<
      Prisma.PrismaClientOptions,
      never,
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >;
  }) => {
    return ctx.prisma.user.findMany();
  },
};

export default userModel;
