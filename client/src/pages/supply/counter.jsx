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
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import { ApiRoutes } from "../../utils/api-routes";
import SupplyNavlinks from "../../modules/supply/SupplyBillingNavlinks";

const routingOptions = [
  "Transport",
  "Travel",
  "Courier",
  "Hand Delivery",
  "Auto",
  "From UHP",
  "From SAM",
  "Branch Office",
].map((label) => ({ label, value: label.toLowerCase() }));

const counterTypeOptions = [
  "TC Bill No",
  "Proforma No",
  "DC No",
  "TC Note No",
  "LC Bill No",
  "LC Note No",
].map((label) => ({ label, value: label.toLowerCase().replace(" ", "_") }));

const SupplyCounterPage = () => {
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      counter_no_type: counterTypeOptions[0].value,
      counter_no: 0,
      counter_date: 0,
      customer_name: "",
      routing: routingOptions[0].value,
    },
  });

  async function handleCounterForm(values) {
    try {
      const data = await axios.post(ApiRoutes.supply.counter, values);

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
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the counter type" />
              </SelectTrigger>

              <SelectContent>
                {counterTypeOptions.map(({ label, value }) => (
                  <SelectItem value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            {...register("counter_no", { required: true })}
            type="number"
            label="Counter number"
            placeholder="Enter the Counter number"
            required
          />

          <Input
            {...register("counter_date", { required: true })}
            type="date"
            label="Counter Date"
            required
          />

          <Input
            {...register("customer_name", { required: true })}
            label="Customer name"
            placeholder="Enter the Customer name"
            required
          />

          <div className="w-full flex flex-col gap-2">
            <Label className="capitalize" htmlFor="routing">
              Routing <span className="text-red-500">*</span>
            </Label>

            <Select
              defaultValue={getValues("routing")}
              onValueChange={(e) => setValue("routing", e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the routing" />
              </SelectTrigger>

              <SelectContent>
                {routingOptions.map(({ label, value }) => (
                  <SelectItem value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </PageLayout>
  );
};

export default withAuth(SupplyCounterPage);
