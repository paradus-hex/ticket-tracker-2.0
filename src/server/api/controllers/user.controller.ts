import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { z } from "zod";
import { prisma } from "~/server/db";
import userModel from "../models/user.model";

const userRoleUpdatePayloadSchema = z.object({
  id: z.string(),
  role: z.enum(["ADMIN", "USER"]),
});

export type UserRoleUpdatePayloadType = z.infer<
  typeof userRoleUpdatePayloadSchema
>;

export const userController = createTRPCRouter({
  getAllUsers: protectedProcedure.query(({ ctx }) =>
    userModel.getAllUsers(ctx)
  ),
  updateRole: protectedProcedure
    .input(userRoleUpdatePayloadSchema)
    .mutation(async ({ input, ctx }) => {
      // Fetch the user's role from the database
      const currentUser = await prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          role: true,
        },
      });

      // Check if the user is an admin
      if (currentUser?.role !== "ADMIN") {
        throw new Error("Unauthorized: Only admins can update user roles.");
      }

      // Update the user role
      const updatedUser = await prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          role: input.role,
        },
      });

      return updatedUser;
    }),
  getUserById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => prisma.user.findFirst({ where: { id: input.id } })),
});
