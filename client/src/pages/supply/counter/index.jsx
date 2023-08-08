import React from "react";
import PageLayout from "../../../layouts/PageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import SupplyNavlinks from "../../../modules/supply/SupplyLayout";
import Link from "next/link";
import CounterForm from "../../../modules/supply/CounterForm";

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
	return (
		<PageLayout className="flex flex-col gap-4">
			<SupplyNavlinks className="mx-auto w-full max-w-[500px]" />

			<div className="w-full flex flex-col items-center gap-2">
				<div className="border border-black bg-gray-300 p-1 rounded-md flex items-center gap-1">
					<Button
						variant="success"
						className="py-1 px-4 h-auto"
						asChild
					>
						<Link href="/supply/counter">Create</Link>
					</Button>

					<Button
						variant="ghost"
						className="py-1 px-4 h-auto"
						asChild
					>
						<Link href="/supply/counter/update">Update</Link>
					</Button>
				</div>

				<div className="mx-auto w-full max-w-[500px] space-y-2">
					<CounterForm
						defaultValues={_defaultValues}
						isUpdate={false}
					/>
				</div>
			</div>
		</PageLayout>
	);
};

export default withAuth(SupplyCounterPage, "supply_counter-create");
