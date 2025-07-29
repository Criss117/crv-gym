import type { ProductCategory } from "@/content/schemas";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/modules/core/components/ui/navigation-menu";

interface CategoriesProps {
	values: ProductCategory[];
}
interface RootProps {
	supplementCategories: CategoriesProps["values"];
	implementsCategories: CategoriesProps["values"];
}

function Root({ supplementCategories, implementsCategories }: RootProps) {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<SupplementCategories values={supplementCategories} />
				<ImplementsCategories values={implementsCategories} />
				<Offer />
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function Offer() {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger>Productos en oferta</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid grid-cols-2 w-xl gap-x-2">
					<li className="">
						<NavigationMenuLink asChild>
							<a
								className="flex h-full w-full flex-col justify-end rounded-md p-6 no-underline outline-hidden select-none focus:shadow-md"
								href="/shop/supplements/on-offer"
							>
								<div className="mt-4 mb-2 text-lg font-semibold">
									Suplementos
								</div>
								<p className="text-muted-foreground text-sm leading-tight">
									Ver todos los suplementos en oferta.
								</p>
							</a>
						</NavigationMenuLink>
					</li>
					<li className="">
						<NavigationMenuLink asChild>
							<a
								className="flex h-full w-full flex-col justify-end rounded-md p-6 no-underline outline-hidden select-none focus:shadow-md"
								href="/shop/implements/on-offer"
							>
								<div className="mt-4 mb-2 text-lg font-semibold">
									Implementos
								</div>
								<p className="text-muted-foreground text-sm leading-tight">
									Ver todos los implements en oferta.
								</p>
							</a>
						</NavigationMenuLink>
					</li>
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);
}

function SupplementCategories({ values }: CategoriesProps) {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger>Categorías de suplementos</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid grid-cols-4 grid-rows-6 w-3xl">
					<li className="row-span-full">
						<NavigationMenuLink asChild>
							<a
								className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
								href="/shop/supplements"
							>
								<div className="mt-4 mb-2 text-lg font-semibold">CR-GYM</div>
								<p className="text-muted-foreground text-sm leading-tight">
									Ver todos los suplementos.
								</p>
							</a>
						</NavigationMenuLink>
					</li>
					{values.map((value) => (
						<li key={value.slug}>
							<NavigationMenuLink asChild>
								<a href={`/shop/supplements/categories/${value.slug}`}>
									<div className="text-sm leading-none font-medium">
										{value.name}
									</div>
								</a>
							</NavigationMenuLink>
						</li>
					))}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);
}

function ImplementsCategories({ values }: CategoriesProps) {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger>Categorías de implementos</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid grid-cols-4 grid-rows-6 w-3xl">
					<li className="row-span-full">
						<NavigationMenuLink asChild>
							<a
								className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
								href="/shop/implements"
							>
								<div className="mt-4 mb-2 text-lg font-semibold">CR-GYM</div>
								<p className="text-muted-foreground text-sm leading-tight">
									Ver todos los implementos.
								</p>
							</a>
						</NavigationMenuLink>
					</li>
					{values.map((value) => (
						<li key={value.slug}>
							<NavigationMenuLink asChild>
								<a href={`/shop/implements/categories/${value.slug}`}>
									<div className="text-sm leading-none font-medium">
										{value.name}
									</div>
								</a>
							</NavigationMenuLink>
						</li>
					))}
				</ul>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);
}

export default {
	Root,
	SupplementCategories,
	Offer,
	ImplementsCategories,
};
