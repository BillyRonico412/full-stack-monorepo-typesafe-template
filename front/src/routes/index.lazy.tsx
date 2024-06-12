import { GameCard } from "@/components/game/GameCard"
import { trpc } from "@/lib/trpc"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/")({
	component: () => {
		const gameQuery = trpc.get.useQuery()
		if (gameQuery.isPending) {
			return <div>Loading...</div>
		}
		if (gameQuery.error) {
			return <div>Error: {gameQuery.error.message}</div>
		}
		return (
			<div className="space-y-4 mt-12">
				{gameQuery.data.map((game) => (
					<GameCard key={game.id} game={game} isAdmin={false} />
				))}
			</div>
		)
	},
})
