import React from "react";
import PageLayout from "../../../layouts/PageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import SupplyNavlinks from "../../../modules/supply/SupplyLayout";
import Link from "next/link";
import SStoreForm from "../../../modules/supply/SStoreForm";

const _defaultValues = {
	store: "",
	doc_type: "",
	doc_no: "",
	doc_date: "",
	po_no: "",
	po_date: "",
	supply: "",
	customer_name: "",
	ready: false,
	ready_to_bill: false,
};

const SupplyStorePage = () => {
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
						<Link href="/supply/store">Create</Link>
					</Button>

					<Button
						variant="ghost"
						className="py-1 px-4 h-auto"
						asChild
					>
						<Link href="/supply/store/update">Update</Link>
					</Button>

					<Button
						variant="ghost"
						className="py-1 px-4 h-auto"
						asChild
					>
						<Link href="/supply/store/add">Add</Link>
					</Button>
				</div>

				<div className="mx-auto w-full max-w-[500px] space-y-2">
					<SStoreForm defaultValues={_defaultValues} />
				</div>
			</div>
		</PageLayout>
	);
};

export default withAuth(SupplyStorePage, "supply_store-create");
