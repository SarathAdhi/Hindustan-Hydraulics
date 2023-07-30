import React, { useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Button } from "../../components/ui/button";
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import SupplyNavlinks from "../../modules/supply/SupplyLayout";
import {
	docTypeOptions,
	storeOptions,
	storeStatusOptions,
} from "../../utils/constants";
import { useRouter } from "next/router";
import Link from "next/link";
import { RefreshCcw, TrashIcon } from "lucide-react";
import SStoreForm from "../../modules/supply/SStoreForm";
import { DataTable } from "../../components/DataTable";
import dayjs from "dayjs";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../components/ui/popover";
import { Close } from "@radix-ui/react-popover";
import { ApiRoutes } from "../../utils/api-routes";

const _defaultValues = {
	store: "",
	doc_type: "",
	doc_no: "",
	doc_date: "",
	po_no: "",
	po_date: "",
	supply: "",
	customer_name: "",
	ready: false,
	ready_to_bill: false,
};

const SupplyStorePage = () => {
	const { query } = useRouter();

	const isStoreUpdate = query?.isUpdate === "true";

	const [isLoading, setIsLoading] = useState(true);
	const [storeUnbilled, setStoreUnbilled] = useState([]);
	const [searchFilter, setSearchFilter] = useState("");
	const [storeDefaultValue, setStoreDefaultValue] = useState({});
	const [storeInfo, setStoreInfo] = useState(null);
	const [allowedFields, setAllowedFields] = useState({});

	async function handleDeleteStore(doc_no, store) {
		await axios.delete(ApiRoutes.supply.store.delete({ doc_no, store }));

		fetchStoreUnbilled({ changeLoadingState: false });
	}

	const columns = [
		{
			id: "select",
			cell: ({ row, table }) => {
				const doc_no = row.getValue("doc_no");
				const store = row.original?.store;

				const { po_date, doc_date, created_date, ...rest } =
					row.original;

				return (
					<div className="space-x-4 flex items-center">
						<input
							type="checkbox"
							className="w-4 h-4 cursor-pointer"
							checked={row.getIsSelected()}
							onChange={(e) => {
								const value = e.target.checked;

								table.resetRowSelection();
								row.toggleSelected(!!value);

								setTimeout(() => {
									if (isStoreUpdate)
										setStoreDefaultValue({
											po_date:
												dayjs(po_date).format(
													"YYYY-MM-DD"
												),
											doc_date:
												dayjs(doc_date).format(
													"YYYY-MM-DD"
												),
											...rest,
										});

									setStoreInfo({
										doc_no,
										store,
									});
								}, 200);
							}}
						/>

						{isStoreUpdate && (
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
											Doc {doc_no}?
										</h6>

										<div className="grid grid-cols-2 gap-2">
											<button
												onClick={() =>
													handleDeleteStore(
														doc_no,
														store
													)
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
						)}
					</div>
				);
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
			accessorKey: "store-name",
			header: () => <span>STORE NAME</span>,
			cell: ({ row }) => {
				const store = row.original?.store;

				const value = storeOptions.find((e) => e.value === store);

				return <span>{value?.label}</span>;
			},
		},
		{
			accessorKey: "store-type",
			header: () => <span>SUPPLY TYPE</span>,
			cell: ({ row }) => {
				const storeSupply = row.original?.supply;

				const value = storeStatusOptions.find(
					(e) => e.value === storeSupply
				);

				return <span>{value?.label}</span>;
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
	];

	useEffect(() => {
		axios.get("/supply/store/modify/allowed").then((res) => {
			const fields = {};
			res.map((e) => (fields[e] = true));
			setAllowedFields(fields);
		});
	}, []);

	async function fetchStoreUnbilled() {
		setIsLoading(true);

		const data = await axios.get("/supply/store/unbilled");

		setStoreUnbilled(data);
		setIsLoading(false);
	}

	console.log({ storeDefaultValue });

	useEffect(() => {
		fetchStoreUnbilled(isStoreUpdate);
	}, [query?.isUpdate]);

	const filteredStoreUnbilled = storeUnbilled.filter(
		(e) =>
			e?.doc_no.toLowerCase().includes(searchFilter.toLowerCase()) ||
			e?.bill_no?.toLowerCase().includes(searchFilter.toLowerCase()) ||
			e?.customer_name
				?.toLowerCase()
				.includes(searchFilter.toLowerCase()) ||
			e?.doc_type?.toLowerCase().includes(searchFilter.toLowerCase())
	);

	return (
		<PageLayout className="flex flex-col gap-4">
			<SupplyNavlinks className="mx-auto w-full max-w-[500px]" />

			<div className="w-full flex flex-col items-center gap-2">
				<div className="w-full flex flex-col items-center gap-2">
					<div className="border border-black bg-gray-300 p-1 rounded-md flex items-center gap-1">
						<Button
							variant={!isStoreUpdate ? "success" : "ghost"}
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/supply/store">Create</Link>
						</Button>

						<Button
							variant={isStoreUpdate ? "success" : "ghost"}
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/supply/store?isUpdate=true">
								Update
							</Link>
						</Button>
					</div>

					{isStoreUpdate && !storeInfo && (
						<div className="p-1 flex items-center border border-black rounded-full">
							<input
								className="py-2 px-4 h-8 bg-transparent rounded-full !outline-0"
								onChange={(e) =>
									setSearchFilter(e.target.value)
								}
								placeholder="Search..."
							/>

							<button
								className="p-1"
								onClick={fetchStoreUnbilled}
							>
								<RefreshCcw size={20} />
							</button>
						</div>
					)}
				</div>

				{isStoreUpdate ? (
					<>
						{!storeInfo && (
							<div className="w-full">
								<DataTable
									columns={columns}
									data={filteredStoreUnbilled}
									isLoading={isLoading}
								/>
							</div>
						)}

						{storeInfo && (
							<div className="mx-auto w-full max-w-[500px] space-y-2">
								<div className="flex flex-col items-center">
									<Button
										variant="link"
										className="p-0"
										onClick={() => {
											fetchStoreUnbilled();
											setStoreInfo(null);
										}}
									>
										Go Back
									</Button>

									<h5 className="text-center">
										Doc Number: {storeInfo?.doc_no}{" "}
										{isStoreUpdate && "(UPDATE)"}
									</h5>
								</div>

								<SStoreForm
									allowedFields={allowedFields}
									defaultValues={storeDefaultValue}
									storeInfo={storeInfo}
									isUpdate={true}
								/>
							</div>
						)}
					</>
				) : (
					<div className="mx-auto w-full max-w-[500px] space-y-2">
						<SStoreForm
							// allowedFields={allowedFields}
							defaultValues={_defaultValues}
							isUpdate={false}
						/>
					</div>
				)}
			</div>
		</PageLayout>
	);
};

export default withAuth(SupplyStorePage, "supply_store");
