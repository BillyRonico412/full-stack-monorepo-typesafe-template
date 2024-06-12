import { RouterProvider, createRouter } from "@tanstack/react-router"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

// Import the generated route tree
import { routeTree } from "./routeTree.gen"
import { ClerkProvider } from "@clerk/clerk-react"
import { CookiesProvider } from "react-cookie"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key")
}

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

const documentElement = window.document.documentElement
documentElement.classList.add("dark")

const rootElement = document.getElementById("root") as HTMLElement
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<StrictMode>
			<CookiesProvider defaultSetOptions={{ path: "/" }}>
				<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
					<RouterProvider router={router} />
				</ClerkProvider>
			</CookiesProvider>
		</StrictMode>,
	)
}
