import { DataTable } from "../../components/DataTable";
import PageLayout from "../../layouts/PageLayout";
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import {
	docTypeOptions,
	routingOptions,
	storeStatusOptions,
} from "../../utils/constants";
import dayjs from "dayjs";
import { cn } from "../../lib/utils";

import Axios from "axios";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../components/ui/popover";
import { Close } from "@radix-ui/react-popover";
import { ApiRoutes } from "../../utils/api-routes";
import { RefreshCcw, TrashIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "react-hot-toast";

const SupplyPage = () => {
	const [supplyData, setSupplyData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [dateSelector, setDateSelector] = useState({
		from_date: "",
		to_date: "",
	});

	async function handleDeleteSupply(doc_no, store) {
		await axios.delete(ApiRoutes.supply.store.delete({ doc_no, store }));

		fetchSupplyData();
	}

	async function fetchSupplyData() {
		setIsLoading(true);

		const res = await axios.get("/supply/dashboard");
		setSupplyData(res);

		setIsLoading(false);
	}

	useEffect(() => {
		fetchSupplyData();
	}, []);

	const columns = [
		{
			id: "select",
			cell: ({ row }) => {
				const doc_no = row.getValue("doc_no");
				const store = (row.original?.store || []).find(
					(e) => e?.received
				);

				console.log(store);

				return (
					<div className="space-x-4 flex items-center">
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
												handleDeleteSupply(
													doc_no,
													store?.store_name
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
		{
			accessorKey: "counter_no",
			header: () => <span>COUNTER NO</span>,
		},
		{
			accessorKey: "ready",
			header: () => <span>READY</span>,
			cell: ({ row }) => {
				const value = row.getValue("ready");
				const isCounter = row.getValue("counter_no");

				return (
					<span className={cn(value && "text-red-600")}>
						{value ? "YES" : isCounter ? "" : "NO"}
					</span>
				);
			},
		},
		{
			accessorKey: "ready_to_bill",
			header: () => <span>READY TO BILL</span>,
			cell: ({ row }) => {
				const value = row.getValue("ready_to_bill");
				const isCounter = row.getValue("counter_no");

				return (
					<span className={cn(value && "text-[#974806]")}>
						{value ? "YES" : isCounter ? "" : "NO"}
					</span>
				);
			},
		},
		{
			accessorKey: "bill_ready",
			header: () => <span>BILL READY</span>,
			cell: ({ row }) => {
				const value = row.getValue("bill_ready");
				const isCounter = row.getValue("counter_no");

				return (
					<span className={cn(value && "text-[#4111f3]")}>
						{value ? "YES" : isCounter ? "" : "NO"}
					</span>
				);
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

				return (
					<span className={cn(value && "text-[#006600]")}>
						{value ? "OUT" : ""}
					</span>
				);
			},
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
			accessorKey: "reg_no",
			header: () => <span>REG NO</span>,
		},
	];

	const filteredData = supplyData.filter(
		(e) =>
			e?.doc_no?.toLowerCase()?.includes(search.toLowerCase()) ||
			e?.bill_no?.toLowerCase()?.includes(search.toLowerCase()) ||
			e?.counter_no?.toLowerCase()?.includes(search.toLowerCase()) ||
			e?.doc_type?.toLowerCase()?.includes(search.toLowerCase()) ||
			e?.customer_name?.toLowerCase()?.includes(search.toLowerCase()) ||
			e?.routing?.toLowerCase()?.includes(search.toLowerCase()) ||
			e?.routing_name?.toLowerCase()?.includes(search.toLowerCase()) ||
			e?.routing_receipt_no
				?.toLowerCase()
				?.includes(search.toLowerCase()) ||
			e?.reg_no?.toLowerCase()?.includes(search.toLowerCase())
	);

	return (
		<PageLayout className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="bg-white w-72 border border-black rounded-full flex items-center justify-between">
					<input
						className="px-4 py-2 focus:outline-none rounded-full"
						placeholder="Search..."
						onChange={(e) => setSearch(e.target.value)}
					/>

					<button className="pr-2" onClick={fetchSupplyData}>
						<RefreshCcw className="active:animate-spin" />
					</button>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="success">Download</Button>
					</DialogTrigger>

					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Download Report</DialogTitle>
						</DialogHeader>

						<div className="mt-5 grid grid-cols-2 gap-2">
							<Input
								label="From"
								value={dateSelector.from_date}
								onChange={(e) =>
									setDateSelector({
										...dateSelector,
										from_date: e.target.value,
									})
								}
								type="date"
							/>

							<Input
								label="To"
								value={dateSelector.to_date}
								onChange={(e) =>
									setDateSelector({
										...dateSelector,
										to_date: e.target.value,
									})
								}
								type="date"
							/>
						</div>

						<DialogFooter>
							<Button
								onClick={async () => {
									const toastId = toast.loading(
										"Downloading Report..."
									);

									try {
										const { data } = await Axios({
											url: `${
												process.env.SERVER_BASE_URL
											}/supply/dashboard/report?${new URLSearchParams(
												dateSelector
											)}`,
											method: "GET",
											responseType: "blob",
										});

										saveAs(data, "supply-report.xlsx");
									} catch (err) {}

									setIsDialogOpen(false);
									toast.dismiss(toastId);
								}}
							>
								Download
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<DataTable
				isLoading={isLoading}
				columns={columns}
				data={filteredData}
			/>
		</PageLayout>
	);
};

export default withAuth(SupplyPage, "", true);
