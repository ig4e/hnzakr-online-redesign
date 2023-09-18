import { protectedProcedure, router } from "@/server/trpc";
import { z } from "zod";

export const subjectRouter = router({
	getPackContents: protectedProcedure
		.input(z.object({ id: z.number().positive(), packageId: z.number().positive(), purchId: z.number().positive() }))
		.query(async ({ input, ctx }) => {
			const subjects = await ctx.scraper.getSubjectPackContents({
				id: input.id,
				packageId: input.packageId,
				purchId: input.purchId,
			});

			return subjects;
		}),

	getLessons: protectedProcedure
		.input(z.object({ id: z.number().positive(), packageId: z.number().positive(), purchId: z.number().positive() }))
		.query(async ({ input, ctx }) => {
			const lessons = await ctx.scraper.getSubjectLessons({ id: input.id, packageId: input.packageId, purchId: input.purchId });

			return lessons;
		}),
});
