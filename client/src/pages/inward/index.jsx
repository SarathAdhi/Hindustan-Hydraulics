import { ArrowUpDown } from "lucide-react";
import { DataTable } from "../../components/DataTable";
import { Button } from "../../components/ui/button";
import PageLayout from "../../layouts/PageLayout";
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const InwardPage = () => {
  const [inwardData, setInwardData] = useState([]);

  async function fetchInwardData() {
    axios.get("/inward/dashboard").then((res) => setInwardData(res));
  }

  useEffect(() => {
    fetchInwardData();
  }, []);

  console.log(inwardData);

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
    {
      accessorKey: "s_no",
      header: () => <span>S NO</span>,
    },
    {
      accessorKey: "doc_no",
      header: () => <span>DOC NO</span>,
    },
    {
      accessorKey: "doc_date",
      header: () => <span>DOC DATE</span>,
      cell: ({ row }) => {
        const value = row.getValue("doc_date");

        return dayjs(value).format("DD/MM/YYYY");
      },
    },
    {
      accessorKey: "supplier_name",
      header: () => <span>SUPPLIER NAME</span>,
    },
    {
      accessorKey: "smc",
      header: () => <span>SMC</span>,
    },
    {
      accessorKey: "general",
      header: () => <span>GENERAL</span>,
    },
    {
      accessorKey: "instrumentation",
      header: () => <span>INSTRUMENTATION</span>,
    },
    {
      accessorKey: "hydraulics",
      header: () => <span>HYDRAULICS</span>,
    },
    {
      accessorKey: "hose",
      header: () => <span>HOSE</span>,
    },
    {
      accessorKey: "tc_counter",
      header: () => <span>TC COUNTER</span>,
    },
    {
      accessorKey: "lc_counter",
      header: () => <span>LC COUNTER</span>,
    },
    {
      accessorKey: "materials_received",
      header: () => <span>MATERIALS RECEIVED</span>,
      cell: ({ row }) => {
        const value = row.getValue("materials_received");

        return value ? "YES" : "NO";
      },
    },
    {
      accessorKey: "security_inward",
      header: () => <span>SECURITY INWARD</span>,
      cell: ({ row }) => {
        const value = row.getValue("security_inward");

        return value ? "OUT" : "";
      },
    },
    {
      accessorKey: "inward_reg_no",
      header: () => <span>REG NO</span>,
    },
  ];

  // const columns = [
  //   "SL.NO",
  //   "DOC NO INWARD",
  //   "Date",
  //   "SUPPLIER NAME",
  //   "SMC",
  //   "GENERAL",
  //   "INSTRUMENTAL",
  //   "HYDRAULICS",
  //   "HOSE",
  //   "TC COUNTER",
  //   "LC COUNTER",
  //   "MATERIALS RECEIVED",
  //   "SECURITY INWARD",
  //   "INWARD REG. NO",
  // ].map((header) => ({
  //   accessorKey: header.toLowerCase().replace(" ", "_"),
  //   header: () => (
  //     <span className="text-center flex flex-col items-center">{header}</span>
  //   ),
  // }));

  return (
    <PageLayout>
      <DataTable columns={columns} data={inwardData} />
    </PageLayout>
  );
};

export default withAuth(InwardPage);
