import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import axios from "../../lib/axios";
import { ApiRoutes } from "../../utils/api-routes";
import { orderStatusOptions, routingOptions } from "../../utils/constants";

const BillingForm = ({
	defaultValues,
	allowedFields,
	docInfo,
	isUpdate = false,
}) => {
	const { register, handleSubmit, setValue, getValues } = useForm({
		defaultValues,
	});

	async function handleBillingForm(values) {
		try {
			if (isUpdate) {
				const { order_status, routing, bill_ready } = values;

				await axios.put(
					ApiRoutes.supply.billing.update({
						...docInfo,
					}),
					{
						order_status,
						routing,
						bill_ready,
					}
				);
			} else {
				const { bill_no, ...rest } = docInfo;

				await axios.post(ApiRoutes.supply.billing.generate, {
					...values,
					...rest,
				});
			}
		} catch (error) {
			console.log({ error });
		}
	}

	return (
		<div className="w-full flex flex-col gap-4">
			<form
				className="card flex flex-col items-center gap-4"
				onSubmit={handleSubmit(handleBillingForm)}
			>
				<div className="w-full flex flex-col gap-2">
					<Label className="capitalize" htmlFor="order_status">
						Order Status <span className="text-red-500">*</span>
					</Label>

					<Select
						name="order_status"
						defaultValue={getValues("order_status")}
						onValueChange={(e) => setValue("order_status", e)}
						disabled={isUpdate && !allowedFields?.order_status}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select an option" />
						</SelectTrigger>

						<SelectContent>
							{orderStatusOptions.map(({ label, value }) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<Input
					{...register("bill_no", { required: true })}
					label="Bill number"
					placeholder="Enter the Bill number"
					required
					disabled={isUpdate && !allowedFields?.bill_no}
				/>

				<Input
					type="date"
					{...register("bill_date", { required: !isUpdate })}
					label="Bill Date"
					required
					disabled={isUpdate && !allowedFields?.bill_date}
				/>

				<div className="w-full flex flex-col gap-2">
					<Label className="capitalize" htmlFor="routing">
						Routing <span className="text-red-500">*</span>
					</Label>

					<Select
						name="routing"
						defaultValue={getValues("routing")}
						onValueChange={(e) => setValue("routing", e)}
						disabled={isUpdate && !allowedFields?.routing}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select the Routing" />
						</SelectTrigger>

						<SelectContent>
							{routingOptions.map(({ label, value }) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<Checkbox
					name="bill_ready"
					defaultChecked={getValues("bill_ready")}
					onCheckedChange={(e) => setValue("bill_ready", e)}
					label="Bill ready"
					disabled={isUpdate && !allowedFields?.bill_ready}
				/>

				<Button variant={isUpdate ? "success" : ""} type="submit">
					{isUpdate ? "Update" : "Submit"}
				</Button>
			</form>
		</div>
	);
};

export default BillingForm;
