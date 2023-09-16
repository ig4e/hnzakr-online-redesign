import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@/server";
import { createTRPCContext } from "@/server/trpc";

export default createNextApiHandler({
	router: appRouter,
	createContext: createTRPCContext,
});
