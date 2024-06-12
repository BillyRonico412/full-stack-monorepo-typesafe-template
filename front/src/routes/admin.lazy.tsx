import { GameAddButton } from "@/components/game/GameAddButton"
import { GamesInAdmin } from "@/components/game/GamesInAdmin"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
} from "@clerk/clerk-react"
import { createLazyFileRoute } from "@tanstack/react-router"
import { LogOut } from "lucide-react"

export const Route = createLazyFileRoute("/admin")({
	component: () => {
		return (
			<div className="py-8">
				<SignedOut>
					<Alert className="flex items-center">
						<AlertTitle>Sign in to access the admin panel</AlertTitle>
						<SignInButton>
							<Button className="ml-auto">SignIn</Button>
						</SignInButton>
					</Alert>
				</SignedOut>
				<SignedIn>
					<Alert className="flex items-center">
						<AlertTitle>Admin panel</AlertTitle>
						<div className="ml-auto space-x-4">
							<GameAddButton />
							<SignOutButton>
								<Button className="ml-auto">
									<LogOut size={16} className="mr-2" />
									Sign out
								</Button>
							</SignOutButton>
						</div>
					</Alert>
					<div className="mt-12">
						<GamesInAdmin />
					</div>
				</SignedIn>
			</div>
		)
	},
})
