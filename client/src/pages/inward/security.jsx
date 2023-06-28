import React from "react";
import PageLayout from "../../layouts/PageLayout";
import InwardPageLayout from "../../layouts/InwardPageLayout";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import { ApiRoutes } from "../../utils/api-routes";

const InwardSecurityPage = () => {
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      inward_no: "",
      security_entry: false,
      reg_no: 0,
    },
  });

  async function handleSecurityForm(values) {
    try {
      const data = await axios.post(ApiRoutes.inward.security, values);

      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <PageLayout>
      <InwardPageLayout className="flex flex-col">
        <form
          onSubmit={handleSubmit(handleSecurityForm)}
          className="mx-auto w-full max-w-[500px] card flex flex-col items-center gap-4"
        >
          <Input
            {...register("reg_no", { required: true })}
            type="number"
            label="Inward Register number"
            placeholder="Enter the Inward Register number"
            required
          />

          <Input
            {...register("inward_no", { required: true })}
            label="Inward number"
            placeholder="Enter the Inward number"
            required
          />

          <Checkbox
            name="security_entry"
            defaultChecked={getValues("security_entry")}
            onCheckedChange={(e) => setValue("security_entry", e)}
            label="Security Entry"
          />

          <Button type="submit">Submit</Button>
        </form>
      </InwardPageLayout>
    </PageLayout>
  );
};

export default withAuth(InwardSecurityPage);
