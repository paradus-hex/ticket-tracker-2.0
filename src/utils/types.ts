import { type Prisma, type PrismaClient } from "@prisma/client";
import { type Session } from "next-auth";

export type ctxType = {
  session: Session | null;
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
};
