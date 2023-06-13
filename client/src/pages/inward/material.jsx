import React from "react";
import PageLayout from "../../layouts/PageLayout";
import InwardPageLayout from "../../layouts/InwardPageLayout";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { withAuth } from "../../hoc/withAuth";
import { ApiRoutes } from "../../utils/api-routes";
import axios from "../../lib/axios";

const InwardMaterialPage = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      inward_doc_no: "",
      supplier_name: "",
    },
  });

  async function handleMaterialForm(values) {
    try {
      const data = await axios.post(ApiRoutes.inward.create, values);

      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <PageLayout>
      <InwardPageLayout className="flex flex-col">
        <form
          onSubmit={handleSubmit(handleMaterialForm)}
          className="mx-auto w-full max-w-[500px] card flex flex-col items-center gap-4"
        >
          <Input
            {...register("inward_doc_no", { required: true })}
            label="Doc number"
            placeholder="Enter the Doc number"
            required
          />

          <Input
            {...register("supplier_name", { required: true })}
            label="Supplier name"
            placeholder="Enter the Supplier name"
            required
          />

          <Button type="submit">Submit</Button>
        </form>
      </InwardPageLayout>
    </PageLayout>
  );
};

export default withAuth(InwardMaterialPage);
