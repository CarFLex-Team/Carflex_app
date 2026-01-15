"use client";
import SheetTable, { TableColumn } from "@/components/SheetTable/SheetTable";
import { useCarsSheet } from "@/lib/useCarSheet";
import { SheetLiveListener } from "@/components/sheetLiveListener/SheetLiveListener";
import { useState } from "react";
import { formatTime } from "@/lib/formatTime";
import formatDate from "@/lib/formatDate";
import { EditableCell } from "@/components/SheetTable/EditableCell";
import { Forward } from "lucide-react";

export default function CarsSheetPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useCarsSheet();
  const pageSize = 15;
  type Car = {
    id: number;
    title: string;
    price: number;
    location: string;
    odometer: number;
    ad_link: string;
    est_value: number;
    source: string;
    sent_at: string;
    notes: string;
    sent_by: string;
    call_status: string;
    status: string;
    seller_phone: string;
    real_value: number;
    action: string;
  };
  const CarColumns: TableColumn<Car>[] = [
    { header: "Title", accessor: "title" },
    { header: "Odometer", accessor: "odometer" },
    { header: "Price", accessor: "price", render: (row) => `$${row.price}` },
    {
      header: "Estimated",
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
        />
      ),
    },
    { header: "Status", accessor: "status" },
    { header: "Location", accessor: "location" },
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
    { header: "Source", accessor: "source" },
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
        />
      ),
    },
    {
      header: "Call Status",
      accessor: "call_status",
      render: (row) => (
        <EditableCell
          type="select"
          value={row.call_status}
          rowId={row.ad_link}
          field="call_status"
          options={["Calling", "Not Called", "Called", "No Answer"]}
        />
      ),
    },
    { header: "Sent By", accessor: "sent_by" },

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
    {
      header: "Comment",
      accessor: "notes",
      render: (row) => (
        <EditableCell
          type="text"
          value={row.notes}
          rowId={row.ad_link}
          field="notes"
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
        renderActions={(row) => (
          <button
            className="bg-primary rounded-lg p-1.5 text-white hover:bg-lightPrimary cursor-pointer text-center"
            onClick={() => {}}
          >
            <Forward size={16} />
          </button>
        )}
      />
    </>
  );
}
