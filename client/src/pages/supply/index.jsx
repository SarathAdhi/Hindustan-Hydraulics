import { ArrowUpDown } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { Button } from "../../components/ui/button";
import PageLayout from "../../layouts/PageLayout";
import { withAuth } from "../../hoc/withAuth";

const SupplyPage = () => {
  const data = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
  ];

  // const columns = [
  //   {
  //     accessorKey: "status",
  //     header: "Status",
  //   },
  //   {
  //     accessorKey: "email",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Email
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       );
  //     },
  //   },
  //   {
  //     accessorKey: "amount",
  //     header: "Amount",
  //   },
  // ];

  const columns = [
    "SL.NO",
    "DOC NO",
    "DATE",
    "P O NO",
    "DATE",
    "CUSTOMER NAME",
    "SMC",
    "GENERAL",
    "INSTRUMENTATION",
    "HYDRAULICS",
    "HOSE",
    "COUNTER NO",
    "READY",
    "READY TO BILL",
    "BILL READY",
    "ORDER STATUS",
    "BILL NO",
    "ROUTING",
    "SECURITY OUT",
    "REG NO",
  ].map((header) => ({
    accessorKey: header.toLowerCase().replace(" ", "_"),
    header: () => (
      <span className="text-center flex flex-col items-center">{header}</span>
    ),
  }));

  return (
    <PageLayout>
      <DataTable columns={columns} data={data} />
    </PageLayout>
  );
};

export default withAuth(SupplyPage);
