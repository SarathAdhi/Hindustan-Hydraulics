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
	inwardDocTypeOptions,
	inwardStoreOptions,
} from "../../utils/constants";

const IStoreForm = ({
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
			className="mx-auto w-full max-w-[500px] card flex flex-col items-center gap-4"
		>
			<div className="w-full flex flex-col gap-2">
				<Label className="capitalize" htmlFor="store">
					Store <span className="text-red-500">*</span>
				</Label>

				<Select
					defaultValue={getValues("store")}
					onValueChange={(e) => setValue("store", e)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select the store" />
					</SelectTrigger>

					<SelectContent>
						{inwardStoreOptions.map(({ label, value }) => (
							<SelectItem value={value}>{label}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Input
				{...register("supplier_name", { required: true })}
				label="Supplier Name"
				placeholder="Enter the Customer name"
				required
			/>

			<div className="w-full flex flex-col gap-2">
				<Label className="capitalize" htmlFor="store">
					Doc Type <span className="text-red-500">*</span>
				</Label>

				<Select
					defaultValue={getValues("doc_type")}
					onValueChange={(e) => setValue("doc_type", e)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select the Doc type" />
					</SelectTrigger>

					<SelectContent>
						{inwardDocTypeOptions.map(({ label, value }) => (
							<SelectItem value={value}>{label}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Input
				{...register("doc_no", { required: true })}
				label="Doc number"
				placeholder="Enter the Doc number"
				required
			/>

			<Input
				type="date"
				{...register("doc_date", { required: true })}
				label="Doc Date"
				required
			/>

			<Checkbox
				name="received"
				defaultChecked={getValues("received")}
				onCheckedChange={(e) => setValue("received", e)}
				label="Material Received"
			/>

			<Button type="submit">{isUpdate ? "Update" : "Submit"}</Button>
		</form>
	);
};

export default IStoreForm;
