import React, { useEffect, useState } from "react";
import PageLayout from "../../../layouts/PageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import axios from "../../../lib/axios";
import SupplyNavlinks from "../../../modules/supply/SupplyLayout";
import {
	docTypeOptions,
	storeOptions,
	storeStatusOptions,
} from "../../../utils/constants";
import Link from "next/link";
import { RefreshCcw, TrashIcon } from "lucide-react";
import { DataTable } from "../../../components/DataTable";
import dayjs from "dayjs";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../components/ui/popover";
import { Close } from "@radix-ui/react-popover";
import { ApiRoutes } from "../../../utils/api-routes";

const SupplyStoreAddPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [storeUnbilled, setStoreUnbilled] = useState([]);
	const [searchFilter, setSearchFilter] = useState("");

	async function handleDeleteStore(doc_no, store) {
		await axios.delete(ApiRoutes.supply.store.delete({ doc_no, store }));

		fetchAddStores();
	}

	const columns = [
		{
			id: "select",
			cell: ({ row }) => {
				const doc_no = row.getValue("doc_no");
				const store = row.original?.store || [];

				const storeValue = store.find((e) => e.supply !== "none");

				return (
					<div className="flex items-center gap-4">
						<Link
							className="w-4 h-4"
							href={`/supply/store/edit?doc_no=${doc_no}&store=${storeValue?.store_name}&type=add`}
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
										Are you sure you want to delete this Doc{" "}
										{doc_no}?
									</h6>

									<div className="grid grid-cols-2 gap-2">
										<button
											onClick={() =>
												handleDeleteStore(doc_no, store)
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
			accessorKey: "doc_no",
			header: () => <span>DOC NO</span>,
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
			accessorKey: "doc_date",
			header: () => <span>DOC DATE</span>,
			cell: ({ row }) => {
				const value = row.getValue("doc_date");

				return value ? dayjs(value).format("DD/MM/YYYY") : "";
			},
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

				return (
					<span
						className={
							value?.value === "part"
								? "text-red-600"
								: "text-green-600"
						}
					>
						{value?.label}
					</span>
				);
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

				return (
					<span
						className={
							value?.value === "part"
								? "text-red-600"
								: "text-green-600"
						}
					>
						{value?.label}
					</span>
				);
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

				return (
					<span
						className={
							value?.value === "part"
								? "text-red-600"
								: "text-green-600"
						}
					>
						{value?.label}
					</span>
				);
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

				return (
					<span
						className={
							value?.value === "part"
								? "text-red-600"
								: "text-green-600"
						}
					>
						{value?.label}
					</span>
				);
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

				return (
					<span
						className={
							value?.value === "part"
								? "text-red-600"
								: "text-green-600"
						}
					>
						{value?.label}
					</span>
				);
			},
		},
	];

	async function fetchAddStores() {
		setIsLoading(true);

		const data = await axios.get("/supply/store/add_stores");

		setStoreUnbilled(data);
		setIsLoading(false);
	}

	useEffect(() => {
		fetchAddStores();
	}, []);

	const filteredStoreUnbilled = storeUnbilled.filter((e) =>
		JSON.stringify(e)?.toLowerCase()?.includes(searchFilter.toLowerCase())
	);

	return (
		<PageLayout className="flex flex-col gap-4">
			<SupplyNavlinks className="mx-auto w-full max-w-[500px]" />

			<div className="w-full flex flex-col items-center gap-2">
				<div className="w-full flex flex-col items-center gap-2">
					<div className="border border-black bg-gray-300 p-1 rounded-md flex items-center gap-1">
						<Button
							variant="ghost"
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/supply/store">Create</Link>
						</Button>

						<Button
							variant="ghost"
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/supply/store/update">Update</Link>
						</Button>

						<Button
							variant="success"
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/supply/store/add">Add</Link>
						</Button>
					</div>

					<div className="p-1 flex items-center border border-black rounded-full">
						<input
							className="py-2 px-4 h-8 bg-transparent rounded-full !outline-0"
							onChange={(e) => setSearchFilter(e.target.value)}
							placeholder="Search..."
						/>

						<button className="p-1" onClick={fetchAddStores}>
							<RefreshCcw size={20} />
						</button>
					</div>
				</div>

				<div className="w-full">
					<DataTable
						columns={columns}
						data={filteredStoreUnbilled}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</PageLayout>
	);
};

export default withAuth(SupplyStoreAddPage, "supply_store-create");
