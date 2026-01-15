"use client";
import DecodeBlock from "@/components/DecodeBlock/DecodeBlock";
import DecoderNav from "@/components/DecoderNav/DecoderNav";
import SheetTable, { TableColumn } from "@/components/SheetTable/SheetTable";
import { useCarsSheet } from "@/lib/useCarSheet";
import { SheetLiveListener } from "@/components/sheetLiveListener/SheetLiveListener";
import { useState } from "react";
import { formatTime } from "@/lib/formatTime";
import formatDate from "@/lib/formatDate";
import { Car } from "lucide-react";

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
  };
  const CarColumns: TableColumn<Car>[] = [
    { header: "Title", accessor: "title" },
    { header: "Odometer", accessor: "odometer" },
    { header: "Price", accessor: "price" },
    { header: "Estimated", accessor: "est_value" },
    { header: "Status", accessor: "status" },
    { header: "Location", accessor: "location" },
    { header: "Ad Link", accessor: "ad_link" },
    { header: "Source", accessor: "source" },
    { header: "Seller Phone", accessor: "seller_phone" },
    { header: "Call Status", accessor: "call_status" },
    { header: "Sent By", accessor: "sent_by" },

    {
      header: "Sent At",
      accessor: (row) => (
        <div>
          <div>{formatDate(row.sent_at)}</div>
          <div className="text-xs text-gray-400">
            at {formatTime(row.sent_at)}
          </div>
        </div>
      ),
    },
    { header: "Comment", accessor: "notes" },
  ];
  if (isLoading) return <p>Loading...</p>;
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
      />
    </>
  );
}
