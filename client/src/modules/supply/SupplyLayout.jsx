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
		baseUrl: "/supply/store",
		href: "/supply/store",
	},
	{
		key: "supply_billing",
		name: "Billing",
		baseUrl: "/supply/billing",
		href: "/supply/billing",
	},
	{
		key: "supply_counter",
		name: "Counter",
		baseUrl: "/supply/counter",
		href: "/supply/counter",
	},
	{
		key: "supply_security",
		name: "Security",
		baseUrl: "/supply/security",
		href: "/supply/security/counter",
	},
];

const SupplyNavlinks = ({ className = "" }) => {
	const { pathname } = useRouter();
	const { permissions, isAdmin } = useStore();

	return (
		<div
			className={cn(
				"flex flex-wrap sm:grid grid-cols-4 gap-2",
				className
			)}
		>
			{pages.map(({ name, href, key, baseUrl }) => (
				<Button
					key={name}
					variant={pathname.includes(baseUrl) ? "" : "outline"}
					asChild
				>
					<Link
						className={cn(
							"text-center",
							!isAdmin &&
								!permissions.some((e) => e?.includes(key)) &&
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
