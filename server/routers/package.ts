import { protectedProcedure, router } from "@/server/trpc";
import { z } from "zod";

export const packageRouter = router({
	getPackages: protectedProcedure.query(async ({ ctx }) => {
		const packages = await ctx.scraper.getPackages();

		return packages;
	}),

	getSubjects: protectedProcedure
		.input(z.object({ id: z.number().positive(), purchId: z.number().positive() }))
		.query(async ({ input, ctx }) => {
			const subjects = await ctx.scraper.getPackageSubjects({ id: input.id, purchId: input.purchId });

			return subjects;
		}),
});
