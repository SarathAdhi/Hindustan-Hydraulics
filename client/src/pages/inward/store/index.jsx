import React from "react";
import PageLayout from "../../../layouts/PageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import InwardPageLayout from "../../../modules/inward/InwardPageLayout";
import Link from "next/link";
import IStoreForm from "../../../modules/inward/IStoreForm";

const _defaultValues = {
	store: "",
	supplier_name: "",
	doc_type: "",
	doc_no: "",
	doc_date: "",
	routing: "",
	routing_name: "",
	routing_receipt_no: "",
	received: false,
};

const InwardStorePage = () => {
	return (
		<PageLayout className="flex flex-col gap-4">
			<InwardPageLayout className="mx-auto w-full max-w-[500px]" />

			<div className="w-full flex flex-col items-center gap-2">
				<div className="border border-black bg-gray-300 p-1 rounded-md flex items-center gap-1">
					<Button
						variant="success"
						className="py-1 px-4 h-auto"
						asChild
					>
						<Link href="/inward/store">Create</Link>
					</Button>

					<Button
						variant="ghost"
						className="py-1 px-4 h-auto"
						asChild
					>
						<Link href="/inward/store/update">Update</Link>
					</Button>
				</div>

				<div className="mx-auto w-full max-w-[500px] space-y-2">
					<IStoreForm
						defaultValues={_defaultValues}
						isUpdate={false}
					/>
				</div>
			</div>
		</PageLayout>
	);
};

export default withAuth(InwardStorePage, ["inward_store-create"]);
