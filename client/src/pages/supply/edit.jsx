import React, { useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import { useRouter } from "next/router";
import {
	counterTypeOptions,
	docTypeOptions,
	routingOptions,
	storeOptions,
	storeStatusOptions,
} from "../../utils/constants";
import dayjs from "dayjs";
import { DataTable } from "../../components/DataTable";
import Link from "next/link";

const SupplyStoreEditPage = () => {
	const { query } = useRouter();

	const ref_no = query?.ref_no;
	const type = query?.type;
	const form = query?.form;
	const bill_no = query?.bill_no;
	const doc_type = query?.doc_type;

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
						href={`/supply/store/edit?${new URLSearchParams({
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

	const counterColumns = [
		{
			id: "select",
			cell: ({ row }) => {
				const counter_no = row.original?.counter_no;

				return (
					<Link
						href={`/supply/security/create?ref_no=${counter_no}&type=counter`}
					>
						<input
							type="checkbox"
							className="w-4 h-4 cursor-pointer"
						/>
					</Link>
				);
			},
		},
		{
			accessorKey: "counter_no_type",
			header: () => <span>COUNTER TYPE</span>,
			cell: ({ row }) => {
				const rowValue = row.getValue("counter_no_type");

				const value = counterTypeOptions.find(
					(e) => e.value === rowValue
				);

				return <span>{value?.label}</span>;
			},
		},
		{
			accessorKey: "counter_no",
			header: () => <span>COUNTER NO</span>,
		},
		{
			accessorKey: "counter_date",
			header: () => <span>COUNTER DATE</span>,
			cell: ({ row }) => {
				const value = row.getValue("counter_date");

				return value ? dayjs(value).format("DD/MM/YYYY") : "";
			},
		},
		{
			accessorKey: "routing",
			header: () => <span>ROUTING</span>,
			cell: ({ row }) => {
				const rowValue = row.getValue("routing");

				const value = routingOptions.find((e) => e.value === rowValue);

				return <span>{value?.label}</span>;
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
			accessorKey: "customer_name",
			header: () => <span>CUSTOMER NAME</span>,
		},
		{
			accessorKey: "reg_no",
			header: () => <span>REG NO</span>,
		},
	];

	async function getStoreData() {
		const defaultValue = await axios.get(
			type === "store"
				? `/supply/store?doc_no=${ref_no}`
				: `/supply/counter/counter?counter_no=${ref_no}`
		);

		setStoresData(type === "store" ? defaultValue : [defaultValue] || []);

		setIsLoading(false);
	}

	useEffect(() => {
		if (ref_no) getStoreData();
	}, [ref_no]);

	return (
		<PageLayout>
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between gap-4">
					<h2>
						{type === "counter" ? "Counter" : "Doc"} Number:{" "}
						{ref_no}
					</h2>

					<div className="space-x-2">
						<Link
							className="text-lg font-semibold text-blue-600 underline"
							href={
								type === "counter"
									? `/supply/counter/edit?counter_no=${ref_no}`
									: bill_no
									? `/supply/billing/edit?doc_no=${ref_no}&bill_no=${bill_no}`
									: `/supply/billing/generate?doc_no=${ref_no}&doc_type=${doc_type}`
							}
						>
							{bill_no ? "Generate" : "Update"} Billing
						</Link>

						<Link
							className="text-lg font-semibold text-blue-600 underline"
							href={
								type === "counter"
									? `/supply/security/create?ref_no=${ref_no}&type=counter`
									: `/supply/security/create?ref_no=${ref_no}${
											form ? `&type=${form}` : ""
									  }`
							}
						>
							Security Form
						</Link>
					</div>
				</div>

				<DataTable
					columns={type === "store" ? columns : counterColumns}
					data={storesData}
					isLoading={isLoading}
				/>
			</div>
		</PageLayout>
	);
};

export default withAuth(SupplyStoreEditPage);
