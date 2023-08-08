import React, { useEffect, useState } from "react";
import PageLayout from "../../../../layouts/PageLayout";
import { Button } from "../../../../components/ui/button";
import { withAuth } from "../../../../hoc/withAuth";
import axios from "../../../../lib/axios";
import SupplyNavlinks from "../../../../modules/supply/SupplyLayout";
import {
	counterTypeOptions,
	routingOptions,
} from "../../../../utils/constants";
import Link from "next/link";
import { RefreshCcw, TrashIcon } from "lucide-react";
import { DataTable } from "../../../../components/DataTable";
import dayjs from "dayjs";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../../components/ui/popover";
import { Close } from "@radix-ui/react-popover";
import { ApiRoutes } from "../../../../utils/api-routes";

const SupplySecurityPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [storeUnbilled, setStoreUnbilled] = useState([]);
	const [searchFilter, setSearchFilter] = useState("");

	const columns = [
		{
			id: "select",
			cell: ({ row }) => {
				const counter_no = row.original?.counter_no;

				return (
					<div className="space-x-4 flex items-center">
						<Link
							href={`/supply/security/edit?ref_no=${counter_no}&type=entry-counter`}
						>
							<input
								type="checkbox"
								className="w-4 h-4 cursor-pointer"
							/>
						</Link>

						<Popover>
							<PopoverTrigger asChild>
								<button>
									<TrashIcon
										size={20}
										className="text-red-700"
									/>
								</button>
							</PopoverTrigger>

							<PopoverContent side="bottom" align="start">
								<div className="grid gap-2">
									<h6>
										Are you sure you want to delete this
										Counter: {counter_no}?
									</h6>

									<div className="grid grid-cols-2 gap-2">
										<button
											onClick={() =>
												handleDeleteStore(counter_no)
											}
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
					</div>
				);
			},
		},
		{
			accessorKey: "counter_no_type",
			header: () => <span>COUNTER TYPE</span>,
			cell: ({ row }) => {
				const rowValue = row.getValue("counter_no_type");

				const value = counterTypeOptions.find(
					(e) => e.value === rowValue
				);

				return <span>{value?.label}</span>;
			},
		},
		{
			accessorKey: "counter_no",
			header: () => <span>COUNTER NO</span>,
		},
		{
			accessorKey: "counter_date",
			header: () => <span>COUNTER DATE</span>,
			cell: ({ row }) => {
				const value = row.getValue("counter_date");

				return value ? dayjs(value).format("DD/MM/YYYY") : "";
			},
		},
		{
			accessorKey: "routing",
			header: () => <span>ROUTING</span>,
			cell: ({ row }) => {
				const rowValue = row.getValue("routing");

				const value = routingOptions.find((e) => e.value === rowValue);

				return <span>{value?.label}</span>;
			},
		},
		{
			accessorKey: "customer_name",
			header: () => <span>CUSTOMER NAME</span>,
		},
		{
			accessorKey: "reg_no",
			header: () => <span>REG NO</span>,
		},
		{
			accessorKey: "bill_checked",
			header: () => <span>BILL CHECKED</span>,
			cell: ({ row }) => {
				const value = row.getValue("bill_checked");

				return value ? "YES" : "NO";
			},
		},
		{
			accessorKey: "security_out",
			header: () => <span>SECURITY OUT</span>,
			cell: ({ row }) => {
				const value = row.getValue("security_out");

				return value ? "YES" : "NO";
			},
		},
	];

	const view = "entry-counter";

	async function handleDeleteStore(ref_no) {
		await axios.delete(ApiRoutes?.supply.security.delete({ ref_no }));

		fetchSecurityRecords();
	}

	async function fetchSecurityRecords() {
		setIsLoading(true);

		let data = await axios.get("/supply/security/ready_to_go");

		setStoreUnbilled(data);
		setIsLoading(false);
	}

	useEffect(() => {
		fetchSecurityRecords();
	}, []);

	const filteredSecurity = storeUnbilled?.filter((e) =>
		JSON.stringify(e)?.toLowerCase()?.includes(searchFilter.toLowerCase())
	);

	const entryRecords = filteredSecurity?.filter((e) =>
		view?.includes(e?.type)
	);

	return (
		<PageLayout className="flex flex-col gap-4">
			<SupplyNavlinks className="mx-auto w-full max-w-[500px]" />

			<div className="w-full flex flex-col items-center gap-2">
				<div className="w-full flex flex-col items-center gap-2">
					<div className="flex flex-col items-center gap-2">
						<div className="border border-black bg-gray-300 p-1 rounded-md flex items-center gap-1">
							<Button
								variant={
									view === "counter" ? "success" : "ghost"
								}
								className="py-1 px-4 h-auto"
								asChild
							>
								<Link href="/supply/security/counter">
									Counter
								</Link>
							</Button>

							<Button
								variant={view === "store" ? "success" : "ghost"}
								className="py-1 px-4 h-auto"
								asChild
							>
								<Link href="/supply/security/store">Store</Link>
							</Button>

							<Button
								variant={
									view === "entry-counter" ||
									view === "entry-store"
										? "success"
										: "ghost"
								}
								className="py-1 px-4 h-auto"
								asChild
							>
								<Link href="/supply/security/entry/counter">
									Entry
								</Link>
							</Button>
						</div>

						{view?.includes("entry") && (
							<div className="border border-black bg-gray-300 p-1 rounded-md flex items-center gap-1">
								<Button
									variant={
										view === "entry-counter"
											? "success"
											: "ghost"
									}
									className="py-1 px-4 h-auto"
									asChild
								>
									<Link href="/supply/security/entry/counter">
										Counter
									</Link>
								</Button>

								<Button
									variant={
										view === "entry-store"
											? "success"
											: "ghost"
									}
									className="py-1 px-4 h-auto"
									asChild
								>
									<Link href="/supply/security/entry/store">
										Store
									</Link>
								</Button>
							</div>
						)}
					</div>

					<div className="p-1 flex items-center border border-black rounded-full">
						<input
							className="py-2 px-4 h-8 bg-transparent rounded-full !outline-0"
							onChange={(e) => setSearchFilter(e.target.value)}
							placeholder="Search..."
						/>

						<button className="p-1" onClick={fetchSecurityRecords}>
							<RefreshCcw size={20} />
						</button>
					</div>
				</div>

				<div className="w-full">
					<DataTable
						columns={columns}
						data={entryRecords}
						changes={"entry-counter"}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</PageLayout>
	);
};

export default withAuth(SupplySecurityPage, "supply_security-create");
