import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { useStore } from "../../utils/store";

const pages = [
	{
		key: "supply_store",
		name: "Store",
		href: "/supply/store",
	},
	{
		key: "billing",
		name: "Billing",
		href: "/supply/billing",
	},
	{
		key: "counter",
		name: "Counter",
		href: "/supply/counter",
	},
	{
		key: "supply_security",
		name: "Security",
		href: "/supply/security",
	},
];

const SupplyNavlinks = ({ className = "" }) => {
	const { pathname } = useRouter();
	const { roles } = useStore();

	return (
		<div
			className={cn(
				"flex flex-wrap sm:grid grid-cols-4 gap-2",
				className
			)}
		>
			{pages.map(({ name, href, key }) => (
				<Button
					key={name}
					variant={pathname === href ? "" : "outline"}
					disabled={roles?.includes(key)}
					asChild
				>
					<Link className="text-center" href={href}>
						{name}
					</Link>
				</Button>
			))}
		</div>
	);
};

export default SupplyNavlinks;
