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
import axios from "../../lib/axios";
import { ApiRoutes } from "../../utils/api-routes";
import { counterTypeOptions, routingOptions } from "../../utils/constants";

const CounterForm = ({
	defaultValues,
	allowedFields,
	counterInfo,
	isUpdate = false,
}) => {
	const { register, handleSubmit, setValue, getValues, reset } = useForm({
		defaultValues,
	});

	async function handleCounterForm(values) {
		try {
			if (isUpdate) {
				// const { order_status, routing, bill_ready, bill_date } = values;

				await axios.put(
					ApiRoutes.supply.counter.update({
						...counterInfo,
					}),
					{
						...values,
					}
				);
			} else {
				await axios.post(ApiRoutes.supply.counter.entry, values);

				reset();
			}
		} catch (error) {
			console.log({ error });
		}
	}

	return (
		<form
			onSubmit={handleSubmit(handleCounterForm)}
			className="card flex flex-col items-center gap-4"
		>
			<div className="w-full flex flex-col gap-2">
				<Label className="capitalize" htmlFor="counter_no_type">
					Counter Type <span className="text-red-500">*</span>
				</Label>

				<Select
					defaultValue={getValues("counter_no_type")}
					onValueChange={(e) => setValue("counter_no_type", e)}
					disabled={isUpdate && !allowedFields?.counter_no_type}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select the counter type" />
					</SelectTrigger>

					<SelectContent>
						{counterTypeOptions.map(({ label, value }) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Input
				{...register("counter_no", { required: true })}
				label="Counter number"
				placeholder="Enter the Counter number"
				required
				disabled={isUpdate && !allowedFields?.counter_no}
			/>

			<Input
				{...register("counter_date", { required: true })}
				type="date"
				label="Counter Date"
				required
				disabled={isUpdate && !allowedFields?.counter_date}
			/>

			<Input
				{...register("customer_name", { required: true })}
				label="Customer name"
				placeholder="Enter the Customer name"
				required
				disabled={isUpdate && !allowedFields?.customer_name}
			/>

			<div className="w-full flex flex-col gap-2">
				<Label className="capitalize" htmlFor="routing">
					Routing <span className="text-red-500">*</span>
				</Label>

				<Select
					defaultValue={getValues("routing")}
					onValueChange={(e) => setValue("routing", e)}
					disabled={isUpdate && !allowedFields?.routing}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select the routing" />
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

			<Button type="submit">{isUpdate ? "Update" : "Submit"}</Button>
		</form>
	);
};

export default CounterForm;
