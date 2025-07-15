import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@components/ui/breadcrumb";

interface RootProps {
	children: React.ReactNode;
}

interface LinkProps {
	hideSeparator?: boolean;
}

function Root({ children }: RootProps) {
	return (
		<Breadcrumb>
			<BreadcrumbList>{children}</BreadcrumbList>
		</Breadcrumb>
	);
}

function Home({ hideSeparator = false }: LinkProps) {
	return (
		<>
			<BreadcrumbItem>
				<BreadcrumbLink href="/">Inicio</BreadcrumbLink>
			</BreadcrumbItem>
			{!hideSeparator && <BreadcrumbSeparator />}
		</>
	);
}

function Shop({ hideSeparator = false }: LinkProps) {
	return (
		<>
			<BreadcrumbItem>
				<BreadcrumbLink href="/shop">Tienda</BreadcrumbLink>
			</BreadcrumbItem>
			{!hideSeparator && <BreadcrumbSeparator />}
		</>
	);
}

function Supplements({ hideSeparator = false }: LinkProps) {
	return (
		<>
			<BreadcrumbItem>
				<BreadcrumbLink href="/shop/supplements">Suplementos</BreadcrumbLink>
			</BreadcrumbItem>
			{!hideSeparator && <BreadcrumbSeparator />}
		</>
	);
}

function Implements({ hideSeparator = false }: LinkProps) {
	return (
		<>
			<BreadcrumbItem>
				<BreadcrumbLink href="/shop/implements">Implementos</BreadcrumbLink>
			</BreadcrumbItem>
			{!hideSeparator && <BreadcrumbSeparator />}
		</>
	);
}

function Link({
	hideSeparator = false,
	href,
	label,
}: LinkProps & { href: string; label: string }) {
	return (
		<>
			<BreadcrumbItem>
				<BreadcrumbLink href={href}>{label}</BreadcrumbLink>
			</BreadcrumbItem>
			{!hideSeparator && <BreadcrumbSeparator />}
		</>
	);
}

function Page({
	label,
	withSeparator = false,
}: { label: string; withSeparator?: boolean }) {
	return (
		<>
			<BreadcrumbItem>
				<BreadcrumbPage>{label}</BreadcrumbPage>
			</BreadcrumbItem>
			{withSeparator && <BreadcrumbSeparator />}
		</>
	);
}

export default {
	Root,
	Home,
	Shop,
	Supplements,
	Implements,
	Link,
	Page,
};
