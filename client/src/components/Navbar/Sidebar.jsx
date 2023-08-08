import Image from "next/image";
import React from "react";
import { useStore } from "../../utils/store";
import { Label } from "../ui/label";
import Link from "next/link";
import { LogIn, ShoppingCart } from "lucide-react";
import { cn } from "../../lib/utils";
import { useRouter } from "next/router";

const Sidebar = ({
	className = "hidden lg:flex w-60 flex-shrink-0 flex-col gap-4 min-h-screen bg-white border-r",
}) => {
	const { pathname } = useRouter();

	const { isSidebarOpen, permissions, isAdmin } = useStore();

	const inwardData = (permissions || [])
		?.find((e) => e.includes("inward_"))
		?.split("_")[1]
		?.split("-");

	const inwardStoreCreate = (permissions || [])
		?.find((e) => e.includes("inward_store-create"))
		?.split("_")[1]
		?.split("-")[1];

	const inwardForm = Array.isArray(inwardData)
		? inwardData[0]
		: inwardData || "";

	const inwardFormAction =
		inwardData && !inwardStoreCreate ? inwardData[1] : "";

	const supplyData = permissions
		?.find((e) => e.includes("supply_"))
		?.split("_")[1]
		?.split("-");

	const supplyStoreCreate = (permissions || [])
		?.find((e) => e.includes("inward_store-create"))
		?.split("_")[1]
		?.split("-")[1];

	const supplyForm = Array.isArray(supplyData)
		? supplyData[0]
		: supplyData || "";

	const supplyFormAction =
		supplyData && !supplyStoreCreate ? supplyData[1] : "";

	const pages = [
		{
			title: "Dashboard",
			items: [
				{
					name: "Inward",
					Icon: LogIn,
					href: "/inward",
					disabled: !isAdmin,
				},
				{
					name: "Supply",
					Icon: ShoppingCart,
					href: "/supply",
					disabled: !isAdmin,
				},
			],
		},
		{
			title: "Forms",
			items: [
				{
					name: "Inward",
					Icon: LogIn,
					parentRoute: "/inward/",
					href: `/inward/${
						isAdmin
							? "store"
							: `${inwardForm}/${inwardFormAction || ""}`
					}`,
					disabled: !inwardForm && !isAdmin,
				},
				{
					name: "Supply",
					Icon: ShoppingCart,
					parentRoute: "/supply/",
					href: `/supply/${
						isAdmin
							? "store"
							: `${supplyForm}/${supplyFormAction || ""}`
					}`,
					disabled: !supplyForm && !isAdmin,
				},
			],
		},
	];

	if (!isSidebarOpen) return <></>;

	return (
		<aside className={cn("sticky top-0", className)}>
			<div className="pd">
				<Image
					width={300}
					height={300}
					className="w-10 h-10"
					src="/company-logo.png"
					alt="Company Logo"
				/>
			</div>

			<div className="space-y-4">
				{pages.map(({ title, items }) => (
					<div key={title} className="space-y-2">
						<Label className="ml-4">{title}</Label>

						<div className="grid gap-0.5">
							{items.map(
								({
									name,
									Icon,
									href,
									parentRoute,
									disabled,
								}) => (
									<Link
										key={name}
										className={cn(
											"hover:bg-[#ee657e] hover:text-white p-2 pl-6 flex items-center gap-2 text-base duration-200 transition-all",
											(parentRoute
												? pathname.includes(parentRoute)
												: pathname === href) &&
												"bg-[#ee657e] text-white border-r-4 border-r-[#9d2d42]",
											disabled &&
												"pointer-events-none opacity-70 !cursor-not-allowed"
										)}
										href={href}
									>
										<Icon size={18} />

										<span>{name}</span>
									</Link>
								)
							)}
						</div>
					</div>
				))}
			</div>
		</aside>
	);
};

export default Sidebar;
