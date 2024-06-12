import { createClerkClient } from "@clerk/clerk-sdk-node"
import { TRPCError, initTRPC } from "@trpc/server"
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone"
import to from "await-to-js"
import { env } from "./utils/zodEnv"

export const createContext = async (opts: CreateHTTPContextOptions) => {
	if (!opts.req.headers.authorization) {
		return {
			userId: null,
		}
	}
	const clerkClient = createClerkClient({
		publishableKey: env.CLERK_PUBLISHABLE_KEY,
		secretKey: env.CLERK_SECRET_KEY,
	})
	const clientToken = opts.req.headers.authorization.replace("Bearer ", "")
	const [errVerifyToken, verifyToken] = await to(
		clerkClient.verifyToken(clientToken),
	)
	if (errVerifyToken) {
		console.error(errVerifyToken)
		return {
			userId: null,
		}
	}
	const [errSession, session] = await to(
		clerkClient.sessions.getSession(verifyToken.sid),
	)
	if (errSession) {
		console.error(errSession)
		return {
			userId: null,
		}
	}
	return {
		userId: session.userId,
	}
}

export type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const adminProcedure = publicProcedure.use((opts) => {
	if (opts.ctx.userId !== env.UUID_ADMIN) {
		throw new TRPCError({ code: "UNAUTHORIZED" })
	}
	return opts.next()
})
