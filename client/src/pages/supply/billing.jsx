import React, { useEffect, useState } from "react";
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
import { toast } from "react-hot-toast";
import SupplyNavlinks from "../../modules/supply/SupplyBillingNavlinks";
import { cn } from "../../lib/utils";
import { docTypeOptions } from "../../utils/constants";

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

const orderStatusOptions = ["Part Supplied", "Fully Supplied"].map((label) => ({
  label,
  value: label.toLowerCase().replace(" ", "_"),
}));

const SupplyBillingPage = () => {
  const [readyToBill, setReadyToBill] = useState([]);
  const [docInfo, setDocInfo] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");

  // doc_type
  // doc_no

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      order_status: orderStatusOptions[0].value,
      bill_no: "",
      bill_date: "",
      routing: routingOptions[0].value,
      bill_ready: false,
    },
  });

  async function handleBillingForm(values) {
    try {
      const data = await axios.post(ApiRoutes.supply.billing, {
        ...values,
        ...docInfo,
      });

      // toast.success()

      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    axios.get("/supply/bill/ready_to_bill").then((res) => {
      // console.log({ res });
      setReadyToBill(res);
    });
  }, []);

  const filteredReadyToBill = readyToBill.filter(
    (e) =>
      e.doc_no.toLowerCase().includes(searchFilter.toLowerCase()) ||
      e.doc_type.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <PageLayout className="flex flex-col items-start">
      <div className="-mt-2 pt-2 pb-4 bg-slate-100 w-full sticky top-[57px] grid grid-cols-3 gap-4">
        <SupplyNavlinks className="col-span-2" />

        <Input
          placeholder="Search..."
          onChange={(e) => setSearchFilter(e.target.value)}
          className="border-2"
        />
      </div>

      <div className="w-full grid grid-cols-3 items-start gap-4">
        <div className="col-span-2 sticky top-32 space-y-4">
          <form onSubmit={handleSubmit(handleBillingForm)}>
            <fieldset
              disabled={!docInfo}
              className="w-full card flex flex-col items-center gap-4"
            >
              <div className="w-full flex flex-col gap-2">
                <Label className="capitalize" htmlFor="order_status">
                  Order Status <span className="text-red-500">*</span>
                </Label>

                <Select
                  name="order_status"
                  defaultValue={getValues("order_status")}
                  onValueChange={(e) => setValue("order_status", e)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>

                  <SelectContent>
                    {orderStatusOptions.map(({ label, value }) => (
                      <SelectItem value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Input
                {...register("bill_no", { required: true })}
                label="Bill number"
                placeholder="Enter the Bill number"
                required
              />

              <Input
                type="date"
                {...register("bill_date", { required: true })}
                label="Bill Date"
                required
              />

              <div className="w-full flex flex-col gap-2">
                <Label className="capitalize" htmlFor="routing">
                  Routing <span className="text-red-500">*</span>
                </Label>

                <Select
                  name="routing"
                  defaultValue={getValues("routing")}
                  onValueChange={(e) => setValue("routing", e)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select the Routing" />
                  </SelectTrigger>

                  <SelectContent>
                    {routingOptions.map(({ label, value }) => (
                      <SelectItem value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Checkbox
                name="bill_ready"
                defaultChecked={getValues("bill_ready")}
                onCheckedChange={(e) => setValue("bill_ready", e)}
                label="Bill ready"
              />

              <Button type="submit">Submit</Button>
            </fieldset>
          </form>
        </div>

        <div className="flex flex-col gap-2">
          {filteredReadyToBill?.map((e, i) => {
            const docType = docTypeOptions.find((x) => x.value === e.doc_type);

            return (
              <button
                key={e._id}
                className={cn(
                  "card w-full grid",
                  docInfo?.doc_no === e.doc_no && "bg-green-500"
                )}
                onClick={() =>
                  setDocInfo({ doc_no: e.doc_no, doc_type: e.doc_type })
                }
              >
                <p className="w-full flex justify-between gap-4 text-left">
                  <strong>Doc Number:</strong>
                  <span>{e.doc_no}</span>
                </p>

                <p className="w-full flex justify-between gap-4 text-left">
                  <strong>Doc Type:</strong>
                  <span>{docType?.label}</span>
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
};

export default withAuth(SupplyBillingPage);
