import React from "react";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/router";
import { useStore } from "../../utils/store";

const InwardPageLayout = ({ className }) => {
	const { pathname } = useRouter();
	const { permissions, isAdmin } = useStore();

	const inwardStoreStartPage = (
		(permissions || [])?.find((e) => e.includes("inward_store-create")) ||
		(permissions || [])?.find((e) => e.includes("inward_store"))
	)
		?.split("_")[1]
		?.split("-")[1];

	const inwardSecurityStartPage = (
		(permissions || [])?.find((e) =>
			e.includes("inward_security-create")
		) || (permissions || [])?.find((e) => e.includes("inward_security"))
	)
		?.split("_")[1]
		?.split("-")[1];

	const pages = [
		{
			key: "inward_store",
			name: "Store",
			baseUrl: "/inward/store",
			href: `/inward/store/${
				inwardStoreStartPage === "create"
					? ""
					: inwardStoreStartPage || ""
			}`,
		},
		{
			key: "inward_security",
			name: "Security",
			baseUrl: "/inward/security",
			href: `/inward/security/${
				inwardSecurityStartPage === "create"
					? ""
					: inwardSecurityStartPage || ""
			}`,
		},
	];

	return (
		<div className={cn("grid grid-cols-2 gap-2", className)}>
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

export default InwardPageLayout;
