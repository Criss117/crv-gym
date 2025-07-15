import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/modules/core/components/ui/button";
import cartStore, {
	type CartItem,
} from "@/modules/shop/application/store/cart.store";
import { useStore } from "@nanostores/react";

interface Props {
	item: Omit<CartItem, "quantity">;
}

function AddButton({ item }: Props) {
	const $cartItems = useStore(cartStore.$cart);
	const [currentItem, setCurrentItem] = useState<CartItem | undefined | null>(
		$cartItems.find((i) => i.id === item.id),
	);
	const [quantity, setQuantity] = useState(currentItem?.quantity || 1);

	const plusQuantity = () => {
		setQuantity((prev) => {
			if (prev >= item.stock) {
				return prev;
			}
			return prev + 1;
		});
	};

	const minusQuantity = () => {
		setQuantity((prev) => {
			if (prev <= 1) {
				return prev;
			}
			return prev - 1;
		});
	};

	const addToCart = () => {
		const addedItem = cartStore.addItem({
			...item,
			quantity,
		});
		setCurrentItem(addedItem);
	};

	return (
		<div className="space-y-2">
			<div className="flex items-center gap-x-5">
				<p className="text-sm text-muted-foreground">Cantidad:</p>
				<Button
					variant="outline"
					size="icon"
					onClick={minusQuantity}
					disabled={quantity <= 1}
				>
					<Minus />
				</Button>
				<span className="w-5 text-center">{quantity}</span>
				<Button
					variant="outline"
					size="icon"
					onClick={plusQuantity}
					disabled={quantity >= item.stock}
				>
					<Plus />
				</Button>
			</div>

			<Button
				className="w-full font-semibold"
				onClick={addToCart}
				disabled={item.stock <= 0}
			>
				{currentItem ? "Modificar producto" : "Agregar al carrito"}
			</Button>
		</div>
	);
}

function AddButtonSkeleton() {
	return (
		<div className="space-y-2">
			<div className="flex items-center gap-x-5">
				<p className="text-sm text-muted-foreground">Cantidad:</p>
				<Button variant="outline" size="icon" disabled>
					<Minus />
				</Button>
				<span className="w-5 text-center">...</span>
				<Button variant="outline" size="icon" disabled>
					<Plus />
				</Button>
			</div>
			<Button className="w-full font-semibold" disabled>
				Agregar al carrito
			</Button>
		</div>
	);
}

export default {
	AddButton,
	AddButtonSkeleton,
};
