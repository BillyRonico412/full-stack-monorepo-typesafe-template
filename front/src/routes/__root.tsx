import { trpc } from "@/lib/trpc"
import { env } from "@/lib/zodEnv"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Link, Outlet, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { httpBatchLink } from "@trpc/client"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { Toaster } from "sonner"

export const Route = createRootRoute({
	component: () => {
		const [cookies] = useCookies(["__session"])
		const [queryClient] = useState(() => new QueryClient())
		const [trpcClient] = useState(() =>
			trpc.createClient({
				links: [
					httpBatchLink({
						url: env.VITE_SERVER_URL,
						headers: {
							Authorization: `Bearer ${cookies.__session}`,
						},
					}),
				],
			}),
		)
		return (
			<>
				<trpc.Provider client={trpcClient} queryClient={queryClient}>
					<QueryClientProvider client={queryClient}>
						<div className="container py-4 flex gap-x-4">
							<Link to="/" className="[&.active]:font-bold">
								Home
							</Link>
							<Link to="/admin" className="[&.active]:font-bold">
								Admin
							</Link>
						</div>
						<hr />
						<div className="container">
							<Outlet />
						</div>
					</QueryClientProvider>
				</trpc.Provider>
				<TanStackRouterDevtools />
				<Toaster />
			</>
		)
	},
})
