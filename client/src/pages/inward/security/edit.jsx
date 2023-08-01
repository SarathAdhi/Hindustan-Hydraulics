import React, { useEffect, useState } from "react";
import PageLayout from "../../../layouts/PageLayout";
import InwardPageLayout from "../../../modules/inward/InwardPageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import axios from "../../../lib/axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { Loader } from "lucide-react";
import ISecurityForm from "../../../modules/inward/ISecurityForm";

const InwardSecurityEditPage = () => {
	const { query } = useRouter();

	const doc_id = query?.doc_no;

	const [isLoading, setIsLoading] = useState(true);
	const [securityDefaultValue, setSecurityDefaultValue] = useState({});
	const [allowedFields, setAllowedFields] = useState({});

	async function fetchSecurityRecord() {
		setIsLoading(true);

		let data = await axios.get(`/inward/security/?doc_no=${doc_id}`);
		setSecurityDefaultValue(data[0]);

		const res = await axios.get("/inward/security/modify/allowed");
		const fields = {};
		res.map((e) => (fields[e] = true));

		setAllowedFields(fields);

		setIsLoading(false);
	}

	useEffect(() => {
		if (doc_id) fetchSecurityRecord();
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
					<div className="mx-auto w-full max-w-[500px] space-y-2">
						<div className="flex flex-col items-center">
							<Button variant="link" className="p-0" asChild>
								<Link href="/inward/security/update">
									Go Back
								</Link>
							</Button>
						</div>

						<ISecurityForm
							allowedFields={allowedFields}
							defaultValues={securityDefaultValue}
							securityInfo={{
								doc_no: doc_id,
							}}
							isUpdate
						/>
					</div>
				)}
			</div>
		</PageLayout>
	);
};

export default withAuth(InwardSecurityEditPage, "inward_security");
