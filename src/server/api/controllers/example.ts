import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import userModel from "../models/user.model";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAllUsers: publicProcedure.query(({ ctx }) => {
    return userModel.getAllUser(ctx);
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret messages!";
  }),
});
