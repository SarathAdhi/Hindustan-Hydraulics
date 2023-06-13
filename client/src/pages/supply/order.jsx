import React from "react";
import PageLayout from "../../layouts/PageLayout";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import SupplyPageLayout from "../../layouts/SupplyPageLayout";
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import { ApiRoutes } from "../../utils/api-routes";

const SupplyOrderPage = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      purchase_order_no: "",
      date: "",
      customer_name: "",
    },
  });

  async function handleOrderForm(values) {
    try {
      const data = await axios.post(ApiRoutes.supply.order, values);

      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <PageLayout>
      <SupplyPageLayout className="flex flex-col">
        <form
          onSubmit={handleSubmit(handleOrderForm)}
          className="mx-auto w-full max-w-[500px] card flex flex-col items-center gap-4"
        >
          <Input
            {...register("purchase_order_no", { required: true })}
            label="Purchase Order number"
            placeholder="Enter the Purchase order number"
            required
          />

          <Input
            {...register("date", { required: true })}
            type="date"
            label="Purchase Date"
            required
          />

          <Input
            {...register("customer_name", { required: true })}
            label="Customer name"
            placeholder="Enter the Customer name"
            required
          />

          <Button type="submit">Submit</Button>
        </form>
      </SupplyPageLayout>
    </PageLayout>
  );
};

export default withAuth(SupplyOrderPage);
