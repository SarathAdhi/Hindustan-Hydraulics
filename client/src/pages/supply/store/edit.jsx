import React, { useEffect, useState } from "react";
import PageLayout from "../../../layouts/PageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import axios from "../../../lib/axios";
import SupplyNavlinks from "../../../modules/supply/SupplyLayout";
import { useRouter } from "next/router";
import { Loader } from "lucide-react";
import SStoreForm from "../../../modules/supply/SStoreForm";
import dayjs from "dayjs";
import Link from "next/link";

const SupplyStorePage = () => {
	const { query } = useRouter();

	const doc_id = query?.doc_no;
	// For /supply/store/add
	const isAddType = query?.type === "add";

	const [isLoading, setIsLoading] = useState(true);
	const [storeDefaultValue, setStoreDefaultValue] = useState({});
	const [allowedFields, setAllowedFields] = useState({});

	async function fetchStoreUnbilled() {
		setIsLoading(true);

		const data = await axios.get(`/supply/store/${doc_id}`);

		setStoreDefaultValue({
			...data[0],
			po_date: dayjs(data[0]?.po_date).format("YYYY-MM-DD"),
			doc_date: dayjs(data[0]?.doc_date).format("YYYY-MM-DD"),
		});

		const res = await axios.get(
			isAddType
				? "/supply/store/add_stores/modify/allowed"
				: "/supply/store/modify/allowed"
		);
		const fields = {};
		res.map((e) => (fields[e] = true));

		setAllowedFields(fields);
		setIsLoading(false);
	}

	useEffect(() => {
		if (doc_id) fetchStoreUnbilled();
	}, [doc_id]);

	return (
		<PageLayout className="flex flex-col gap-4">
			<SupplyNavlinks className="mx-auto w-full max-w-[500px]" />

			<div className="w-full flex flex-col items-center gap-2">
				{isLoading ? (
					<Loader className="animate-spin" />
				) : (
					<div className="mx-auto w-full max-w-[500px] space-y-2">
						<div className="flex flex-col items-center">
							<Button variant="link" className="p-0" asChild>
								<Link href="/supply/store/update">Go Back</Link>
							</Button>

							<h5 className="text-center">
								Doc Number: {storeDefaultValue?.doc_no}
								{" (UPDATE)"}
							</h5>
						</div>

						<SStoreForm
							allowedFields={allowedFields}
							defaultValues={storeDefaultValue}
							storeInfo={{
								doc_no: doc_id,
								store: storeDefaultValue?.store,
							}}
							isAddType={isAddType}
							isUpdate={!isAddType}
						/>
					</div>
				)}
			</div>
		</PageLayout>
	);
};

export default withAuth(SupplyStorePage, "supply_store");
