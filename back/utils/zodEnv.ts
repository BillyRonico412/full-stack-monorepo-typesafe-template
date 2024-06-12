import { z } from "zod"
import dotenv from "dotenv"

dotenv.config()

export const zodEnv = z.object({
	DATABASE_URL: z.string(),
	PORT: z.string(),
	CLERK_PUBLISHABLE_KEY: z.string(),
	CLERK_SECRET_KEY: z.string(),
	UUID_ADMIN: z.string(),
})

export const env = zodEnv.parse(process.env)
