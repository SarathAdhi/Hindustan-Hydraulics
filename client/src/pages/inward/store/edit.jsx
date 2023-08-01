import React, { useEffect, useState } from "react";
import PageLayout from "../../../layouts/PageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import axios from "../../../lib/axios";
import InwardPageLayout from "../../../modules/inward/InwardPageLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import { Loader } from "lucide-react";
import IStoreForm from "../../../modules/inward/IStoreForm";
import dayjs from "dayjs";

const InwardStoreEditPage = () => {
	const { query } = useRouter();

	const doc_id = query?.doc_no;

	const [isLoading, setIsLoading] = useState(true);
	const [storeDefaultValue, setStoreDefaultValue] = useState({});
	const [allowedFields, setAllowedFields] = useState({});

	async function getStoreData() {
		const defaultValue = await axios.get(`/inward/store/?doc_no=${doc_id}`);
		setStoreDefaultValue({
			...defaultValue[0],
			doc_date: dayjs(defaultValue[0]?.doc_date).format("YYYY-MM-DD"),
		});

		const res = await axios.get("/inward/store/modify/allowed");
		const fields = {};
		res.map((e) => (fields[e] = true));
		setAllowedFields(fields);

		setIsLoading(false);
	}

	useEffect(() => {
		if (doc_id) getStoreData();
	}, [doc_id]);

	return (
		<PageLayout className="flex flex-col gap-4">
			<InwardPageLayout className="mx-auto w-full max-w-[500px]" />

			<div className="w-full flex flex-col items-center gap-2">
				{isLoading ? (
					<div>
						<Loader className="animate-spin" />
					</div>
				) : (
					<div className="w-full">
						<div className="mx-auto w-full max-w-[500px] space-y-2">
							<div className="flex flex-col items-center">
								<Button variant="link" className="p-0" asChild>
									<Link href="/inward/store/update">
										Go Back
									</Link>
								</Button>

								<h5 className="text-center">
									Doc Number: {storeDefaultValue?.doc_no}
									{" (UPDATE)"}
								</h5>
							</div>

							<IStoreForm
								allowedFields={allowedFields}
								defaultValues={storeDefaultValue}
								storeInfo={{
									doc_no: storeDefaultValue?.doc_no,
									store: storeDefaultValue?.store,
								}}
								isUpdate={true}
							/>
						</div>
					</div>
				)}
			</div>
		</PageLayout>
	);
};

export default withAuth(InwardStoreEditPage, "inward_store");
