import React from "react";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/router";
import { useStore } from "../../utils/store";

const InwardEditLinks = ({ className, inwardInfo = {} }) => {
	const { pathname } = useRouter();
	const { roles, isAdmin } = useStore();

	const pages = [
		{
			key: "inward_store",
			name: "Store",
			href: `/inward/store/edit?doc_no=${inwardInfo?.doc_no}`,
		},
		{
			key: "inward_security",
			name: "Security",
			href: `/inward/security/edit?doc_no=${inwardInfo?.doc_no}`,
		},
	];

	return (
		<div className={cn("grid grid-cols-2 gap-2", className)}>
			{pages.map(({ name, href, key }) => (
				<Button key={name} asChild>
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

export default InwardEditLinks;
