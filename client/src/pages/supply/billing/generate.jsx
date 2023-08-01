import React, { useEffect, useState } from "react";
import PageLayout from "../../../layouts/PageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import axios from "../../../lib/axios";
import SupplyNavlinks from "../../../modules/supply/SupplyLayout";
import {
	docTypeOptions,
	routingOptions,
	storeStatusOptions,
} from "../../../utils/constants";
import { DataTable } from "../../../components/DataTable";
import BillingForm from "../../../modules/supply/BillingForm";
import dayjs from "dayjs";
import { RefreshCcw, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../components/ui/popover";
import { Close } from "@radix-ui/react-popover";
import { ApiRoutes } from "../../../utils/api-routes";

const _defaultValues = {
	order_status: "",
	bill_no: "",
	bill_date: "",
	routing: "",
	routing_name: "",
	routing_receipt_no: "",
	bill_ready: false,
};

const SupplyBillingGeneratePage = () => {
	const { query } = useRouter();

	const doc_no = query?.doc_no;
	const doc_type = query?.doc_type;

	return (
		<>
			<PageLayout className="flex flex-col gap-4">
				<SupplyNavlinks className="mx-auto w-full max-w-[500px]" />

				<div className="mx-auto w-full max-w-[500px] space-y-2">
					<div className="flex flex-col items-center">
						<Button variant="link" className="p-0" asChild>
							<Link href="/supply/billing">Go Back</Link>
						</Button>

						<h5 className="text-center">Doc Number: {doc_no}</h5>
					</div>

					<BillingForm
						defaultValues={_defaultValues}
						docInfo={{
							doc_no,
							doc_type,
						}}
					/>
				</div>
			</PageLayout>
		</>
	);
};

export default withAuth(SupplyBillingGeneratePage, "supply_billing");
