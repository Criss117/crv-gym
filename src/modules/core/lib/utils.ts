import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);
}

export function slugify(text: string) {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, "-") // Espacios a guiones
		.replace(/[^\w\-]+/g, "") // Eliminar caracteres no palabra
		.replace(/\-\-+/g, "-") // Guiones múltiples a uno
		.replace(/^-+/, "") // Quitar guiones del inicio
		.replace(/-+$/, ""); // Quitar guiones del final
}
