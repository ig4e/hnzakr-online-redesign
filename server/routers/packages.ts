import { protectedProcedure, publicProcedure, router } from "@/server/trpc";
import { loginSchema } from "@/validations/login-schema";
import { TRPCError } from "@trpc/server";
import { signJwt } from "../utils/jwt";

export const packageRouter = router({
	getPackages: protectedProcedure.query(async ({ ctx }) => {
		const packages = await ctx.scraper.getPackages();

		return packages;
	}),
});
