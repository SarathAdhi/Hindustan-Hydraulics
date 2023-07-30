import React from "react";
import {
	AlignJustify,
	LogOut,
	PanelLeftOpen,
	PanelRightOpen,
} from "lucide-react";
import { useStore } from "../../utils/store";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import MobileSidebar from "./MobileSidebar";

const Topbar = ({ showBasicLayout }) => {
	const { isAuth, logout, isSidebarOpen, toggleSidebar } = useStore();

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
						<Button
							variant="destructive"
							onClick={logout}
							className="space-x-1"
						>
							<LogOut size={18} />

							<span>Logout</span>
						</Button>
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
