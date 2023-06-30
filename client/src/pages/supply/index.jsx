import { DataTable } from "../../components/DataTable";
import PageLayout from "../../layouts/PageLayout";
import { withAuth } from "../../hoc/withAuth";
import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import { routingOptions, storeStatusOptions } from "../../utils/constants";
import dayjs from "dayjs";

const SupplyPage = () => {
  const [supplyData, setSupplyData] = useState([]);

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
      accessorKey: "po_no",
      header: () => <span>P O NO</span>,
    },
    {
      accessorKey: "po_date",
      header: () => <span>P O DATE</span>,
      cell: ({ row }) => {
        const value = row.getValue("po_date");

        return dayjs(value).format("DD/MM/YYYY");
      },
    },
    {
      accessorKey: "customer_name",
      header: () => <span>CUSTOMER NAME</span>,
    },
    {
      accessorKey: "smc",
      header: () => <span>SMC</span>,
      cell: ({ row }) => {
        const storesValue = row.original?.store || [];
        const smc = storesValue.find((e) => e.store_name === "smc");

        const value = storeStatusOptions.find((e) => e.value === smc.supply);

        return <span>{value?.label}</span>;
      },
    },
    {
      accessorKey: "general",
      header: () => <span>GENERAL</span>,
      cell: ({ row }) => {
        const storesValue = row.original?.store || [];
        const general = storesValue.find((e) => e.store_name === "general");

        const value = storeStatusOptions.find(
          (e) => e.value === general.supply
        );

        return <span>{value?.label}</span>;
      },
    },
    {
      accessorKey: "instrumentation",
      header: () => <span>INSTRUMENTATION</span>,
      cell: ({ row }) => {
        const storesValue = row.original?.store || [];
        const instrumentation = storesValue.find(
          (e) => e.store_name === "instrumentation"
        );

        const value = storeStatusOptions.find(
          (e) => e.value === instrumentation.supply
        );

        return <span>{value?.label}</span>;
      },
    },
    {
      accessorKey: "hydraulics",
      header: () => <span>HYDRAULICS</span>,
      cell: ({ row }) => {
        const storesValue = row.original?.store || [];
        const hydraulics = storesValue.find(
          (e) => e.store_name === "hydraulics"
        );

        const value = storeStatusOptions.find(
          (e) => e.value === hydraulics.supply
        );

        return <span>{value?.label}</span>;
      },
    },
    {
      accessorKey: "hose",
      header: () => <span>HOSE</span>,
      cell: ({ row }) => {
        const storesValue = row.original?.store || [];
        const hose = storesValue.find((e) => e.store_name === "hose");

        const value = storeStatusOptions.find((e) => e.value === hose.supply);

        return <span>{value?.label}</span>;
      },
    },
    {
      accessorKey: "counter_no",
      header: () => <span>COUNTER NO</span>,
    },
    {
      accessorKey: "ready",
      header: () => <span>READY</span>,
      cell: ({ row }) => {
        const value = row.getValue("ready");

        return value ? "YES" : "NO";
      },
    },
    {
      accessorKey: "ready_to_bill",
      header: () => <span>READY TO BILL</span>,
      cell: ({ row }) => {
        const value = row.getValue("ready_to_bill");

        return value ? "YES" : "NO";
      },
    },
    {
      accessorKey: "bill_ready",
      header: () => <span>BILL READY</span>,
      cell: ({ row }) => {
        const value = row.getValue("bill_ready");

        return value ? "YES" : "NO";
      },
    },
    {
      accessorKey: "order_status",
      header: () => <span>ORDER STATUS</span>,
      cell: ({ row }) => {
        const rowValue = row.getValue("order_status");

        const value = storeStatusOptions.find((e) => e.value === rowValue);

        return <span>{value?.label}</span>;
      },
    },
    {
      accessorKey: "bill_no",
      header: () => <span>BILL NO</span>,
    },
    {
      accessorKey: "routing",
      header: () => <span>ROUTING</span>,
      cell: ({ row }) => {
        const value = row.getValue("routing");

        const type = routingOptions.find((e) => e.value === value);

        return <span>{type?.label}</span>;
      },
    },
    {
      accessorKey: "security_out",
      header: () => <span>SECURITY OUT</span>,
      cell: ({ row }) => {
        const value = row.getValue("security_out");

        return value ? "OUT" : "";
      },
    },
    {
      accessorKey: "reg_no",
      header: () => <span>REG NO</span>,
    },
  ];

  function fetchSupplyData() {
    axios.get("/supply/dashboard").then((res) => {
      setSupplyData(res);
    });
  }

  useEffect(() => {
    fetchSupplyData();
  }, []);

  console.log({ supplyData });

  return (
    <PageLayout>
      <DataTable columns={columns} data={supplyData} />
    </PageLayout>
  );
};

export default withAuth(SupplyPage);
