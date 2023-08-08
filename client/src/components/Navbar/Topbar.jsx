import React from "react";
import {
	AlignJustify,
	LogOut,
	PanelLeftOpen,
	PanelRightOpen,
	UserCircle2,
} from "lucide-react";
import { useStore } from "../../utils/store";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import MobileSidebar from "./MobileSidebar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Topbar = ({ showBasicLayout }) => {
	const { user, isAuth, isAdmin, logout, isSidebarOpen, toggleSidebar } =
		useStore();

	return (
		<header className="z-50 sticky top-0 w-full p-2 flex items-center justify-between border-b bg-white">
			{showBasicLayout ? (
				<Image
					width={300}
					height={300}
					className="w-10 h-10"
					src="/company-logo.png"
					alt="Company Logo"
				/>
			) : (
				<>
					<MobileSidebar
						className="block lg:hidden"
						TriggerBtn={
							<button>
								<AlignJustify />
							</button>
						}
					/>

					<button className="hidden lg:flex" onClick={toggleSidebar}>
						{isSidebarOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
					</button>
				</>
			)}

			<div className="flex gap-2">
				{isAuth && (
					<>
						{isAdmin && (
							<Button variant="outline" asChild>
								<Link href="/admin">Users</Link>
							</Button>
						)}

						<Popover>
							<PopoverTrigger asChild>
								<Button variant="ghost" className="px-2">
									<UserCircle2 className="w-8 h-8" />
								</Button>
							</PopoverTrigger>

							<PopoverContent side="bottom" align="end">
								<div className="grid gap-4">
									<div>
										<h5>{user?.name}</h5>
										<Link
											className="text-blue-800 hover:underline"
											href={`mailto:${user?.email}`}
										>
											{user?.email}
										</Link>
									</div>

									<Button
										variant="destructive"
										onClick={logout}
										className="space-x-1"
									>
										<LogOut size={18} />

										<span>Logout</span>
									</Button>
								</div>
							</PopoverContent>
						</Popover>
					</>
				)}

				{!isAuth && (
					<>
						<Button variant="success" asChild>
							<Link href="/auth/login">Login</Link>
						</Button>
					</>
				)}
			</div>
		</header>
	);
};

export default Topbar;
