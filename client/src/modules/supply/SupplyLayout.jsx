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
		key: "supply_billing",
		name: "Billing",
		href: "/supply/billing",
	},
	{
		key: "supply_counter",
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
	const { roles, isAdmin } = useStore();

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
					asChild
				>
					<Link
						className={cn(
							"text-center",
							!isAdmin &&
								!roles?.includes(key) &&
								"pointer-events-none opacity-70 !cursor-not-allowed"
						)}
						href={href}
					>
						{name}
					</Link>
				</Button>
			))}
		</div>
	);
};

export default SupplyNavlinks;
