import { z } from "zod"

export const zodEnv = z.object({
	VITE_CLERK_PUBLISHABLE_KEY: z.string(),
	VITE_SERVER_URL: z.string(),
})

export const env = zodEnv.parse(import.meta.env)
