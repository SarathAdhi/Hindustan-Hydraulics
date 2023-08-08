import React, { useEffect, useState } from "react";
import PageLayout from "../../../layouts/PageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import axios from "../../../lib/axios";
import InwardPageLayout from "../../../modules/inward/InwardPageLayout";
import {
	inwardDocTypeOptions,
	inwardStoreOptions,
	routingOptions,
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

const InwardStoreUpdatePage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [storeUnbilled, setStoreUnbilled] = useState([]);
	const [searchFilter, setSearchFilter] = useState("");

	async function handleDeleteStore(doc_no, store) {
		await axios.delete(ApiRoutes.inward.store.delete({ doc_no, store }));

		fetchStoreUnbilled({ changeLoadingState: false });
	}

	const columns = [
		{
			id: "select",
			cell: ({ row }) => {
				const doc_no = row.getValue("doc_no");
				const store = row.original?.store;

				return (
					<div className="flex items-center gap-4">
						<Link
							className="w-4 h-4"
							href={`/inward/store/edit?doc_no=${doc_no}&store=${store}`}
						>
							<input
								type="checkbox"
								className="w-full h-full cursor-pointer"
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
			accessorKey: "doc_type",
			header: () => <span>DOC TYPE</span>,
			cell: ({ row }) => {
				const rowValue = row.getValue("doc_type");

				const value = inwardDocTypeOptions.find(
					(e) => e.value === rowValue
				);

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
			accessorKey: "store-name",
			header: () => <span>STORE NAME</span>,
			cell: ({ row }) => {
				const store = row.original?.store;

				const value = inwardStoreOptions.find((e) => e.value === store);

				return <span>{value?.label}</span>;
			},
		},
		{
			accessorKey: "supplier_name",
			header: () => <span>SUPPLIER NAME</span>,
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
	];

	async function fetchStoreUnbilled() {
		setIsLoading(true);

		const data = await axios.get("/inward/store/no-security");

		setStoreUnbilled(data);
		setIsLoading(false);
	}

	useEffect(() => {
		fetchStoreUnbilled();
	}, []);

	const filteredStoreUnbilled = storeUnbilled.filter((e) =>
		JSON.stringify(e)?.toLowerCase()?.includes(searchFilter.toLowerCase())
	);

	return (
		<PageLayout className="flex flex-col gap-4">
			<InwardPageLayout className="mx-auto w-full max-w-[500px]" />

			<div className="w-full flex flex-col items-center gap-2">
				<div className="w-full flex flex-col items-center gap-2">
					<div className="border border-black bg-gray-300 p-1 rounded-md flex items-center gap-1">
						<Button
							variant="ghost"
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/inward/store">Create</Link>
						</Button>

						<Button
							variant="success"
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/inward/store/update">Update</Link>
						</Button>
					</div>

					<div className="p-1 flex items-center border border-black rounded-full">
						<input
							className="py-2 px-4 h-8 bg-transparent rounded-full !outline-0"
							onChange={(e) => setSearchFilter(e.target.value)}
							placeholder="Search..."
						/>

						<button className="p-1" onClick={fetchStoreUnbilled}>
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

export default withAuth(InwardStoreUpdatePage, "inward_store-create");
