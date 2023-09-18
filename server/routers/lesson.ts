import { protectedProcedure, router } from "@/server/trpc";
import { z } from "zod";

export const lessonRouter = router({
	getLesson: protectedProcedure
		.input(z.object({ id: z.number().positive(), packageId: z.number().positive(), purchId: z.number().positive() }))
		.query(async ({ input, ctx }) => {
			const lesson = await ctx.scraper.getLesson({ id: input.id, packageId: input.packageId, purchId: input.purchId });

			return lesson;
		}),
});
