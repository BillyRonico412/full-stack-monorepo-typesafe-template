import { GameCard } from "@/components/game/GameCard"
import { trpc } from "@/lib/trpc"
import { useAuth } from "@clerk/clerk-react"

export const GamesInAdmin = () => {
	const { isSignedIn } = useAuth()
	const gameQuery = trpc.get.useQuery()
	if (gameQuery.isPending) {
		return <div>Loading...</div>
	}
	if (gameQuery.error) {
		return <div>Error: {gameQuery.error.message}</div>
	}
	return (
		<div className="space-y-4">
			{gameQuery.data.map((game) => (
				<GameCard key={game.id} game={game} isAdmin={!!isSignedIn} />
			))}
		</div>
	)
}
