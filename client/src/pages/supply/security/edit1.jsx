import React, { useEffect, useState } from "react";
import PageLayout from "../../../layouts/PageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import axios from "../../../lib/axios";
import SupplyNavlinks from "../../../modules/supply/SupplyLayout";
import {
	counterTypeOptions,
	docTypeOptions,
	routingOptions,
	storeStatusOptions,
} from "../../../utils/constants";
import { useRouter } from "next/router";
import Link from "next/link";
import { RefreshCcw, TrashIcon } from "lucide-react";
import { DataTable } from "../../../components/DataTable";
import dayjs from "dayjs";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../components/ui/popover";
import { Close } from "@radix-ui/react-popover";
import { ApiRoutes } from "../../../utils/api-routes";
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

	const ref_no = query?.ref_no;
	const view = query?.type;

	useEffect(() => {
		axios.get("/supply/security/modify/allowed").then((res) => {
			const fields = {};
			res.map((e) => (fields[e] = true));
			setAllowedFields(fields);
		});
	}, []);

	async function fetchSecurityRecords() {
		setIsLoading(true);

		// let data = await axios.get(`/supply/security/?ref_no=${ref_no}`);
		let data = await axios.get(
			`/supply/counter/counter?counter_no=${ref_no}`
		);

		setDefaultValue(data);
		setIsLoading(false);
	}

	useEffect(() => {
		if (ref_no) fetchSecurityRecords();
	}, [ref_no]);

	return (
		<PageLayout className="flex flex-col gap-4">
			<SupplyNavlinks className="mx-auto w-full max-w-[500px]" />

			<div className="w-full flex flex-col items-center gap-2">
				<div className="mx-auto w-full max-w-[500px] space-y-2">
					<div className="flex flex-col items-center">
						<Button variant="link" className="p-0">
							Go Back
						</Button>
					</div>

					<SSecurityForm
						allowedFields={allowedFields}
						defaultValues={defaultValue}
						view={view}
						securityInfo={{}}
					/>
				</div>
			</div>
		</PageLayout>
	);
};

export default withAuth(SupplySecurityPage, "supply_security");
