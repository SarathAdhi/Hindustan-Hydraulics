import React from "react";
import PageLayout from "../../layouts/PageLayout";
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
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import { ApiRoutes } from "../../utils/api-routes";
import SupplyNavlinks from "../../modules/supply/SupplyBillingNavlinks";
import { docTypeOptions, storeOptions } from "../../utils/constants";

const storeStatusOptions = ["Part Supply", "Full Supply"].map((label) => ({
  label,
  value: label.toLowerCase().split(" ")[0],
}));

const SupplyStorePage = () => {
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      store: storeOptions[0].value,
      doc_type: docTypeOptions[0].value,
      doc_no: "",
      doc_date: "",
      po_no: "",
      po_date: "",
      supply: storeStatusOptions[0].value,
      customer_name: "",
      ready: false,
      ready_to_bill: false,
    },
  });

  async function handleStoreForm(values) {
    try {
      const data = await axios.put(ApiRoutes.supply.store, values);

      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <PageLayout>
      <div className="mx-auto w-full max-w-[500px] flex flex-col gap-4">
        <SupplyNavlinks />

        <form
          onSubmit={handleSubmit(handleStoreForm)}
          className="card flex flex-col items-center gap-4"
        >
          <div className="w-full flex flex-col gap-2">
            <Label className="capitalize" htmlFor="store">
              Store Name <span className="text-red-500">*</span>
            </Label>

            <Select
              name="store"
              defaultValue={getValues("store")}
              onValueChange={(e) => setValue("store", e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the store" />
              </SelectTrigger>

              <SelectContent>
                {storeOptions.map(({ label, value }) => (
                  <SelectItem value={value}>{label}</SelectItem>
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
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the Doc type" />
              </SelectTrigger>

              <SelectContent>
                {docTypeOptions.map(({ label, value }) => (
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

          <Input
            {...register("po_no", { required: true })}
            label="Purchase order number"
            placeholder="Enter the Purchase order number"
            required
          />

          <Input
            type="date"
            {...register("po_date", { required: true })}
            label="Purchase order Date"
            required
          />

          <Input
            {...register("customer_name", { required: true })}
            label="Customer Name"
            placeholder="Enter the Customer Name"
            required
          />

          <div className="w-full flex flex-col gap-2">
            <Label className="capitalize" htmlFor="supply">
              Supply <span className="text-red-500">*</span>
            </Label>

            <Select
              name="supply"
              defaultValue={getValues("supply")}
              onValueChange={(e) => setValue("supply", e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the supply" />
              </SelectTrigger>

              <SelectContent>
                {storeStatusOptions.map(({ label, value }) => (
                  <SelectItem value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Checkbox
            name="ready"
            defaultChecked={getValues("ready")}
            onCheckedChange={(e) => setValue("ready", e)}
            label="Ready"
          />

          <Checkbox
            name="ready_to_bill"
            defaultChecked={getValues("ready_to_bill")}
            onCheckedChange={(e) => setValue("ready_to_bill", e)}
            label="Ready to bill"
          />

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </PageLayout>
  );
};

export default withAuth(SupplyStorePage);
