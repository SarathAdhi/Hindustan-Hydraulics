import React, { useEffect, useState } from "react";
import PageLayout from "../../../layouts/PageLayout";
import InwardPageLayout from "../../../modules/inward/InwardPageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import axios from "../../../lib/axios";
import { inwardDocTypeOptions } from "../../../utils/constants";
import { useRouter } from "next/router";
import Link from "next/link";
import { RefreshCcw, TrashIcon } from "lucide-react";
import { DataTable } from "../../../components/DataTable";
import dayjs from "dayjs";
import { ApiRoutes } from "../../../utils/api-routes";
import ISecurityForm from "../../../modules/inward/ISecurityForm";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../components/ui/popover";
import { Close } from "@radix-ui/react-popover";

const _defaultValues = {
	bill_checked: false,
	inward_reg_no: "",
	security_inward: false,
};

const InwardSecurityPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [securityData, setSecurityData] = useState([]);
	const [searchFilter, setSearchFilter] = useState("");
	const [defaultValue, setDefaultValue] = useState(_defaultValues);
	const [securityInfo, setSecurityInfo] = useState(null);
	const [allowedFields, setAllowedFields] = useState({});

	const columns = [
		{
			id: "select",
			cell: ({ row, table }) => {
				const doc_no = row.original?.doc_no;

				return (
					<input
						type="checkbox"
						className="w-4 h-4 cursor-pointer"
						checked={row.getIsSelected()}
						onChange={(e) => {
							const value = e.target.checked;

							table.resetRowSelection();
							row.toggleSelected(!!value);

							setTimeout(() => {
								setDefaultValue({
									...row.original,
								});

								setSecurityInfo({
									doc_no,
								});
							}, 200);
						}}
					/>
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
			accessorKey: "materials_received",
			header: () => <span>MATERIALS RECEIVED</span>,
			cell: ({ row }) => {
				const value = row.getValue("materials_received");

				return value ? "YES" : "NO";
			},
		},
		{
			accessorKey: "security_inward",
			header: () => <span>SECURITY INWARD</span>,
			cell: ({ row }) => {
				const value = row.getValue("security_inward");

				return value ? "YES" : "NO";
			},
		},
	];

	async function handleDelete(doc_no) {
		await axios.delete(ApiRoutes?.inward.security.delete({ doc_no }));

		fetchSecurityRecords();
	}

	useEffect(() => {
		axios.get("/inward/security/modify/allowed").then((res) => {
			const fields = {};
			res.map((e) => (fields[e] = true));
			setAllowedFields(fields);
		});
	}, []);

	async function fetchSecurityRecords() {
		setIsLoading(true);

		let data = await axios.get("/inward/security/no-security");

		setIsLoading(false);
		setSecurityData(data);
	}

	console.log({ defaultValue, securityInfo });

	useEffect(() => {
		setDefaultValue(_defaultValues);

		fetchSecurityRecords();
	}, []);

	const filteredSecurity = securityData?.filter(
		(e) =>
			e?.doc_no?.toLowerCase().includes(searchFilter.toLowerCase()) ||
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
							variant="success"
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/inward/security">Create</Link>
						</Button>

						<Button
							variant="ghost"
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/inward/security/update">Update</Link>
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
						columns={columns}
						data={filteredSecurity}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</PageLayout>
	);
};

export default withAuth(InwardSecurityPage, "inward_security");
