import React, { useEffect, useState } from "react";
import PageLayout from "../../../layouts/PageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import axios from "../../../lib/axios";
import SupplyNavlinks from "../../../modules/supply/SupplyLayout";
import { useRouter } from "next/router";
import { Loader } from "lucide-react";
import SSecurityForm from "../../../modules/supply/SSecurityForm";

const _defaultValues = {
	counter: null,
	store: null,
	entry: null,
};

const SupplySecurityPage = () => {
	const { query, replace } = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [defaultValue, setDefaultValue] = useState(_defaultValues);
	const [allowedFields, setAllowedFields] = useState({});

	const action = query?.action;
	const ref_no = query?.ref_no;
	const type = query?.type;

	useEffect(() => {
		if (action === "edit") {
			axios.get("/supply/security/modify/allowed").then((res) => {
				const fields = {};
				res.map((e) => (fields[e] = true));
				setAllowedFields(fields);
			});
		}
	}, [action]);

	async function fetchSecurityRecords() {
		setIsLoading(true);

		let data = await axios.get(`/supply/security/?ref_no=${ref_no}`);

		console.log({ data });

		if (action !== "create" && !data) {
			replace(`/supply/security/create?ref_no=${ref_no}&type=${type}`);
		} else if (data && action !== "edit") {
			replace(`/supply/security/edit?ref_no=${ref_no}&type=${type}`);
		}
		// let data = await axios.get(
		// 	`/supply/store/?doc_no=${ref_no}&store=${store}`
		// );

		setDefaultValue(data);
		setIsLoading(false);
	}

	useEffect(() => {
		if (ref_no) fetchSecurityRecords();
	}, [ref_no]);

	console.log({ allowedFields });

	return (
		<PageLayout className="flex flex-col gap-4">
			<SupplyNavlinks className="mx-auto w-full max-w-[500px]" />

			<div className="w-full flex flex-col items-center gap-2">
				<div className="mx-auto w-full max-w-[500px] space-y-2">
					<div className="flex flex-col items-center">
						<Button
							variant="link"
							className="p-0"
							onClick={() => history.back()}
						>
							Go Back
						</Button>
					</div>

					{isLoading ? (
						<Loader className="animate-spin" />
					) : (
						<SSecurityForm
							allowedFields={allowedFields}
							defaultValues={defaultValue}
							type={type}
							securityInfo={{
								ref_no,
							}}
						/>
					)}
				</div>
			</div>
		</PageLayout>
	);
};

export default withAuth(SupplySecurityPage, "supply_security");
