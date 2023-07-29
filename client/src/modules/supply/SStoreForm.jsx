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
import {
	docTypeOptions,
	storeOptions,
	storeStatusOptions,
} from "../../utils/constants";

const SStoreForm = ({
	defaultValues,
	allowedFields,
	storeInfo,
	isUpdate = false,
}) => {
	const { register, handleSubmit, setValue, getValues, reset } = useForm({
		defaultValues,
	});

	async function handleStoreForm(values) {
		try {
			if (isUpdate) {
				// const { order_status, routing, bill_ready, bill_date } = values;

				await axios.put(
					ApiRoutes.supply.store.update({
						...storeInfo,
					}),
					{
						...values,
					}
				);
			} else {
				await axios.post(ApiRoutes.supply.store.entry, values);

				reset();
			}
		} catch (error) {
			console.log({ error });
		}
	}

	return (
		<form
			onSubmit={handleSubmit(handleStoreForm)}
			className="card flex flex-col gap-4"
		>
			<div className="w-full flex flex-col gap-2">
				<Label className="capitalize" htmlFor="store">
					Store Name <span className="text-red-500">*</span>
				</Label>

				<Select
					name="store"
					defaultValue={getValues("store")}
					onValueChange={(e) => setValue("store", e)}
					disabled={isUpdate && !allowedFields?.store}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select the store" />
					</SelectTrigger>

					<SelectContent>
						{storeOptions.map(({ label, value }) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="w-full flex flex-col gap-2">
				<Label className="capitalize" htmlFor="store">
					Doc Type <span className="text-red-500">*</span>
				</Label>

				<Select
					defaultValue={getValues("doc_type")}
					onValueChange={(e) => setValue("doc_type", e)}
					disabled={isUpdate && !allowedFields?.doc_type}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select the Doc type" />
					</SelectTrigger>

					<SelectContent>
						{docTypeOptions.map(({ label, value }) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Input
				{...register("doc_no", { required: true })}
				label="Doc number"
				placeholder="Enter the Doc number"
				required
				disabled={isUpdate && !allowedFields?.doc_no}
			/>

			<Input
				type="date"
				{...register("doc_date", { required: true })}
				label="Doc Date"
				required
				disabled={isUpdate && !allowedFields?.doc_date}
			/>

			<Input
				{...register("po_no", { required: true })}
				label="Purchase order number"
				placeholder="Enter the Purchase order number"
				required
				disabled={isUpdate && !allowedFields?.po_no}
			/>

			<Input
				type="date"
				{...register("po_date", { required: true })}
				label="Purchase order Date"
				required
				disabled={isUpdate && !allowedFields?.po_date}
			/>

			<Input
				{...register("customer_name", { required: true })}
				label="Customer Name"
				placeholder="Enter the Customer Name"
				required
				disabled={isUpdate && !allowedFields?.customer_name}
			/>

			<div className="w-full flex flex-col gap-2">
				<Label className="capitalize" htmlFor="supply">
					Supply <span className="text-red-500">*</span>
				</Label>

				<Select
					name="supply"
					defaultValue={getValues("supply")}
					onValueChange={(e) => setValue("supply", e)}
					disabled={isUpdate && !allowedFields?.supply}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select the supply" />
					</SelectTrigger>

					<SelectContent>
						{storeStatusOptions.map(({ label, value }) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Checkbox
				name="ready"
				defaultChecked={getValues("ready")}
				onCheckedChange={(e) => setValue("ready", e)}
				label="Ready"
				disabled={isUpdate && !allowedFields?.ready}
			/>

			<Checkbox
				name="ready_to_bill"
				defaultChecked={getValues("ready_to_bill")}
				onCheckedChange={(e) => setValue("ready_to_bill", e)}
				label="Ready to bill"
				disabled={isUpdate && !allowedFields?.ready_to_bill}
			/>

			<Button type="submit">{isUpdate ? "Update" : "Submit"}</Button>
		</form>
	);
};

export default SStoreForm;
