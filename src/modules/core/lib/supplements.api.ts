import { getCollection } from "astro:content";
import { slugify } from "./utils";

type GetSupplementsOptions = {
	omitForCategory?: string[];
	omitForSlug?: string[];
};

type GetSupplementsByCategory = {
	omitForSlug?: string[];
};

async function getSupplements(options?: GetSupplementsOptions) {
	const data = (await getCollection("supplementsSummary")).map((d) => d.data);
	if (!options) return data;

	if (options && !options.omitForCategory && !options.omitForSlug) {
		throw new Error("You must provide at least one option");
	}

	const omitForCategory = options.omitForCategory || [];
	const omitForSlug = options.omitForSlug || [];

	return data
		.filter((d) => !omitForSlug.includes(d.slug))
		.filter((d) => !omitForCategory.includes(d.category));
}

async function getSupplement(slug: string) {
	const data = await getSupplements();
	return data.find((d) => d.slug === slug);
}

async function getSupplementsByCategory(
	category: string,
	options?: GetSupplementsByCategory,
) {
	const data = await getSupplements();

	if (options?.omitForSlug) {
		const omitForSlug = options.omitForSlug;

		return data.filter(
			(d) => d.category === category && !omitForSlug.includes(d.slug),
		);
	}

	return data.filter((d) => d.category === category);
}

async function getSupplementCategories() {
	const data = await getSupplements();
	const dataSet = new Set(data.map((d) => d.category));

	return Array.from(dataSet).map((d) => ({
		name: d,
		slug: slugify(d),
	}));
}

async function getOnOfferSupplements() {
	const data = await getSupplements();
	return data.filter((d) => d.onOffer);
}

export default {
	getSupplements,
	getSupplement,
	getSupplementsByCategory,
	getSupplementCategories,
	getOnOfferSupplements,
};
