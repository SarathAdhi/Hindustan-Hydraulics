import React, { useEffect, useState } from "react";
import PageLayout from "../../../layouts/PageLayout";
import { Button } from "../../../components/ui/button";
import { withAuth } from "../../../hoc/withAuth";
import axios from "../../../lib/axios";
import SupplyNavlinks from "../../../modules/supply/SupplyLayout";
import { useRouter } from "next/router";
import { Loader } from "lucide-react";
import CounterForm from "../../../modules/supply/CounterForm";
import Link from "next/link";
import dayjs from "dayjs";

const SupplyCounterEditPage = () => {
	const { query } = useRouter();

	const counter_no = query?.counter_no;

	const [isLoading, setIsLoading] = useState(true);
	const [storeDefaultValue, setStoreDefaultValue] = useState({});
	const [allowedFields, setAllowedFields] = useState({});

	async function fetchCounter() {
		setIsLoading(true);

		const data = await axios.get(
			`/supply/counter/counter?counter_no=${counter_no}`
		);
		setStoreDefaultValue({
			...data,
			counter_date: dayjs(data?.counter_date).format("YYYY-MM-DD"),
		});

		const res = await axios.get("/supply/counter/modify/allowed");
		const fields = {};
		res.map((e) => (fields[e] = true));

		setAllowedFields(fields);

		setIsLoading(false);
	}

	useEffect(() => {
		if (counter_no) fetchCounter();
	}, [counter_no]);

	return (
		<PageLayout
			title={`Supply Counter - ${counter_no}`}
			className="flex flex-col gap-4"
		>
			<SupplyNavlinks className="mx-auto w-full max-w-[500px]" />

			<div className="w-full flex flex-col items-center gap-2">
				{isLoading ? (
					<Loader className="animate-spin" />
				) : (
					<div className="mx-auto w-full max-w-[500px] space-y-2">
						<div className="flex flex-col items-center">
							<Button variant="link" className="p-0" asChild>
								<Link href="/supply/counter/update">
									Go Back
								</Link>
							</Button>

							<h5 className="text-center">
								Counter Number: {counter_no}
								{" (UPDATE)"}
							</h5>
						</div>

						<CounterForm
							allowedFields={allowedFields}
							defaultValues={storeDefaultValue}
							counterInfo={{ counter_no }}
							isUpdate={true}
						/>
					</div>
				)}
			</div>
		</PageLayout>
	);
};

export default withAuth(SupplyCounterEditPage, "supply_counter-create");
