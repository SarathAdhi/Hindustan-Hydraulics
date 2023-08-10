import React, { useEffect, useState } from "react";
import PageLayout from "../../../layouts/PageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import axios from "../../../lib/axios";
import SupplyNavlinks from "../../../modules/supply/SupplyLayout";
import { counterTypeOptions, routingOptions } from "../../../utils/constants";
import Link from "next/link";
import { RefreshCcw } from "lucide-react";
import { DataTable } from "../../../components/DataTable";
import dayjs from "dayjs";

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
					<Link
						href={`/supply/security/create?ref_no=${counter_no}&type=counter`}
					>
						<input
							type="checkbox"
							className="w-4 h-4 cursor-pointer"
						/>
					</Link>
				);
			},
		},
		{
			accessorKey: "createdAt",
			header: () => <span>CREATED AT</span>,
			cell: ({ row }) => {
				const value = row.getValue("createdAt");

				return value ? dayjs(value).format("DD/MM/YYYY") : "";
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
			accessorKey: "routing_name",
			header: () => <span>ROUTING NAME</span>,
		},
		{
			accessorKey: "routing_receipt_no",
			header: () => <span>ROUTING RECEIPT NO</span>,
		},
		{
			accessorKey: "customer_name",
			header: () => <span>CUSTOMER NAME</span>,
		},
		{
			accessorKey: "reg_no",
			header: () => <span>REG NO</span>,
		},
	];

	async function fetchSecurityRecords() {
		setIsLoading(true);

		let data = await axios.get("/supply/security/not_ready_to_go_counter");

		setStoreUnbilled(data);
		setIsLoading(false);
	}

	useEffect(() => {
		fetchSecurityRecords();
	}, []);

	const filteredSecurity = storeUnbilled?.filter((e) =>
		JSON.stringify(e)?.toLowerCase()?.includes(searchFilter.toLowerCase())
	);

	return (
		<PageLayout
			title="Supply Security - Counter"
			className="flex flex-col gap-4"
		>
			<SupplyNavlinks className="mx-auto w-full max-w-[500px]" />

			<div className="w-full flex flex-col items-center gap-2">
				<div className="w-full flex flex-col items-center gap-2">
					<div className="border border-black bg-gray-300 p-1 rounded-md flex items-center gap-1">
						<Button
							variant={"success"}
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/supply/security/counter">Counter</Link>
						</Button>

						<Button
							variant={"ghost"}
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/supply/security/store">Store</Link>
						</Button>

						<Button
							variant={"ghost"}
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/supply/security/entry/counter">
								Entry
							</Link>
						</Button>
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
						isLoading={isLoading}
						columns={columns}
						data={filteredSecurity}
					/>
				</div>
			</div>
		</PageLayout>
	);
};

export default withAuth(SupplySecurityPage, "supply_security-create");
