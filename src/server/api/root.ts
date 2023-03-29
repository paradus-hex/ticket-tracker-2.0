import { userController } from "./controllers/user.controller";
import { projectController } from "./controllers/project.controller";
import { createTRPCRouter } from "~/server/api/trpc";
import { exampleController } from "~/server/api/controllers/example";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleController,
  project: projectController,
  user: userController,
});

// export type definition of API
export type AppRouter = typeof appRouter;
