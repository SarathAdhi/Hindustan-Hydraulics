import React, { useEffect, useState } from "react";
import PageLayout from "../../../layouts/PageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import axios from "../../../lib/axios";
import SupplyNavlinks from "../../../modules/supply/SupplyLayout";
import BillingForm from "../../../modules/supply/BillingForm";
import dayjs from "dayjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";

const SupplyBillingEditPage = () => {
	const { query } = useRouter();

	const doc_no = query?.doc_no;
	const bill_no = query?.bill_no;

	const [allowedFields, setAllowedFields] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [billingDefaultValue, setBillingDefaultValue] = useState({});

	async function fetchBill() {
		setIsLoading(true);

		const data = await axios.get(
			`/supply/bill/?doc_no=${doc_no}&bill_no=${bill_no}`
		);

		setBillingDefaultValue({
			...data,
			bill_date: dayjs(data?.bill_date).format("YYYY-MM-DD"),
		});

		const res = await axios.get("/supply/bill/modify/allowed");

		const fields = {};
		res.map((e) => (fields[e] = true));

		setAllowedFields(fields);
		setIsLoading(false);
	}

	useEffect(() => {
		if (doc_no) fetchBill();
	}, [doc_no]);

	return (
		<>
			<PageLayout className="flex flex-col items-center gap-4">
				<SupplyNavlinks className="mx-auto w-full max-w-[500px]" />

				{isLoading ? (
					<div>
						<Loader className="animate-spin" />
					</div>
				) : (
					<div className="mx-auto w-full max-w-[500px] space-y-2">
						<div className="flex flex-col items-center">
							<Button variant="link" className="p-0" asChild>
								<Link href="/supply/billing/billed">
									Go Back
								</Link>
							</Button>

							<h5 className="text-center">
								Doc Number: {doc_no}
								{" (UPDATE)"}
							</h5>
						</div>

						<BillingForm
							allowedFields={allowedFields}
							defaultValues={billingDefaultValue}
							docInfo={{
								doc_no,
								bill_no,
							}}
							isUpdate
						/>
					</div>
				)}
			</PageLayout>
		</>
	);
};

export default withAuth(SupplyBillingEditPage, "supply_billing");
