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
	orderTypeOptions,
	routingOptions,
} from "../../utils/constants";
import { parseObject } from "../../utils/parse-object";

const IStoreForm = ({
	defaultValues,
	allowedFields,
	isUpdate = false,
	storeInfo,
}) => {
	const { register, handleSubmit, setValue, getValues, reset, watch } =
		useForm({
			defaultValues,
		});

	const btnDisabled = !watch("received");

	async function handleStoreForm(values) {
		try {
			if (isUpdate) {
				const updateValues = parseObject(
					values,
					Object.keys(allowedFields)
				);

				await axios.put(
					ApiRoutes.inward.store.update(storeInfo),
					updateValues
				);
			} else {
				await axios.post(ApiRoutes.inward.store.create, values);

				reset(defaultValues);
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
					value={watch("store")}
					onValueChange={(e) => setValue("store", e)}
					disabled={isUpdate && !allowedFields?.store}
					required
				>
					<SelectTrigger>
						<SelectValue placeholder="Select the store" />
					</SelectTrigger>

					<SelectContent>
						{inwardStoreOptions.map(({ label, value }) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Input
				{...register("supplier_name", { required: true })}
				label="Supplier Name"
				placeholder="Enter the Customer name"
				required
				disabled={isUpdate && !allowedFields?.supplier_name}
			/>

			<div className="w-full flex flex-col gap-2">
				<Label className="capitalize" htmlFor="store">
					Doc Type <span className="text-red-500">*</span>
				</Label>

				<Select
					defaultValue={getValues("doc_type")}
					value={watch("doc_type")}
					onValueChange={(e) => setValue("doc_type", e)}
					disabled={isUpdate && !allowedFields?.doc_type}
					required
				>
					<SelectTrigger>
						<SelectValue placeholder="Select the Doc type" />
					</SelectTrigger>

					<SelectContent>
						{inwardDocTypeOptions.map(({ label, value }) => (
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
				{...register("our_po_no")}
				label="Our P O number"
				placeholder="Enter the Our P O No"
				disabled={isUpdate && !allowedFields?.our_po_no}
			/>

			<Input
				type="date"
				{...register("po_date")}
				label="P O Date"
				disabled={isUpdate && !allowedFields?.po_date}
			/>

			<div className="w-full flex flex-col gap-2">
				<Label className="capitalize" htmlFor="order_type">
					Order Type
				</Label>

				<Select
					defaultValue={getValues("order_type")}
					value={watch("order_type")}
					onValueChange={(e) => setValue("order_type", e)}
					disabled={isUpdate && !allowedFields?.order_type}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select the order type" />
					</SelectTrigger>

					<SelectContent>
						{orderTypeOptions.map(({ label, value }) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="w-full flex flex-col gap-2">
				<Label className="capitalize" htmlFor="routing">
					Routing <span className="text-red-500">*</span>
				</Label>

				<Select
					defaultValue={getValues("routing")}
					value={watch("routing")}
					onValueChange={(e) => setValue("routing", e)}
					disabled={isUpdate && !allowedFields?.routing}
					required
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

			<Input
				{...register("routing_name", { required: true })}
				label="Routing name"
				placeholder="Enter the Routing name"
				required
				disabled={isUpdate && !allowedFields?.routing_name}
			/>

			<Input
				{...register("routing_receipt_no")}
				label="Routing receipt number"
				placeholder="Enter the Routing receipt number"
				disabled={isUpdate && !allowedFields?.routing_receipt_no}
			/>

			<Checkbox
				name="received"
				defaultChecked={getValues("received")}
				checked={watch("received")}
				onCheckedChange={(e) => setValue("received", e)}
				label="Material Received"
				disabled={isUpdate && !allowedFields?.received}
			/>

			<Button disabled={btnDisabled} type="submit">
				{isUpdate ? "Update" : "Submit"}
			</Button>
		</form>
	);
};

export default IStoreForm;
