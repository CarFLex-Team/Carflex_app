"use client";
import SheetTable, { TableColumn } from "@/components/SheetTable/SheetTable";
import { useCarsSheet } from "@/lib/useCarSheet";
import { SheetLiveListener } from "@/components/sheetLiveListener/SheetLiveListener";
import { useState } from "react";
import { formatTime } from "@/lib/formatTime";
import formatDate from "@/lib/formatDate";
import { EditableCell } from "@/components/SheetTable/EditableCell";
import { Forward } from "lucide-react";
import downloadCSV from "@/lib/downloadCSV";

export default function LeadsSheetPage() {
  const [page, setPage] = useState(1);
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const { data, isLoading, error } = useCarsSheet("lead", date);

  const pageSize = 15;
  type deal = {
    seller_name: string;
    purch_address: string;
    postal_code: string;
    odometer: number;
    year: string;
    make: string;
    model: string;
    vin: string;
    color: string;
    purch_date: string;
    purch_price: number;
    extra_cost: number;
    total_cost: number;
    sell_price: number;
    p_l: number;
    sell_date: string;
    purch_name: string;
    sell_address: string;
    file: string;
    status: string;
    ad_link: string;
  };
  const DealColumns: TableColumn<deal>[] = [
    {
      header: "Seller Name",
      accessor: "seller_name",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.seller_name ? `${row.seller_name}` : ""}
          rowId={row.ad_link}
          field="seller_name"
          sheet="lead"
        />
      ),
    },
    {
      header: "P Address",
      accessor: "purch_address",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-30"
          value={row.purch_address ? `${row.purch_address}` : ""}
          rowId={row.ad_link}
          field="purch_address"
          sheet="lead"
        />
      ),
    },
    {
      header: "#",
      accessor: "postal_code",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.postal_code ? `${row.postal_code}` : ""}
          rowId={row.ad_link}
          field="postal_code"
          sheet="lead"
        />
      ),
    },
    {
      header: "KM",
      accessor: "odometer",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.odometer ? `${row.odometer}` : ""}
          rowId={row.ad_link}
          field="odometer"
          sheet="lead"
        />
      ),
    },
    {
      header: "Year",
      accessor: "year",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-10"
          value={row.year ? `${row.year}` : ""}
          rowId={row.ad_link}
          field="year"
          sheet="lead"
        />
      ),
    },
    {
      header: "Make",
      accessor: "make",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.make ? `${row.make}` : ""}
          rowId={row.ad_link}
          field="make"
          sheet="lead"
        />
      ),
    },
    {
      header: "Model",
      accessor: "model",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.model ? `${row.model}` : ""}
          rowId={row.ad_link}
          field="model"
          sheet="lead"
        />
      ),
    },
    {
      header: "VIN",
      accessor: "vin",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.vin ? `${row.vin}` : ""}
          rowId={row.ad_link}
          field="vin"
          sheet="lead"
        />
      ),
    },
    {
      header: "Color",
      accessor: "color",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.color ? `${row.color}` : ""}
          rowId={row.ad_link}
          field="color"
          sheet="lead"
        />
      ),
    },
    {
      header: "P Date",
      accessor: "purch_date",
      render: (row) => (
        <EditableCell
          type="date"
          className="w-18"
          value={row.purch_date ? `${row.purch_date}` : ""}
          rowId={row.ad_link}
          field="purch_date"
          sheet="lead"
        />
      ),
    },
    {
      header: "P Price",
      accessor: "purch_price",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.purch_price ? `$${row.purch_price}` : ""}
          rowId={row.ad_link}
          field="purch_price"
          sheet="lead"
        />
      ),
    },
    {
      header: "Extra Cost",
      accessor: "extra_cost",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.extra_cost ? `$${row.extra_cost}` : ""}
          rowId={row.ad_link}
          field="extra_cost"
          sheet="lead"
        />
      ),
    },
    {
      header: "Total Cost",
      accessor: "total_cost",
      render: (row) => `$${row.purch_price + (row.extra_cost || 0)}`,
    },
    {
      header: "S Price",
      accessor: "sell_price",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.sell_price ? `$${row.sell_price}` : ""}
          rowId={row.ad_link}
          field="sell_price"
          sheet="lead"
        />
      ),
    },
    {
      header: "P/L",
      accessor: "p_l",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.p_l ? `$${row.p_l}` : ""}
          rowId={row.ad_link}
          field="p_l"
          sheet="lead"
        />
      ),
    },
    {
      header: "S Date",
      accessor: "sell_date",
      render: (row) => (
        <EditableCell
          type="date"
          className="w-18"
          value={row.sell_date ? `${row.sell_date}` : ""}
          rowId={row.ad_link}
          field="sell_date"
          sheet="lead"
        />
      ),
    },
    {
      header: "P Name",
      accessor: "purch_name",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.purch_name ? `${row.purch_name}` : ""}
          rowId={row.ad_link}
          field="purch_name"
          sheet="lead"
        />
      ),
    },
    {
      header: "S Address",
      accessor: "sell_address",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.sell_address ? `${row.sell_address}` : ""}
          rowId={row.ad_link}
          field="sell_address"
          sheet="lead"
        />
      ),
    },
    {
      header: "File",
      accessor: "file",
      render: (row) =>
        row.file ? (
          <a
            href={row.file}
            className="underline text-blue-900"
            target="_blank"
          >
            Click Here
          </a>
        ) : (
          <EditableCell
            type="text"
            className="w-30"
            value={row.file}
            rowId={row.ad_link}
            field="file"
            sheet="lead"
          />
        ),
    },

    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <EditableCell
          type="select"
          value={row.status}
          rowId={row.ad_link}
          field="status"
          options={["Pending", "Purchasd", "Lost"]}
          sheet="lead"
        />
      ),
    },
  ];

  if (error) return <p>Error loading sheet</p>;

  return (
    <>
      {/* 👂 listens for SEND events */}
      <SheetLiveListener />
      <SheetTable
        columns={DealColumns}
        data={
          isLoading
            ? []
            : data
              ? data.slice((page - 1) * pageSize, page * pageSize)
              : []
        }
        isLoading={isLoading}
        // pagination={{
        //   page,
        //   pageSize,
        //   total: data?.length || 1,
        //   onPageChange: setPage,
        // }}
        action={
          <div className="flex gap-4">
            <input
              type="date"
              value={date}
              max={today}
              onChange={(e) => setDate(e.target.value)}
              className="rounded border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />

            <button
              className="border border-primary   text-sm  hover:text-white transition-colors duration-300  bg-primary rounded-lg p-2 text-white hover:bg-lightPrimary cursor-pointer text-center"
              onClick={() => downloadCSV(data ?? [])}
            >
              Export CSV
            </button>
          </div>
        }
        title="Leads Sheet"
      />
    </>
  );
}
