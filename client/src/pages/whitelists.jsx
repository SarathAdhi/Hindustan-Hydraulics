import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import axios from "../lib/axios";
import { withAuth } from "../hoc/withAuth";
import { Button } from "../components/ui/button";
import { DataTable } from "../components/DataTable";
import { TrashIcon } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../components/ui/popover";
import { Close } from "@radix-ui/react-popover";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";

const WhiteListsPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isActivated, setIsActivated] = useState(true);
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");
	const [ipAddress, setIpAddress] = useState("");
	const [isModalOpen, setIsModalOpen] = useState("");

	async function getBlockingState() {
		try {
			const data = await axios.get("/whitelist/blockingstate");
			setIsActivated(data);
		} catch (error) {}
	}

	async function fetchWhiteLists() {
		setIsLoading(true);

		const res = await axios.get("/whitelist");

		await getBlockingState();

		setIsLoading(false);
		setUsers(res);
	}

	useEffect(() => {
		fetchWhiteLists();
	}, []);

	async function deleteIp(ip) {
		try {
			await axios.delete(`/whitelist/delete?ip=${ip}`);

			fetchWhiteLists();
		} catch (error) {}
	}

	async function activateBlocking() {
		try {
			await axios.post("/whitelist/activate");
			getBlockingState();
		} catch (error) {}
	}

	async function deactivateBlocking() {
		try {
			await axios.post("/whitelist/deactivate");
			getBlockingState();
		} catch (error) {}
	}

	const columns = [
		{
			accessorKey: "ip",
			header: () => <span>IP</span>,
		},
		{
			accessorKey: "action",
			size: 20,
			header: () => <span></span>,
			cell: ({ row }) => {
				const ip = row.original.ip;

				return (
					<Popover>
						<PopoverTrigger asChild>
							<button>
								<TrashIcon size={20} className="text-red-700" />
							</button>
						</PopoverTrigger>

						<PopoverContent side="bottom" align="start">
							<div className="grid gap-2">
								<h6>
									Are you sure you want to delete this IP{" "}
									{`(${ip})`}?
								</h6>

								<div className="grid grid-cols-2 gap-2">
									<button
										onClick={() => deleteIp(ip)}
										className="py-1 px-4 bg-red-700 text-white rounded-md"
									>
										Delete
									</button>

									<Close asChild>
										<button className="py-1 px-4 bg-gray-300 rounded-md">
											Cancel
										</button>
									</Close>
								</div>
							</div>
						</PopoverContent>
					</Popover>
				);
			},
		},
	];

	const filteredUsers = users?.filter((e) =>
		JSON.stringify(e).toLowerCase().includes(search.toLowerCase())
	);

	return (
		<PageLayout title="Admin Dashboard" className="space-y-4">
			<div className="flex items-center justify-between">
				<input
					className="bg-white w-72 border border-black rounded-full px-4 py-2 focus:outline-none"
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<div className="space-x-2">
					<Button
						variant="outline"
						className="bg-white "
						onClick={() => setIsModalOpen(true)}
					>
						Add
					</Button>

					{!isLoading && (
						<Button
							variant={!isActivated ? "success" : "destructive"}
							onClick={() =>
								!isActivated
									? activateBlocking()
									: deactivateBlocking()
							}
						>
							{!isActivated
								? "Activate IP Blocking"
								: "Deactivate IP Blocking"}
						</Button>
					)}
				</div>
			</div>

			<DataTable
				isLoading={isLoading}
				columns={columns}
				data={filteredUsers}
			/>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add IP</DialogTitle>
					</DialogHeader>

					<form
						onSubmit={async (e) => {
							e.preventDefault();

							await axios.post("/whitelist/add", {
								ip: ipAddress,
							});

							fetchWhiteLists();
							setIsModalOpen(false);
						}}
						className="grid gap-4"
					>
						<Input
							label="IP Address"
							value={ipAddress}
							onChange={(e) => setIpAddress(e.target.value)}
							placeholder="103.105.41.207"
						/>

						<DialogFooter>
							<Button type="submit">Add</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</PageLayout>
	);
};

export default withAuth(WhiteListsPage, "", true);
