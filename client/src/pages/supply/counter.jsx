import React, { useEffect, useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Button } from "../../components/ui/button";
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import SupplyNavlinks from "../../modules/supply/SupplyLayout";
import { counterTypeOptions, routingOptions } from "../../utils/constants";
import { useRouter } from "next/router";
import Link from "next/link";
import { RefreshCcw, TrashIcon } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import dayjs from "dayjs";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../components/ui/popover";
import { Close } from "@radix-ui/react-popover";
import { ApiRoutes } from "../../utils/api-routes";
import CounterForm from "../../modules/supply/CounterForm";

const _defaultValues = {
	counter_no_type: "",
	counter_no: "",
	counter_date: "",
	customer_name: "",
	routing: "",
	routing_name: "",
	routing_receipt_no: "",
};

const SupplyCounterPage = () => {
	const { query } = useRouter();

	const isStoreUpdate = query?.isUpdate === "true";

	const [isLoading, setIsLoading] = useState(true);
	const [storeUnbilled, setStoreUnbilled] = useState([]);
	const [searchFilter, setSearchFilter] = useState("");
	const [storeDefaultValue, setStoreDefaultValue] = useState({});
	const [counterInfo, setCounterInfo] = useState(null);
	const [allowedFields, setAllowedFields] = useState({});

	async function handleDeleteStore(counter_no) {
		await axios.delete(ApiRoutes.supply.counter.delete({ counter_no }));

		fetchCounter({ changeLoadingState: false });
	}

	const columns = [
		{
			id: "select",
			cell: ({ row, table }) => {
				const counter_no = row.getValue("counter_no");
				const store = row.original?.store;

				const { counter_date, ...rest } = row.original;

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
											counter_date:
												dayjs(counter_date).format(
													"YYYY-MM-DD"
												),
											...rest,
										});

									setCounterInfo({
										counter_no: rest.counter_no,
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
											Doc {counter_no}?
										</h6>

										<div className="grid grid-cols-2 gap-2">
											<button
												onClick={() =>
													handleDeleteStore(
														counter_no
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

				return dayjs(value).format("DD/MM/YYYY");
			},
		},
		{
			accessorKey: "routing",
			header: () => <span>ROUTING</span>,
			cell: ({ row }) => {
				const store = row.original?.routing;

				const value = routingOptions.find((e) => e.value === store);

				return <span>{value?.label}</span>;
			},
		},
		{
			accessorKey: "customer_name",
			header: () => <span>CUSTOMER NAME</span>,
		},
	];

	useEffect(() => {
		axios.get("/supply/counter/modify/allowed").then((res) => {
			const fields = {};
			res.map((e) => (fields[e] = true));
			setAllowedFields(fields);
		});
	}, []);

	async function fetchCounter() {
		setIsLoading(true);

		const data = await axios.get("/supply/counter/not-ready");

		setStoreUnbilled(data);
		setIsLoading(false);
	}

	console.log({ storeDefaultValue });

	useEffect(() => {
		fetchCounter(isStoreUpdate);
	}, [query?.isUpdate]);

	const filteredStoreUnbilled = storeUnbilled.filter(
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
			<SupplyNavlinks className="mx-auto w-full max-w-[500px]" />

			<div className="w-full flex flex-col items-center gap-2">
				<div className="w-full flex flex-col items-center gap-2">
					<div className="border border-black bg-gray-300 p-1 rounded-md flex items-center gap-1">
						<Button
							variant={!isStoreUpdate ? "success" : "ghost"}
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/supply/counter">Create</Link>
						</Button>

						<Button
							variant={isStoreUpdate ? "success" : "ghost"}
							className="py-1 px-4 h-auto"
							asChild
						>
							<Link href="/supply/counter?isUpdate=true">
								Update
							</Link>
						</Button>
					</div>

					{isStoreUpdate && !counterInfo && (
						<div className="p-1 flex items-center border border-black rounded-full">
							<input
								className="py-2 px-4 h-8 bg-transparent rounded-full !outline-0"
								onChange={(e) =>
									setSearchFilter(e.target.value)
								}
								placeholder="Search..."
							/>

							<button className="p-1" onClick={fetchCounter}>
								<RefreshCcw size={20} />
							</button>
						</div>
					)}
				</div>

				{isStoreUpdate ? (
					<>
						{!counterInfo && (
							<div className="w-full">
								<DataTable
									columns={columns}
									data={filteredStoreUnbilled}
									isLoading={isLoading}
								/>
							</div>
						)}

						{counterInfo && (
							<div className="mx-auto w-full max-w-[500px] space-y-2">
								<div className="flex flex-col items-center">
									<Button
										variant="link"
										className="p-0"
										onClick={() => {
											fetchCounter();
											setCounterInfo(null);
										}}
									>
										Go Back
									</Button>

									<h5 className="text-center">
										Doc Number: {counterInfo?.doc_no}{" "}
										{isStoreUpdate && "(UPDATE)"}
									</h5>
								</div>

								<CounterForm
									allowedFields={allowedFields}
									defaultValues={storeDefaultValue}
									counterInfo={counterInfo}
									isUpdate={true}
								/>
							</div>
						)}
					</>
				) : (
					<div className="mx-auto w-full max-w-[500px] space-y-2">
						<CounterForm
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

export default withAuth(SupplyCounterPage);
