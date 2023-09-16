import { router } from "@/server/trpc";
import { userRouter } from "./routers/user";

export const appRouter = router({
	user: userRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
export const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
