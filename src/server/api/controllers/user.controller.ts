import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { z } from "zod";
import userModel from "../models/user.model";

const userRoleUpdatePayloadSchema = z.object({
  id: z.string(),
  role: z.enum(["ADMIN", "USER"]),
});

const getUserByIdPayloadSchema = z.object({ id: z.string() });

export type GetUserByIdPayloadType = z.infer<typeof getUserByIdPayloadSchema>;

export type UserRoleUpdatePayloadType = z.infer<
  typeof userRoleUpdatePayloadSchema
>;

export const userController = createTRPCRouter({
  getAllUsers: protectedProcedure.query(({ ctx }) =>
    userModel.getAllUsers(ctx)
  ),
  updateRole: protectedProcedure
    .input(userRoleUpdatePayloadSchema)
    .mutation(async ({ input, ctx }) => userModel.updateRole(input, ctx)),
  getUserById: protectedProcedure
    .input(getUserByIdPayloadSchema)
    .query(({ input }) => userModel.getUserById(input)),
});
