import { projectController } from "./controllers/projects.controller";
import { createTRPCRouter } from "~/server/api/trpc";
import { exampleController } from "~/server/api/controllers/example";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleController,
  projects: projectController,
});

// export type definition of API
export type AppRouter = typeof appRouter;
