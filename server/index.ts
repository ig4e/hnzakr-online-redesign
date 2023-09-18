import { router } from "@/server/trpc";
import { userRouter } from "./routers/user";
import { packageRouter } from "./routers/package";
import { subjectRouter } from "./routers/subject";
import { lessonRouter } from "./routers/lesson";

export const appRouter = router({
	user: userRouter,
	package: packageRouter,
	subject: subjectRouter,
	lesson: lessonRouter
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
export const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
