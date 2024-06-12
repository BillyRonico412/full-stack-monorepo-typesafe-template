import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { trpc, type RouterOutputs } from "@/lib/trpc"
import { Progress } from "@radix-ui/react-progress"
import { StarIcon, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface GameCardProps {
	game: RouterOutputs["get"][number]
	isAdmin: boolean
}

export const GameCard = (props: GameCardProps) => {
	const gameQuery = trpc.get.useQuery()
	const gameDeleteMutation = trpc.delete.useMutation({
		onError: (error) => {
			toast.error(error.message)
		},
		onSuccess: () => {
			toast.success("Game deleted")
			gameQuery.refetch()
		},
	})
	const onClickDelete = () => {
		gameDeleteMutation.mutate({
			id: props.game.id,
		})
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle>{props.game.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center">
					<div>{props.game.description}</div>
					<div className="w-32 ml-auto flex flex-col gap-y-1 items-center">
						<div className="flex items-center gap-x-2 text-xs">
							{props.game.rating} / 5 <StarIcon size={16} />
						</div>
						<Progress value={(props.game.rating / 5) * 100} max={100} />
					</div>
				</div>
				{props.isAdmin && (
					<Button
						className="mt-4"
						onClick={onClickDelete}
						disabled={gameDeleteMutation.isPending}
						variant="destructive"
					>
						<Trash2 size={16} className="mr-2" />
						Delete
					</Button>
				)}
			</CardContent>
		</Card>
	)
}
