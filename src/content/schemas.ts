import { z } from "astro:content";

export const productSummarySchema = z.object({
	id: z.number(),
	name: z.string(),
	slug: z.string(),
	category: z.string(),
	categorySlug: z.string(),
	price: z.number(),
	offerPrice: z.number().optional(),
	image: z.string(),
	link: z.string(),
	rating: z.number(),
	onOffer: z.boolean(),
	discountPercentage: z.number().optional(),
	stock: z.number(),
	description: z.array(z.string()),
	longDescription: z.array(z.string()),
	type: z.enum(["supplement", "implement"]),
});

export type ProductCategory = {
	name: string;
	slug: string;
};

export type ProductSummary = z.infer<typeof productSummarySchema>;
