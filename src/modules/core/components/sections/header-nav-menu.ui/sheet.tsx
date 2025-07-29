import type { ProductCategory } from "@/content/schemas";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/modules/core/components/ui/sheet";
import { Dumbbell, HeartPlus, Home, Menu, Store } from "lucide-react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../ui/accordion";

interface CategoriesProps {
	values: ProductCategory[];
}

interface RootProps {
	supplementCategories: CategoriesProps["values"];
	implementsCategories: CategoriesProps["values"];
}

function Root({ supplementCategories, implementsCategories }: RootProps) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Bienvenido</SheetTitle>
					<SheetDescription />
				</SheetHeader>

				<div className="space-y-5">
					<Button variant="link" className="w-full">
						<a
							href="/"
							className="flex items-center justify-start w-full gap-x-6"
						>
							<Home className="size-6" />{" "}
							<span className="text-xl font-semibold">Inicio</span>
						</a>
					</Button>
					<Button variant="link" className="w-full">
						<a
							href="/shop"
							className="flex items-center justify-start w-full gap-x-6"
						>
							<Store className="size-6" />{" "}
							<span className="text-xl font-semibold">Tienda</span>
						</a>
					</Button>
					<Button variant="link" className="w-full">
						<a
							href="/shop/supplements"
							className="flex items-center justify-start w-full gap-x-6"
						>
							<HeartPlus className="size-6" />{" "}
							<span className="text-xl font-semibold">
								Todos los suplementos
							</span>
						</a>
					</Button>
					<Button variant="link" className="w-full">
						<a
							href="/shop/implements"
							className="flex items-center justify-start w-full gap-x-6"
						>
							<Dumbbell className="size-6" />{" "}
							<span className="text-xl font-semibold">
								Todos los implementos
							</span>
						</a>
					</Button>
				</div>
				<div>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1" className="px-6">
							<AccordionTrigger>
								<span className="text-xs font-semibold">
									Categorías de suplementos
								</span>
							</AccordionTrigger>
							<AccordionContent>
								{supplementCategories.map((category) => (
									<div key={category.slug}>
										<Button variant="link" className="w-full">
											<a
												href={`/shop/supplements/categories/${category.slug}`}
												className="flex items-center justify-start w-full gap-x-6"
											>
												<span className="text-sm font-semibold">
													{category.name}
												</span>
											</a>
										</Button>
									</div>
								))}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2" className="px-6">
							<AccordionTrigger>
								<span className="text-xs font-semibold">
									Categorías de implementos
								</span>
							</AccordionTrigger>
							<AccordionContent>
								{implementsCategories.map((category) => (
									<div key={category.slug}>
										<Button variant="link" className="w-full">
											<a
												href={`/shop/implements/categories/${category.slug}`}
												className="flex items-center justify-start w-full gap-x-6"
											>
												<span className="text-sm font-semibold">
													{category.name}
												</span>
											</a>
										</Button>
									</div>
								))}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</SheetContent>
		</Sheet>
	);
}

export default {
	Root,
};
