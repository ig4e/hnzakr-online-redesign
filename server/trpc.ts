import { TRPCError, initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { Scraper } from "./lib";
import superjson from "superjson";
import { ZodError } from "zod";
import { signJwt, verifyJwt } from "./utils/jwt";
import { BaseScraperOptions } from "./lib/base";

type CreateContextOptions = {
	scraper: Scraper;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
	return {
		scraper: opts.scraper,
	};
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
	const { req, res } = opts;
	const token = (req.headers.authorization ?? "").replace("Bearer ", "");

	let tokenPayload: BaseScraperOptions | undefined;

	try {
		tokenPayload = verifyJwt<BaseScraperOptions>(token);
	} catch {}

	const scraper = new Scraper({
		namehnzakr: tokenPayload?.namehnzakr ?? "NOT_SET",
		password: tokenPayload?.password ?? "NOT_SET",
		cookie: tokenPayload?.cookie ?? "",
	});

	return createInnerTRPCContext({ scraper: scraper });
};

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

const isAuthed = t.middleware((opts) => {
	const { ctx } = opts;

	if (ctx.scraper.namehnzakr === "NOT_SET") {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	return opts.next({
		ctx: {
			scraper: ctx.scraper,
		},
	});
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
