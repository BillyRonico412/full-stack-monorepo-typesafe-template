import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { trpc } from "@/lib/trpc"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters",
	}),
	description: z.string().min(2, {
		message: "Description must be at least 2 characters",
	}),
	price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
		message: "Price must be a number",
	}),
	rating: z
		.string()
		.regex(/^\d$/, {
			message: "Rating must be a number",
		})
		.refine(
			(value) => {
				const rating = Number(value)
				return rating >= 1 && rating <= 5
			},
			{
				message: "Rating must be between 1 and 5",
			},
		),
})

export const GameAddButton = () => {
	const gameQuery = trpc.get.useQuery()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			price: "0",
			rating: "1",
		},
	})
	const [dialogOpen, setDialogOpen] = useState(false)
	const gameAddMutation = trpc.add.useMutation({
		onSuccess() {
			toast.success("Game added")
			setDialogOpen(false)
			form.reset()
			gameQuery.refetch()
		},
	})
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		gameAddMutation.mutate({
			...values,
			price: Number(values.price),
			rating: Number(values.rating),
		})
	}
	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild={true}>
				<Button className="ml-auto">
					<PlusCircle size={16} className="mr-2" />
					Add
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add game</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder="Description" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="rating"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rating</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder="Rating" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="1" className="flex items-center">
													Bad
												</SelectItem>
												<SelectItem value="2" className="flex items-center">
													Poor
												</SelectItem>
												<SelectItem value="3" className="flex items-center">
													Ok
												</SelectItem>
												<SelectItem value="4" className="flex items-center">
													Good
												</SelectItem>
												<SelectItem value="5" className="flex items-center">
													Excellent
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled={gameAddMutation.isPending} type="submit">
							Submit
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
