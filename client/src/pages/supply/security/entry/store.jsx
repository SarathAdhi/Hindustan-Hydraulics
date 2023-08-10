import React, { useEffect, useState } from "react";
import PageLayout from "../../../../layouts/PageLayout";
import { Button } from "../../../../components/ui/button";
import { withAuth } from "../../../../hoc/withAuth";
import axios from "../../../../lib/axios";
import SupplyNavlinks from "../../../../modules/supply/SupplyLayout";
import {
	docTypeOptions,
	routingOptions,
	storeStatusOptions,
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
				const doc_no = row.original?.doc_no;

				return (
					<div className="space-x-4 flex items-center">
						<Link
							href={`/supply/security/edit?ref_no=${doc_no}&type=entry-store`}
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
										Counter: {doc_no}?
									</h6>

									<div className="grid grid-cols-2 gap-2">
										<button
											onClick={() =>
												handleDeleteStore(doc_no)
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
			accessorKey: "s_no",
			header: () => <span>S NO</span>,
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
			accessorKey: "doc_type",
			header: () => <span>DOC TYPE</span>,
			cell: ({ row }) => {
				const rowValue = row.getValue("doc_type");

				const value = docTypeOptions.find((e) => e.value === rowValue);

				return <span>{value?.label}</span>;
			},
		},
		{
			accessorKey: "doc_no",
			header: () => <span>DOC NO</span>,
		},
		{
			accessorKey: "doc_date",
			header: () => <span>DOC DATE</span>,
			cell: ({ row }) => {
				const value = row.getValue("doc_date");

				return value ? dayjs(value).format("DD/MM/YYYY") : "";
			},
		},
		{
			accessorKey: "bill_no",
			header: () => <span>BILL NO</span>,
		},
		{
			accessorKey: "po_no",
			header: () => <span>P O NO</span>,
		},
		{
			accessorKey: "po_date",
			header: () => <span>P O DATE</span>,
			cell: ({ row }) => {
				const value = row.getValue("po_date");

				return value ? dayjs(value).format("DD/MM/YYYY") : "";
			},
		},
		{
			accessorKey: "customer_name",
			header: () => <span>CUSTOMER NAME</span>,
		},
		{
			accessorKey: "smc",
			header: () => <span>SMC</span>,
			cell: ({ row }) => {
				const storesValue = row.original?.store || [];
				const smc = storesValue.find((e) => e.store_name === "smc");

				const value = storeStatusOptions.find(
					(e) => e.value === smc?.supply
				);

				return <span>{value?.label}</span>;
			},
		},
		{
			accessorKey: "general",
			header: () => <span>GENERAL</span>,
			cell: ({ row }) => {
				const storesValue = row.original?.store || [];
				const general = storesValue.find(
					(e) => e.store_name === "general"
				);

				const value = storeStatusOptions.find(
					(e) => e.value === general?.supply
				);

				return <span>{value?.label}</span>;
			},
		},
		{
			accessorKey: "instrumentation",
			header: () => <span>INSTRUMENTATION</span>,
			cell: ({ row }) => {
				const storesValue = row.original?.store || [];
				const instrumentation = storesValue.find(
					(e) => e.store_name === "instrumentation"
				);

				const value = storeStatusOptions.find(
					(e) => e.value === instrumentation?.supply
				);

				return <span>{value?.label}</span>;
			},
		},
		{
			accessorKey: "hydraulics",
			header: () => <span>HYDRAULICS</span>,
			cell: ({ row }) => {
				const storesValue = row.original?.store || [];
				const hydraulics = storesValue.find(
					(e) => e.store_name === "hydraulics"
				);

				const value = storeStatusOptions.find(
					(e) => e.value === hydraulics?.supply
				);

				return <span>{value?.label}</span>;
			},
		},
		{
			accessorKey: "hose",
			header: () => <span>HOSE</span>,
			cell: ({ row }) => {
				const storesValue = row.original?.store || [];
				const hose = storesValue.find((e) => e.store_name === "hose");

				const value = storeStatusOptions.find(
					(e) => e.value === hose?.supply
				);

				return <span>{value?.label}</span>;
			},
		},
		{
			accessorKey: "counter_no",
			header: () => <span>COUNTER NO</span>,
		},
		{
			accessorKey: "ready",
			header: () => <span>READY</span>,
			cell: ({ row }) => {
				const value = row.getValue("ready");

				return value ? "YES" : "NO";
			},
		},
		{
			accessorKey: "ready_to_bill",
			header: () => <span>READY TO BILL</span>,
			cell: ({ row }) => {
				const value = row.getValue("ready_to_bill");

				return value ? "YES" : "NO";
			},
		},
		{
			accessorKey: "bill_ready",
			header: () => <span>BILL READY</span>,
			cell: ({ row }) => {
				const value = row.getValue("bill_ready");

				return value ? "YES" : "NO";
			},
		},
		{
			accessorKey: "order_status",
			header: () => <span>ORDER STATUS</span>,
			cell: ({ row }) => {
				const rowValue = row.getValue("order_status");

				const value = storeStatusOptions.find(
					(e) => e.value === rowValue
				);

				return <span>{value?.label}</span>;
			},
		},
		{
			accessorKey: "bill_no",
			header: () => <span>BILL NO</span>,
		},
		{
			accessorKey: "routing",
			header: () => <span>ROUTING</span>,
			cell: ({ row }) => {
				const value = row.getValue("routing");

				const type = routingOptions.find((e) => e.value === value);

				return <span>{type?.label}</span>;
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
			accessorKey: "security_out",
			header: () => <span>SECURITY OUT</span>,
			cell: ({ row }) => {
				const value = row.getValue("security_out");

				return value ? "OUT" : "";
			},
		},
		{
			accessorKey: "reg_no",
			header: () => <span>REG NO</span>,
		},
	];

	const view = "entry-store";

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
		<PageLayout
			title="Supply Security - Entry Store"
			className="flex flex-col gap-4"
		>
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
