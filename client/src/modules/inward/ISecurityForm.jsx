import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import axios from "../../lib/axios";
import { ApiRoutes } from "../../utils/api-routes";

const ISecurityForm = ({
	defaultValues,
	allowedFields,
	securityInfo,
	view = "create",
}) => {
	const { register, handleSubmit, setValue, getValues, reset } = useForm({
		defaultValues: defaultValues,
	});

	async function handleSecurityForm(values) {
		try {
			if (view === "create") {
				const { security_inward, inward_reg_no, bill_checked } = values;

				await axios.post(ApiRoutes.inward.security.create, {
					security_inward,
					inward_reg_no: inward_reg_no,
					bill_checked,
					...securityInfo,
				});
			} else if (view === "update") {
				const { security_inward, inward_reg_no, bill_checked } = values;

				await axios.put(
					ApiRoutes.inward.security.update(securityInfo),
					{
						security_inward,
						inward_reg_no: inward_reg_no,
						bill_checked,
					}
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
				{...register("inward_reg_no", { required: true })}
				label="Inward number"
				placeholder="Enter the Inward number"
				required
				disabled={!allowedFields?.inward_reg_no}
			/>

			<Checkbox
				name="bill_checked"
				defaultChecked={getValues("bill_checked")}
				onCheckedChange={(e) => setValue("bill_checked", e)}
				label="Bill Checked"
				disabled={!allowedFields?.bill_checked}
			/>

			<Checkbox
				name="security_inward"
				defaultChecked={getValues("security_inward")}
				onCheckedChange={(e) => setValue("security_inward", e)}
				label="Security Entry"
				disabled={!allowedFields?.security_inward}
			/>

			<Button type="submit">Submit</Button>
		</form>
	);
};

export default ISecurityForm;
