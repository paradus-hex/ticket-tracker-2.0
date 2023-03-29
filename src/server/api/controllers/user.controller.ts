import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import userModel from "../models/user.model";

export const userController = createTRPCRouter({
  getAllUsers: protectedProcedure.query(({ ctx }) =>
    userModel.getAllUsers(ctx)
  ),
});
