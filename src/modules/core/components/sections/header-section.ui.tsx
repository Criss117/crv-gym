import { useState } from "react";
import { Minus, Plus, Search, ShoppingCart, Trash2 } from "lucide-react";
import { useStore } from "@nanostores/react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import cartStore from "@/modules/shop/application/store/cart.store";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Card } from "../ui/card";
import { formatCurrency } from "@lib/utils";

function SearchBar() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className="relative w-full">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
			<Input
				type="text"
				placeholder="Buscar productos..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="pl-10 pr-4 py-2 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
			/>
		</div>
	);
}

function CartSkeleton() {
	return (
		<Button
			variant="outline"
			size="sm"
			className="relative hover:bg-orange-50 hover:border-orange-300 transition-colors"
		>
			<ShoppingCart className="h-4 w-4" />
			<Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
				...
			</Badge>
		</Button>
	);
}

function Cart() {
	const $cartItems = useStore(cartStore.$cart);
	const itemsLength = $cartItems.length;

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="relative hover:bg-orange-50 hover:border-orange-300 transition-colors"
				>
					<ShoppingCart className="h-4 w-4" />
					<Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
						{Object.values($cartItems).length}
					</Badge>
				</Button>
			</SheetTrigger>

			<SheetContent>
				<SheetHeader>
					<SheetTitle>Listado de productos</SheetTitle>
					<SheetDescription>
						{itemsLength} {itemsLength > 1 ? "productos" : "producto"} en tu
						carrito
					</SheetDescription>
				</SheetHeader>

				<ul className="px-2 space-y-2">
					{itemsLength > 0 ? (
						$cartItems.map((item) => (
							<Card key={item.id} className="px-2">
								<div className="flex gap-3">
									<div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
										<img
											src={item.image}
											alt={item.name}
											className="w-full h-full object-cover"
										/>
									</div>

									<div className="flex-1 min-w-0">
										<h3 className="text-sm font-semibold truncate cursor-pointer">
											<a href={`/shop/${item.slug}`}>{item.name}</a>
										</h3>
										<p className="text-xs mb-2">{item.category}</p>

										<div className="flex items-center justify-between">
											<div className="flex items-center gap-x-2">
												<Button
													variant="outline"
													size="icon"
													onClick={() =>
														cartStore.changeItemQuantity(
															item.id,
															item.quantity - 1,
														)
													}
												>
													<Minus className="h-3 w-3" />
												</Button>
												<span>{item.quantity}</span>
												<Button
													variant="outline"
													size="icon"
													onClick={() =>
														cartStore.changeItemQuantity(
															item.id,
															item.quantity + 1,
														)
													}
												>
													<Plus className="h-3 w-3" />
												</Button>
											</div>

											<Button
												variant="destructive"
												size="icon"
												onClick={() => cartStore.deleteItem(item.id)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>

										<div className="mt-2 text-right flex flex-col">
											<span className="text-sm font-bold">
												{formatCurrency(item.price * item.quantity)}
											</span>
											<span className="text-xs">
												{formatCurrency(item.price)} c/u
											</span>
										</div>
									</div>
								</div>
							</Card>
						))
					) : (
						<li>No hay productos en tu carrito</li>
					)}
				</ul>
			</SheetContent>
		</Sheet>
	);
}

export default {
	SearchBar,
	Cart,
	CartSkeleton,
};
