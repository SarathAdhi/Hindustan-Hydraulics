import React, { useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Button } from "../../components/ui/button";
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import SupplyNavlinks from "../../modules/supply/SupplyLayout";
import {
	docTypeOptions,
	routingOptions,
	storeStatusOptions,
} from "../../utils/constants";
import { DataTable } from "../../components/DataTable";
import BillingForm from "../../modules/supply/BillingForm";
import dayjs from "dayjs";
import { RefreshCcw, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input } from "../../components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../components/ui/popover";
import { Close } from "@radix-ui/react-popover";
import { ApiRoutes } from "../../utils/api-routes";

const _defaultValues = {
	order_status: "",
	bill_no: "",
	bill_date: "",
	routing: "",
	routing_name: "",
	routing_receipt_no: "",
	bill_ready: false,
};

const SupplyBillingPage = () => {
	const { query } = useRouter();

	const isBillReady = query?.billed === "true";

	const [readyToBill, setReadyToBill] = useState([]);
	const [allowedFields, setAllowedFields] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [docInfo, setDocInfo] = useState(null);
	const [billingDefaultValue, setBillingDefaultValue] = useState({});
	const [searchFilter, setSearchFilter] = useState("");

	async function handleDeleteBill(doc_no) {
		await axios.delete(ApiRoutes.supply.billing.delete(doc_no));

		fetchBill({ changeLoadingState: false });
	}

	async function fetchBill({ changeLoadingState = true }) {
		if (changeLoadingState) setIsLoading(true);

		const data = await axios.get(
			isBillReady ? "/supply/bill/billed" : "/supply/bill/ready_to_bill"
		);

		if (changeLoadingState) setIsLoading(false);
		setReadyToBill(data);
	}

	useEffect(() => {
		axios.get("/supply/bill/modify/allowed").then((res) => {
			const fields = {};
			res.map((e) => (fields[e] = true));
			setAllowedFields(fields);
		});
	}, []);

	console.log(allowedFields);

	useEffect(() => {
		fetchBill({});
	}, [query?.billed]);

	const filteredReadyToBill = readyToBill.filter(
		(e) =>
			e?.doc_no.toLowerCase().includes(searchFilter.toLowerCase()) ||
			e?.bill_no?.toLowerCase().includes(searchFilter.toLowerCase()) ||
			e?.customer_name
				?.toLowerCase()
				.includes(searchFilter.toLowerCase()) ||
			e?.doc_type?.toLowerCase().includes(searchFilter.toLowerCase())
	);

	const columns = [
		{
			id: "select",
			cell: ({ row, table }) => {
				const doc_no = row.getValue("doc_no");
				const doc_type = row.getValue("doc_type");
				const bill_no = row.getValue("bill_no");

				const { order_status, bill_date, routing, bill_ready } =
					row.original;

				console.log(row.original);

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
									if (isBillReady)
										setBillingDefaultValue({
											order_status,
											bill_date:
												dayjs(bill_date).format(
													"YYYY-MM-DD"
												),
											routing,
											bill_ready,
											bill_no,
										});

									setDocInfo({
										doc_no,
										doc_type,
										bill_no,
									});
								}, 200);
							}}
						/>

						{isBillReady && (
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
													handleDeleteBill(doc_no)
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
			accessorKey: "s_no",
			header: () => <span>S NO</span>,
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

				return dayjs(value).format("DD/MM/YYYY");
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

				return dayjs(value).format("DD/MM/YYYY");
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
					(e) => e.value === smc.supply
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
					(e) => e.value === general.supply
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
					(e) => e.value === instrumentation.supply
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
					(e) => e.value === hydraulics.supply
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
					(e) => e.value === hose.supply
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

	return (
		<>
			<PageLayout className="flex flex-col gap-4">
				<SupplyNavlinks className="mx-auto w-full max-w-[500px]" />

				{!docInfo ? (
					<div className="flex flex-col items-start gap-2">
						<div className="w-full flex items-center justify-between">
							<div className="border border-black bg-gray-300 p-1 rounded-md flex items-center gap-1">
								<Button
									variant={!isBillReady ? "success" : "ghost"}
									className="py-1 px-4 h-auto"
									asChild
								>
									<Link href="/supply/billing">
										Ready to Bill
									</Link>
								</Button>

								<Button
									variant={isBillReady ? "success" : "ghost"}
									className="py-1 px-4 h-auto"
									asChild
								>
									<Link href="/supply/billing?billed=true">
										Billed
									</Link>
								</Button>
							</div>

							<div className="flex gap-2">
								<Input
									className="h-8 border-black"
									onChange={(e) =>
										setSearchFilter(e.target.value)
									}
									placeholder="Search..."
								/>

								<button className="p-1" onClick={fetchBill}>
									<RefreshCcw size={20} />
								</button>
							</div>
						</div>

						<DataTable
							columns={columns}
							data={filteredReadyToBill}
							isLoading={isLoading}
							hidden={isBillReady ? [] : ["bill_no"]}
						/>
					</div>
				) : (
					<div className="mx-auto w-full max-w-[500px] space-y-2">
						<div className="flex flex-col items-center">
							<Button
								variant="link"
								className="p-0"
								onClick={() => {
									fetchBill({ changeLoadingState: true });
									setDocInfo(null);
								}}
							>
								Go Back
							</Button>

							<h5 className="text-center">
								Doc Number: {docInfo?.doc_no}{" "}
								{isBillReady && "(UPDATE)"}
							</h5>
						</div>

						<BillingForm
							allowedFields={allowedFields}
							defaultValues={
								isBillReady
									? billingDefaultValue
									: _defaultValues
							}
							docInfo={docInfo}
							isUpdate={isBillReady}
						/>
					</div>
				)}
			</PageLayout>
		</>
	);
};

export default withAuth(SupplyBillingPage, "billing");
