import { ArrowUpDown } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { Button } from "../../components/ui/button";
import PageLayout from "../../layouts/PageLayout";
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { inwardDocTypeOptions, routingOptions } from "../../utils/constants";

const InwardPage = () => {
	const [inwardData, setInwardData] = useState([]);

	async function fetchInwardData() {
		axios.get("/inward/dashboard").then((res) => setInwardData(res));
	}

	useEffect(() => {
		fetchInwardData();
	}, []);

	console.log(inwardData);

	// const columns = [
	//   {
	//     accessorKey: "status",
	//     header: "Status",
	//   },
	//   {
	//     accessorKey: "email",
	//     header: ({ column }) => {
	//       return (
	//         <Button
	//           variant="ghost"
	//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
	//         >
	//           Email
	//           <ArrowUpDown className="ml-2 h-4 w-4" />
	//         </Button>
	//       );
	//     },
	//   },
	//   {
	//     accessorKey: "amount",
	//     header: "Amount",
	//   },
	// ];

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
	];

	return (
		<PageLayout>
			<DataTable columns={columns} data={inwardData} />
		</PageLayout>
	);
};

export default withAuth(InwardPage, "", true);
