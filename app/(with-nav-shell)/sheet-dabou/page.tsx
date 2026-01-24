"use client";
import SheetTable, { TableColumn } from "@/components/SheetTable/SheetTable";
import { useCarsSheet } from "@/lib/useCarSheet";
import { SheetLiveListener } from "@/components/sheetLiveListener/SheetLiveListener";
import { useState } from "react";
import { formatTime } from "@/lib/formatTime";
import formatDate from "@/lib/formatDate";
import { EditableCell } from "@/components/SheetTable/EditableCell";
import ForwardButton from "@/components/CustomButton/ForwardButton";
import convertToADay from "@/lib/convertToADay";
import downloadCSV from "@/lib/downloadCSV";

export default function CarsSheetPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useCarsSheet("dabou");
  const pageSize = 15;
  type Car = {
    id: number;
    title: string;
    price: number;
    location: string;
    odometer: number;
    ad_link: string;
    est_value: number;

    sent_at: string;
    notes: string;
    sent_by: string;
    call_status: string;
    status: string;
    seller_phone: string;
    real_value: number;
    purch_value: number;
    vin: string;
    color: string;
    follow_up_date: string;
    lowest_price: number;
  };
  const CarColumns: TableColumn<Car>[] = [
    {
      header: "Sent At",
      accessor: "sent_at",
      render: (row) => (
        <div>
          <div>{formatDate(row.sent_at)}</div>
          <div className="text-xs text-gray-400">
            at {formatTime(row.sent_at)}
          </div>
        </div>
      ),
    },
    { header: "Sent By", accessor: "sent_by" },
    {
      header: "Call Status",
      accessor: "call_status",
      render: (row) => (
        <EditableCell
          type="select"
          value={row.call_status}
          rowId={row.ad_link}
          field="call_status"
          options={[
            "Deal Made",
            "Follow Up",
            "In Progress",
            "No Deal (Price)",
            "No Deal (Other)",
            "No Deal (Language)",
            "No Deal (Dealer)",
            "No Contact",
            "Voicemail Left",
            "Ad Removed",
            "Rebuilt",
            "Scammer",
            "Chat on Kijiji",
            "No Answer",
            "Text Message",
            "Sold",
          ]}
          sheet="dabou"
        />
      ),
    },
    {
      header: "Follow Up Date",
      accessor: "follow_up_date",
      render: (row) => (
        <EditableCell
          type="date"
          className={`w-18 `}
          noEditClassName={`${convertToADay(row.follow_up_date).getTime() === convertToADay(new Date().toISOString()).getTime() ? "bg-green-400" : convertToADay(row.follow_up_date) < convertToADay(new Date().toISOString()) ? "bg-red-300" : ""}`}
          value={row.follow_up_date ? `${row.follow_up_date}` : ""}
          rowId={row.ad_link}
          field="follow_up_date"
          sheet="dabou"
        />
      ),
    },

    { header: "Title", accessor: "title" },
    { header: "Odometer", accessor: "odometer" },
    {
      header: "Ad Link",
      accessor: "ad_link",
      render: (row) => (
        <a
          href={row.ad_link}
          className="underline text-blue-900"
          target="_blank"
        >
          Click Here
        </a>
      ),
    },
    {
      header: "Seller Phone",
      accessor: "seller_phone",
      render: (row) => (
        <EditableCell
          type="text"
          value={row.seller_phone}
          rowId={row.ad_link}
          field="seller_phone"
          className="w-20"
          sheet="dabou"
        />
      ),
    },

    {
      header: "Sells For",
      accessor: "est_value",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={
            row.real_value
              ? `$${row.real_value}`
              : row.est_value
                ? `$${row.est_value}`
                : ""
          }
          rowId={row.ad_link}
          field="real_value"
          sheet="dabou"
        />
      ),
    },
    {
      header: "List Price",
      accessor: "price",
      render: (row) => `$${row.price}`,
    },
    { header: "Status", accessor: "status" },

    {
      header: "Target Price",
      accessor: "purch_value",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.purch_value ? `$${row.purch_value}` : ""}
          rowId={row.ad_link}
          field="purch_value"
          sheet="dabou"
        />
      ),
    },
    {
      header: "Lowest Price",
      accessor: "lowest_price",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-15"
          value={row.lowest_price ? `$${row.lowest_price}` : ""}
          rowId={row.ad_link}
          field="lowest_price"
          sheet="dabou"
        />
      ),
    },
    {
      header: "Comment",
      accessor: "notes",
      render: (row) => (
        <EditableCell
          type="text"
          value={row.notes}
          rowId={row.ad_link}
          field="notes"
          sheet="dabou"
        />
      ),
    },
    {
      header: "VIN",
      accessor: "vin",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-20"
          value={row.vin}
          rowId={row.ad_link}
          field="vin"
          sheet="dabou"
        />
      ),
    },
    {
      header: "Color",
      accessor: "color",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-13"
          value={row.color}
          rowId={row.ad_link}
          field="color"
          sheet="dabou"
        />
      ),
    },

    {
      header: "Address",
      accessor: "location",
      render: (row) => (
        <EditableCell
          type="text"
          value={row.location}
          rowId={row.ad_link}
          field="location"
          className="w-20"
          sheet="dabou"
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
        columns={CarColumns}
        data={
          isLoading
            ? []
            : data
              ? data.slice((page - 1) * pageSize, page * pageSize)
              : []
        }
        isLoading={isLoading}
        pagination={{
          page,
          pageSize,
          total: data?.length || 1,
          onPageChange: setPage,
        }}
        title="Car Sheet"
        action={
          <button
            className="border border-primary   text-sm  hover:text-white transition-colors duration-300  bg-primary rounded-lg p-2 text-white hover:bg-lightPrimary cursor-pointer text-center"
            onClick={() => downloadCSV(data ?? [])}
          >
            Export CSV
          </button>
        }
        renderActions={(row) => <ForwardButton carDetails={row} />}
      />
    </>
  );
}
