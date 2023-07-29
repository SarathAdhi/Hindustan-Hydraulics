import React from "react";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/router";

const pages = [
	{
		name: "Store",
		href: "/inward/store",
	},
	{
		name: "Security",
		href: "/inward/security",
	},
];

const InwardPageLayout = ({ className, children }) => {
	const { pathname } = useRouter();

	return (
		<div className={cn("grid grid-cols-2 gap-2", className)}>
			{pages.map(({ name, href }) => (
				<Button
					key={name}
					variant={pathname === href ? "" : "outline"}
					asChild
				>
					<Link key={name} className="text-center" href={href}>
						{name}
					</Link>
				</Button>
			))}
		</div>
	);
};

export default InwardPageLayout;
