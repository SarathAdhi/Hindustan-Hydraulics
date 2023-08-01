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

const SupplyPage = () => {
	const [supplyData, setSupplyData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const columns = [
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

	function fetchSupplyData() {
		setIsLoading(true);

		axios.get("/supply/dashboard").then((res) => {
			setSupplyData(res);
		});

		setIsLoading(false);
	}

	useEffect(() => {
		fetchSupplyData();
	}, []);

	return (
		<PageLayout>
			<DataTable
				isLoading={isLoading}
				columns={columns}
				data={supplyData}
			/>
		</PageLayout>
	);
};

export default withAuth(SupplyPage, "", true);
