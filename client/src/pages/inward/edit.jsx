import React, { useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import { useRouter } from "next/router";
import {
	inwardDocTypeOptions,
	inwardStoreOptions,
	routingOptions,
} from "../../utils/constants";
import dayjs from "dayjs";
import { DataTable } from "../../components/DataTable";
import Link from "next/link";

const InwardStoreEditPage = () => {
	const { query } = useRouter();

	const doc_id = query?.doc_no;
	const isUpdate = query?.isUpdate === "true";

	const [isLoading, setIsLoading] = useState(true);
	const [storesData, setStoresData] = useState([]);

	const columns = [
		{
			id: "select",
			cell: ({ row }) => {
				const doc_no = row.getValue("doc_no");
				const store = row.original?.store;

				return (
					<Link
						href={`/inward/store/edit?${new URLSearchParams({
							doc_no,
							store,
						})}`}
					>
						<input
							className="w-4 h-4 cursor-pointer"
							type="checkbox"
						/>
					</Link>
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
		{
			accessorKey: "received",
			header: () => <span>RECEIVED</span>,
			cell: ({ row }) => {
				const value = row.getValue("received");

				return (
					<span className={value ? "text-green-600" : "text-red-600"}>
						{value ? "YES" : "NO"}
					</span>
				);
			},
		},
	];

	async function getStoreData() {
		const defaultValue = await axios.get(`/inward/store/?doc_no=${doc_id}`);

		setStoresData(defaultValue || []);

		setIsLoading(false);
	}

	useEffect(() => {
		if (doc_id) getStoreData();
	}, [doc_id]);

	return (
		<PageLayout>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between gap-4">
					<h2>Doc Number: {doc_id}</h2>

					<Link
						className="text-lg font-semibold text-blue-600 underline"
						href={`/inward/security/edit?doc_no=${doc_id}${
							isUpdate ? "&isUpdate=true" : ""
						}`}
					>
						{isUpdate ? "Update" : "Create"} Security
					</Link>
				</div>

				<DataTable
					columns={columns}
					data={storesData}
					isLoading={isLoading}
				/>
			</div>
		</PageLayout>
	);
};

export default withAuth(InwardStoreEditPage, "inward_store-create");
