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
	type = "counter",
}) => {
	const { register, handleSubmit, setValue, getValues, reset, watch } =
		useForm({
			defaultValues: {
				bill_checked: false,
				security_out: false,
				book_register_no: defaultValues?.reg_no,
				...defaultValues,
			},
		});

	const btnDisabled = !watch("security_out");

	async function handleSecurityForm(values) {
		try {
			if (type === "counter") {
				console.log("counter");

				const {
					book_register_no,
					security_out,
					counter_no,
					bill_checked,
				} = values;

				await axios.post(ApiRoutes.supply.security.entry, {
					type: type,
					book_register_no: book_register_no,
					security_out,
					counter_no,
					bill_checked,
				});
			} else if (type === "store") {
				console.log("store");

				const { book_register_no, security_out, doc_no, bill_checked } =
					values;

				await axios.post(ApiRoutes.supply.security.entry, {
					type: type,
					doc_no: securityInfo?.ref_no,
					book_register_no: book_register_no,
					security_out,
					bill_checked,
				});
			} else if (type.includes("entry-")) {
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
				{...register("book_register_no", { required: true })}
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
				{...register("security_out", { required: true })}
				name="security_out"
				defaultChecked={getValues("security_out")}
				onCheckedChange={(e) => setValue("security_out", e)}
				label="Ready to Go Out"
				disabled={!allowedFields?.security_out}
			/>

			<Button disabled={btnDisabled} type="submit">
				{type.includes("entry-") ? "Update" : "Submit"}
			</Button>
		</form>
	);
};

export default SSecurityForm;
