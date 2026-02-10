import formatDate from "@/lib/formatDate";
import { TableColumn } from "../SheetTable/SheetTable";
import { EditableCell } from "../SheetTable/EditableCell";
import formatTime from "@/lib/formatTime";
import convertToADay from "@/lib/convertToADay";

export type Car = {
  id: string;
  title: string;
  price: number;
  location: string;
  odometer: number;
  ad_link: string;
  est_value: number;
  is_favorite: boolean;
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
  team_no: number;
};

export const CarColumns: TableColumn<Car>[] = [
  {
    header: "Favorite",
    accessor: "is_favorite",
    render: (row) => (
      <EditableCell
        type="favorite"
        value={row.is_favorite}
        rowId={row.ad_link}
        field="is_favorite"
        sheet="caller"
      />
    ),
  },
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
        />
      ),
  },
  {
    header: "Sent By",
    accessor: "sent_by",
    render: (row) => (
      <div
        className={`${row.team_no === 1 ? "bg-purple-300" : row.team_no === 2 ? "bg-red-300" : row.team_no === 3 ? "bg-indigo-300" : ""}`}
      >
        {row.sent_by}
      </div>
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
        noEditClassName={`${convertToADay(`${row.follow_up_date}`).getTime() === convertToADay(new Date().toISOString()).getTime() ? "bg-green-400" : convertToADay(`${row.follow_up_date}`) < convertToADay(new Date().toISOString()) ? "bg-red-300" : ""}`}
        value={row.follow_up_date ? `${row.follow_up_date}` : ""}
        rowId={row.ad_link}
        field="follow_up_date"
        sheet="caller"
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
      />
    ),
  },
  // {
  //   header: "VIN",
  //   accessor: "vin",
  //   render: (row) => (
  //     <EditableCell
  //       type="text"
  //       className="w-20"
  //       value={row.vin}
  //       rowId={row.ad_link}
  //       field="vin"
  //       sheet="caller"
  //     />
  //   ),
  // },
  // {
  //   header: "Color",
  //   accessor: "color",
  //   render: (row) => (
  //     <EditableCell
  //       type="text"
  //       className="w-13"
  //       value={row.color}
  //       rowId={row.ad_link}
  //       field="color"
  //       sheet="caller"
  //     />
  //   ),
  // },

  // {
  //   header: "Address",
  //   accessor: "location",
  //   render: (row) => (
  //     <EditableCell
  //       type="text"
  //       value={row.location}
  //       rowId={row.ad_link}
  //       field="location"
  //       className="w-20"
  //       sheet="caller"
  //     />
  //   ),
  // },
];
