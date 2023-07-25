import React, { useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Button } from "../../components/ui/button";
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import InwardPageLayout from "../../modules/inward/InwardPageLayout";
import {
	inwardDocTypeOptions,
	inwardStoreOptions,
} from "../../utils/constants";
import { useRouter } from "next/router";
import Link from "next/link";
import { RefreshCcw, TrashIcon } from "lucide-react";
import IStoreForm from "../../modules/inward/IStoreForm";
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
	supplier_name: "",
	doc_type: "",
	doc_no: "",
	doc_date: "",
	received: false,
};

const InwardStorePage = () => {
	const { query } = useRouter();

	const isStoreUpdate = query?.isUpdate === "true";

	const [isLoading, setIsLoading] = useState(true);
	const [storeUnbilled, setStoreUnbilled] = useState([]);
	const [searchFilter, setSearchFilter] = useState("");
	const [storeDefaultValue, setStoreDefaultValue] = useState({});
	const [storeInfo, setStoreInfo] = useState(null);
	const [allowedFields, setAllowedFields] = useState({});

	async function handleDeleteStore(doc_no, store) {
		await axios.delete(ApiRoutes.inward.store.delete({ doc_no, store }));

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

				return dayjs(value).format("DD/MM/YYYY");
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
			header: () => <span>CUSTOMER NAME</span>,
		},
	];

	useEffect(() => {
		axios.get("/inward/store/modify/allowed").then((res) => {
			const fields = {};
			res.map((e) => (fields[e] = true));
			setAllowedFields(fields);
		});
	}, []);

	async function fetchStoreUnbilled() {
		setIsLoading(true);

		const data = await axios.get("/inward/store/no-security");

		setStoreUnbilled(data);
		setIsLoading(false);
	}

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
			<InwardPageLayout className="mx-auto w-full max-w-[500px]" />

			<div className="w-full flex flex-col items-center gap-2">
				<div className="w-full flex flex-col items-center gap-2">
					<div className="border border-black bg-gray-300 p-1 rounded-md flex items-center gap-1">
						<Button
							variant={!isStoreUpdate ? "success" : "ghost"}
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/inward/store">Create</Link>
						</Button>

						<Button
							variant={isStoreUpdate ? "success" : "ghost"}
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/inward/store?isUpdate=true">
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
										onClick={() => setStoreInfo(null)}
									>
										Go Back
									</Button>

									<h5 className="text-center">
										Doc Number: {storeInfo?.doc_no}{" "}
										{isStoreUpdate && "(UPDATE)"}
									</h5>
								</div>

								<IStoreForm
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
						<IStoreForm
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

export default withAuth(InwardStorePage);
