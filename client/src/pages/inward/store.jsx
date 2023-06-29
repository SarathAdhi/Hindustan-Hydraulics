import React from "react";
import PageLayout from "../../layouts/PageLayout";
import InwardPageLayout from "../../layouts/InwardPageLayout";
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

const storeOptions = [
  "SMC",
  "General",
  "Instrumentation",
  "Hydraulics",
  "Hose",
  "TC Counter",
  "LC Counter",
].map((label) => ({ label, value: label.toLowerCase() }));

const docTypeOptions = [
  "Bill No",
  "DC No",
  "Note No",
  "UHP DC No",
  "SAM DC No",
  "Return Invoice No",
  "Service Materials No",
].map((label) => ({ label, value: label.toLowerCase().replace(" ", "_") }));

const InwardStorePage = () => {
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      inward_no: 0,
      store: storeOptions[0].value,
      customer_name: "",
      doc_type: docTypeOptions[0].value,
      doc_no: "",
      received: false,
    },
  });

  async function handleStoreForm(values) {
    try {
      const data = await axios.post(ApiRoutes.inward.store, values);

      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <PageLayout>
      <InwardPageLayout className="flex flex-col">
        <form
          onSubmit={handleSubmit(handleStoreForm)}
          className="mx-auto w-full max-w-[500px] card flex flex-col items-center gap-4"
        >
          <Input
            {...register("inward_no", { required: true })}
            type="number"
            label="Inward number"
            placeholder="Enter the Inward number"
            required
          />

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
                {storeOptions.map(({ label, value }) => (
                  <SelectItem value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            {...register("customer_name", { required: true })}
            label="Supplier Name"
            placeholder="Enter the Customer name"
            required
          />

          <Input
            {...register("doc_no", { required: true })}
            label="Doc number"
            placeholder="Enter the Doc number"
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
                {docTypeOptions.map(({ label, value }) => (
                  <SelectItem value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Checkbox
            name="received"
            defaultChecked={getValues("received")}
            onCheckedChange={(e) => setValue("received", e)}
            label="Material Received"
          />

          <Button type="submit">Submit</Button>
        </form>
      </InwardPageLayout>
    </PageLayout>
  );
};

export default withAuth(InwardStorePage);
