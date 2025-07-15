import { file } from "astro/loaders";
import { defineCollection } from "astro:content";
import { productSummarySchema } from "./schemas";

const supplementsSummary = defineCollection({
	loader: file("src/content/data/supplements.json"),
	schema: productSummarySchema,
});

const implementsSummary = defineCollection({
	loader: file("src/content/data/implements.json"),
	schema: productSummarySchema,
});

export const collections = { supplementsSummary, implementsSummary };
