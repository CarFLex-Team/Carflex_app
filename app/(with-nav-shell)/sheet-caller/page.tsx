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
import { useSession } from "next-auth/react";
import CarWatcher from "@/components/CarWatcher/CarWatcher";
import Modal from "@/components/ui/Modal";
import { AddCarForm } from "@/components/AddCarForm/AddCarForm";
import { Plus } from "lucide-react";

export default function CarsSheetPage() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  // const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const { data, isLoading, error } = useCarsSheet(
    session?.user?.name?.toLowerCase() || "",
    date,
  );
  // const pageSize = 15;
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
    source: string;
  };

  const CarColumns: TableColumn<Car>[] = [
    {
      header: "Sent At",
      accessor: "sent_at",
      render: (row) =>
        row.sent_at ? (
          <div>
            <div>{formatDate(row.sent_at)}</div>
            <div className="text-xs text-gray-400">
              at {formatTime(row.sent_at)}
            </div>
          </div>
        ) : (
          <EditableCell
            type="date"
            className={`w-18 `}
            value={row.sent_at ? `${row.sent_at}` : ""}
            rowId={row.ad_link}
            field="sent_at"
            sheet="caller"
            date={date}
          />
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
          date={date}
          sheet="caller"
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
          sheet="caller"
          date={date}
        />
      ),
    },

    {
      header: "Title",
      accessor: "title",
      render: (row) => (
        <EditableCell
          type="text"
          className="w-20"
          value={row.title}
          rowId={row.ad_link}
          field="title"
          sheet="caller"
          date={date}
        />
      ),
    },
    {
      header: "Odometer",
      accessor: "odometer",
      render: (row) =>
        row.odometer ? (
          `${row.odometer} km`
        ) : (
          <EditableCell
            type="text"
            className="w-15"
            value={row.odometer ? `${row.odometer}` : ""}
            rowId={row.ad_link}
            field="odometer"
            sheet="caller"
            date={date}
          />
        ),
    },
    {
      header: "Ad Link",
      accessor: "ad_link",
      render: (row) =>
        row.ad_link ? (
          <a
            href={row.ad_link}
            className="underline text-blue-900"
            target="_blank"
          >
            {row.source}
          </a>
        ) : (
          <EditableCell
            type="text"
            value={row.ad_link}
            rowId={row.ad_link}
            field="ad_link"
            className="w-20"
            sheet="caller"
            date={date}
          />
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
          sheet="caller"
          date={date}
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
            row.real_value || row.real_value === 0
              ? `$${row.real_value}`
              : row.est_value
                ? `$${row.est_value}`
                : ""
          }
          rowId={row.ad_link}
          field="real_value"
          sheet="caller"
          date={date}
        />
      ),
    },
    {
      header: "List Price",
      accessor: "price",
      render: (row) =>
        row.price ? (
          `$${row.price}`
        ) : (
          <EditableCell
            type="text"
            className="w-15"
            value={row.price ? `$${row.price}` : ""}
            rowId={row.ad_link}
            field="price"
            sheet="caller"
            date={date}
          />
        ),
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
          sheet="caller"
          date={date}
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
          sheet="caller"
          date={date}
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
          sheet="caller"
          date={date}
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
          sheet="caller"
          date={date}
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
          sheet="caller"
          date={date}
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
          sheet="caller"
          date={date}
        />
      ),
    },
  ];
  const filteredCars = data?.filter((car: Car) => {
    const value = search.toLowerCase();
    return (
      car.title.toLowerCase().includes(value) ||
      car.ad_link.toLowerCase().includes(value) ||
      car.seller_phone?.includes(value) ||
      car.status.toLowerCase().includes(value) ||
      car.vin?.toLowerCase().includes(value)
    );
  });
  if (error) return <p>Error loading sheet</p>;

  return (
    <>
      {open && (
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Add Car">
          <AddCarForm
            onSuccess={() => setOpen(false)}
            sheet={session?.user?.name?.toLowerCase()}
          />
        </Modal>
      )}
      <CarWatcher cars={data ?? []} otherSound={true} />
      {/* 👂 listens for SEND events */}
      <SheetLiveListener />
      <SheetTable
        columns={CarColumns}
        data={isLoading ? [] : filteredCars ? filteredCars : []}
        isLoading={isLoading}
        // pagination={{
        //   page,
        //   pageSize,
        //   total: data?.length || 1,
        //   onPageChange: setPage,
        // }}
        // title="Car Sheet"
        action={
          <div className="flex justify-between w-full items-center">
            <input
              type="text"
              placeholder="Search Cars..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" p-2 border-b border-gray-300 focus:outline-none min-w-25"
            />
            <div className="flex gap-4">
              <button
                className="border border-primary   text-sm  hover:text-white transition-colors duration-300  bg-primary rounded-lg p-2 text-white hover:bg-lightPrimary cursor-pointer text-center"
                onClick={() => setOpen(true)}
              >
                <Plus className="" size={18} />
              </button>
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
          </div>
        }
        renderActions={(row) => <ForwardButton carDetails={row} />}
      />
    </>
  );
}
