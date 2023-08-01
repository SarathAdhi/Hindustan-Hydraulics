import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import axios from "../../lib/axios";
import { ApiRoutes } from "../../utils/api-routes";
import { parseObject } from "../../utils/parse-object";

const ISecurityForm = ({
	defaultValues,
	allowedFields,
	securityInfo,
	isUpdate = false,
}) => {
	const { register, handleSubmit, setValue, getValues, reset, watch } =
		useForm({
			defaultValues: defaultValues,
		});

	const btnDisabled = !(watch("bill_checked") || watch("security_inward"));

	async function handleSecurityForm(values) {
		try {
			if (!isUpdate) {
				const { security_inward, inward_reg_no, bill_checked } = values;

				await axios.post(ApiRoutes.inward.security.create, {
					security_inward,
					inward_reg_no: inward_reg_no,
					bill_checked,
					...securityInfo,
				});

				reset();
			} else {
				const updateValues = parseObject(
					values,
					Object.keys(allowedFields)
				);

				await axios.put(
					ApiRoutes.inward.security.update(securityInfo),
					updateValues
				);
			}
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
				disabled={isUpdate && !allowedFields?.inward_reg_no}
			/>

			<Checkbox
				name="bill_checked"
				label="Bill Checked"
				defaultChecked={getValues("bill_checked")}
				onCheckedChange={(e) => setValue("bill_checked", e)}
				disabled={isUpdate && !allowedFields?.bill_checked}
			/>

			<Checkbox
				name="security_inward"
				defaultChecked={getValues("security_inward")}
				onCheckedChange={(e) => setValue("security_inward", e)}
				label="Security Entry"
				disabled={isUpdate && !allowedFields?.security_inward}
			/>

			<Button disabled={btnDisabled} type="submit">
				{isUpdate ? "Update" : "Submit"}
			</Button>
		</form>
	);
};

export default ISecurityForm;
