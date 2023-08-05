import { RefreshCcw, TrashIcon } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import PageLayout from "../../layouts/PageLayout";
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { inwardDocTypeOptions, routingOptions } from "../../utils/constants";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../components/ui/dialog";
import { toast } from "react-hot-toast";
import Axios from "axios";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../components/ui/popover";
import { Close } from "@radix-ui/react-popover";
import { ApiRoutes } from "../../utils/api-routes";
import Link from "next/link";

const InwardPage = () => {
	const [inwardData, setInwardData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [search, setSearch] = useState("");
	const [dateSelector, setDateSelector] = useState({
		from_date: "",
		to_date: "",
	});

	async function handleDeleteInward(doc_no, store) {
		await axios.delete(ApiRoutes.inward.store.delete({ doc_no, store }));

		fetchInwardData();
	}

	async function fetchInwardData() {
		setIsLoading(true);

		const res = await axios.get("/inward/dashboard");
		setInwardData(res);

		setIsLoading(false);
	}

	useEffect(() => {
		fetchInwardData();
	}, []);

	const columns = [
		{
			id: "select",
			cell: ({ row }) => {
				const doc_no = row.getValue("doc_no");
				const store = (row.original?.store || []).find(
					(e) => e?.received
				);

				return (
					<div className="space-x-4 flex items-center">
						<Link
							className="w-4 h-4"
							href={`/inward/edit?doc_no=${doc_no}`}
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
												handleDeleteInward(
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

				const value = inwardDocTypeOptions.find(
					(e) => e.value === rowValue
				);

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
			accessorKey: "supplier_name",
			header: () => <span>SUPPLIER NAME</span>,
		},
		{
			accessorKey: "smc",
			header: () => <span>SMC</span>,
			cell: ({ row }) => {
				const storesValue = row.original?.store || [];
				const smc = storesValue.find((e) => e.store_name === "smc");

				return <span>{smc?.received ? "RECEIVED" : ""}</span>;
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

				return <span>{general?.received ? "RECEIVED" : ""}</span>;
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

				return (
					<span>{instrumentation?.received ? "RECEIVED" : ""}</span>
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

				return <span>{hydraulics?.received ? "RECEIVED" : ""}</span>;
			},
		},
		{
			accessorKey: "hose",
			header: () => <span>HOSE</span>,
			cell: ({ row }) => {
				const storesValue = row.original?.store || [];
				const hose = storesValue.find((e) => e.store_name === "hose");

				return <span>{hose?.received ? "RECEIVED" : ""}</span>;
			},
		},
		{
			accessorKey: "tc_counter",
			header: () => <span>TC COUNTER</span>,
			cell: ({ row }) => {
				const storesValue = row.original?.store || [];
				const tc_counter = storesValue.find(
					(e) => e.store_name === "tc_counter"
				);

				return <span>{tc_counter?.received ? "RECEIVED" : ""}</span>;
			},
		},
		{
			accessorKey: "lc_counter",
			header: () => <span>LC COUNTER</span>,
			cell: ({ row }) => {
				const storesValue = row.original?.store || [];
				const lc_counter = storesValue.find(
					(e) => e.store_name === "lc_counter"
				);

				return <span>{lc_counter?.received ? "RECEIVED" : ""}</span>;
			},
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
			accessorKey: "materials_received",
			header: () => <span>MATERIALS RECEIVED</span>,
			cell: ({ row }) => {
				const value = row.getValue("materials_received");

				return (
					<span className={value ? "text-green-600" : "text-red-600"}>
						{value ? "YES" : "NO"}
					</span>
				);
			},
		},
		{
			accessorKey: "security_inward",
			header: () => <span>SECURITY INWARD</span>,
			cell: ({ row }) => {
				const value = row.getValue("security_inward");

				return (
					<span className={value ? "text-green-600" : "text-red-600"}>
						{value ? "YES" : "NO"}
					</span>
				);
			},
		},
		{
			accessorKey: "bill_checked",
			header: () => <span>BILL CHECKED</span>,
			cell: ({ row }) => {
				const value = row.getValue("bill_checked");

				return (
					<span className={value ? "text-green-600" : "text-red-600"}>
						{value ? "YES" : "NO"}
					</span>
				);
			},
		},
		{
			accessorKey: "inward_reg_no",
			header: () => <span>INWARD REG NO</span>,
		},
		{
			accessorKey: "createdAt",
			header: () => <span>CREATED AT</span>,
			cell: ({ row }) => {
				const value = row.getValue("createdAt");

				return value ? dayjs(value).format("DD/MM/YYYY") : "";
			},
		},
	];

	const filteredData = inwardData.filter((e) =>
		JSON.stringify(e)?.toLowerCase()?.includes(search.toLowerCase())
	);

	return (
		<PageLayout className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="bg-white w-60 border border-black rounded-full flex items-center justify-between">
					<input
						className="px-2 py-1 focus:outline-none rounded-full"
						placeholder="Search..."
						onChange={(e) => setSearch(e.target.value)}
					/>

					<button className="pr-2" onClick={fetchInwardData}>
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
											}/inward/dashboard/report?${new URLSearchParams(
												dateSelector
											)}`,
											method: "GET",
											responseType: "blob",
										});

										saveAs(data, "inward-report.xlsx");
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

export default withAuth(InwardPage, "", true);
