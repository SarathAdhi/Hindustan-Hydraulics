import React from "react";
import PageLayout from "../../layouts/PageLayout";
import SupplyPageLayout from "../../layouts/SupplyPageLayout";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import { ApiRoutes } from "../../utils/api-routes";

const SupplySecurityPage = () => {
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      purchase_order_no: "",
      book_register_no: 0,
      security_out: false,
    },
  });

  async function handleSecurityForm(values) {
    try {
      const data = await axios.post(ApiRoutes.supply.security, values);

      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <PageLayout>
      <SupplyPageLayout className="flex flex-col">
        <form
          onSubmit={handleSubmit(handleSecurityForm)}
          className="mx-auto w-full max-w-[500px] card flex flex-col items-center gap-4"
        >
          <Input
            {...register("purchase_order_no", { required: true })}
            label="Purchase order number"
            placeholder="Enter the Purchase order number"
            required
          />

          <Input
            {...register("book_register_no", { required: true })}
            type="number"
            label="Book Register number"
            placeholder="Enter the Book Register number"
            required
          />

          <Checkbox
            name="security_out"
            defaultChecked={getValues("security_out")}
            onCheckedChange={(e) => setValue("security_out", e)}
            label="Ready to Go Out"
          />

          <Button type="submit">Submit</Button>
        </form>
      </SupplyPageLayout>
    </PageLayout>
  );
};

export default withAuth(SupplySecurityPage);
