import { protectedProcedure, publicProcedure, router } from "@/server/trpc";
import { loginSchema } from "@/validations/login-schema";
import { TRPCError } from "@trpc/server";
import { signJwt } from "../utils/jwt";

export const userRouter = router({
	login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
		ctx.scraper.namehnzakr = input.username;
		ctx.scraper.password = input.password;
		return await ctx.scraper
			.getCookie()
			.catch(() => {
				throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid credentials" });
			})
			.then(async (cookie) => {
				return {
					token: signJwt({
						namehnzakr: input.username,
						password: input.password,
						cookie: cookie,
					}),
					cookie: cookie,
				};
			});
	}),

	getUser: protectedProcedure.query(async ({ ctx }) => {
		const user = await ctx.scraper.getUser();

		return user;
	}),
});
