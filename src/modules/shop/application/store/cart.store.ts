import { persistentAtom } from "@nanostores/persistent";

export interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	slug: string;
	category?: string;
	stock: number;
	image: string;
	type: "supplement" | "implement";
}

const $cart = persistentAtom<CartItem[]>("cr-shop-storage", [], {
	encode: JSON.stringify,
	decode: JSON.parse,
});

function addItem(item: CartItem) {
	if (item.stock <= 0) {
		return;
	}

	const existingItem = $cart.get().find((i) => i.id === item.id);

	if (existingItem) {
		$cart.set([...$cart.get().filter((i) => i.id !== item.id), item]);
	} else {
		$cart.set([...$cart.get(), item]);
	}

	return item;
}

function getItem(id: CartItem["id"]) {
	const item = $cart.get().find((i) => i.id === id);

	if (!item) {
		return null;
	}

	return item;
}

function deleteItem(id: CartItem["id"]) {
	$cart.set($cart.get().filter((item) => item.id !== id));
}

function changeItemQuantity(id: CartItem["id"], quantity: number) {
	if (quantity <= 0) {
		deleteItem(id);
		return;
	}

	$cart.set([
		...$cart
			.get()
			.map((item) =>
				item.id === id
					? { ...item, quantity: quantity > item.stock ? item.stock : quantity }
					: item,
			),
	]);
}

export default {
	$cart,
	addItem,
	getItem,
	deleteItem,
	changeItemQuantity,
};
