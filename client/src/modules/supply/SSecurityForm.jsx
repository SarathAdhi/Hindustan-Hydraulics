import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import axios from "../../lib/axios";
import { ApiRoutes } from "../../utils/api-routes";

const SSecurityForm = ({
	defaultValues,
	allowedFields,
	securityInfo,
	view = "counter",
}) => {
	const { register, handleSubmit, setValue, getValues, reset } = useForm({
		defaultValues: defaultValues[view],
	});

	console.log(defaultValues[view]);

	async function handleSecurityForm(values) {
		console.log({ values });

		try {
			if (view === "counter") {
				console.log("counter");

				const { book_register_no, security_out, type, counter_no } =
					values;

				await axios.post(ApiRoutes.supply.security.entry, {
					book_register_no: parseInt(book_register_no),
					security_out,
					type,
					counter_no,
				});
			} else if (view === "store") {
				console.log("store");

				const { book_register_no, security_out, type, doc_no } = values;

				await axios.post(ApiRoutes.supply.security.entry, {
					book_register_no: parseInt(book_register_no),
					security_out,
					type,
					doc_no,
				});
			} else if (view.includes("entry-")) {
				console.log("entry-put");

				await axios.put(
					ApiRoutes.supply.security.update(securityInfo),
					values
				);
			} else {
				alert("Something went wrong");
			}

			reset();
		} catch (error) {
			console.log({ error });
		}
	}

	return (
		<form
			onSubmit={handleSubmit(handleSecurityForm)}
			className="card flex flex-col items-center gap-4"
		>
			<Input
				{...register("po_no", { required: true })}
				label="Purchase order number"
				placeholder="Enter the Purchase order number"
				required
				disabled={!allowedFields?.po_no}
			/>

			<Input
				{...register("book_register_no", { required: true })}
				type="number"
				label="Book Register number"
				placeholder="Enter the Book Register number"
				required
				disabled={!allowedFields?.book_register_no}
			/>

			<Checkbox
				name="bill_checked"
				defaultChecked={getValues("bill_checked")}
				onCheckedChange={(e) => setValue("bill_checked", e)}
				label="Bill Checked"
				disabled={!allowedFields?.bill_checked}
			/>

			<Checkbox
				name="security_out"
				defaultChecked={getValues("security_out")}
				onCheckedChange={(e) => setValue("security_out", e)}
				label="Ready to Go Out"
				disabled={!allowedFields?.security_out}
			/>

			<Button type="submit">Submit</Button>
		</form>
	);
};

export default SSecurityForm;
