import React from "react";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/router";
import { useStore } from "../../utils/store";

const pages = [
	{
		key: "inward_store",
		name: "Store",
		href: "/inward/store",
	},
	{
		key: "inward_security",
		name: "Security",
		href: "/inward/security",
	},
];

const InwardPageLayout = ({ className }) => {
	const { pathname } = useRouter();
	const { roles, isAdmin } = useStore();

	return (
		<div className={cn("grid grid-cols-2 gap-2", className)}>
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

export default InwardPageLayout;
