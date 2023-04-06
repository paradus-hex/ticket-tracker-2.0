import { prisma } from "~/server/db";
import {
  type GetUserByIdPayloadType,
  type UserRoleUpdatePayloadType,
} from "../controllers/user.controller";
import { type ctxType } from "./../../../utils/types";

const userModel = {
  getAllUsers: (ctx: ctxType) => ctx.prisma.user.findMany(),

  updateRole: async (input: UserRoleUpdatePayloadType, ctx: ctxType) => {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: ctx.session!.user.id,
      },
      select: {
        role: true,
      },
    });

    // Check if the user is an admin
    if (currentUser?.role !== "ADMIN") {
      throw new Error("Unauthorized: Only admins can update user roles.");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: input.id,
      },
      data: {
        role: input.role,
      },
    });

    return updatedUser;
  },

  getUserById: (input: GetUserByIdPayloadType) =>
    prisma.user.findFirst({ where: { id: input.id } }),
};

export default userModel;
