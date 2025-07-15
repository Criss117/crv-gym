import { getCollection } from "astro:content";
import { slugify } from "./utils";

type GetImplementsOptions = {
	omitForCategory?: string[];
	omitForSlug?: string[];
};

type GetImplementsByCategory = {
	omitForSlug?: string[];
};

async function getImplements(options?: GetImplementsOptions) {
	const data = (await getCollection("implementsSummary")).map((d) => d.data);
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

async function getImplement(slug: string) {
	const data = await getImplements();
	return data.find((d) => d.slug === slug);
}

async function getImplementsByCategory(
	category: string,
	options?: GetImplementsByCategory,
) {
	const data = await getImplements();

	if (options?.omitForSlug) {
		const omitForSlug = options.omitForSlug;

		return data.filter(
			(d) => d.category === category && !omitForSlug.includes(d.slug),
		);
	}

	return data.filter((d) => d.category === category);
}

async function getImplementCategories() {
	const data = await getImplements();
	const dataSet = new Set(data.map((d) => d.category));

	return Array.from(dataSet).map((d) => ({
		name: d,
		slug: slugify(d),
	}));
}

async function getOnOfferImplements() {
	const data = await getImplements();
	return data.filter((d) => d.onOffer);
}

export default {
	getImplements,
	getImplement,
	getImplementsByCategory,
	getImplementCategories,
	getOnOfferImplements,
};
