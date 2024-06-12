import { PrismaClient } from "@prisma/client"
import { createHTTPServer } from "@trpc/server/adapters/standalone"
import to from "await-to-js"
import cors from "cors"
import { z } from "zod"
import { createContext, adminProcedure, publicProcedure, router } from "./trpc"
import { env } from "./utils/zodEnv"

const prisma = new PrismaClient()

const appRouter = router({
	get: publicProcedure.query(async () => {
		const [errGame, game] = await to(prisma.game.findMany())
		if (errGame) {
			throw errGame
		}
		return game
	}),
	add: adminProcedure
		.input(
			z.object({
				name: z.string(),
				description: z.string(),
				price: z.number(),
				rating: z.number().min(1).max(5),
			}),
		)
		.mutation(async (opts) => {
			const [errAddGame, game] = await to(
				prisma.game.create({ data: opts.input }),
			)
			if (errAddGame) {
				throw errAddGame
			}
			return game
		}),
	delete: adminProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async (opts) => {
			const [errDeleteGame] = await to(
				prisma.game.delete({ where: { id: opts.input.id } }),
			)
			if (errDeleteGame) {
				throw errDeleteGame
			}
			return true
		}),
})

const server = createHTTPServer({
	router: appRouter,
	middleware: cors(),
	createContext,
})

server.listen(env.PORT, () => {
	console.log(`Server started at http://localhost:${env.PORT}`)
})

export type AppRouter = typeof appRouter
