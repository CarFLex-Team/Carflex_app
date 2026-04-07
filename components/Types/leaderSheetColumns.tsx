import formatDate from "@/lib/formatDate";
import { TableColumn } from "../SheetTable/SheetTable";
import { EditableCell } from "../SheetTable/EditableCell";
import formatTime from "@/lib/formatTime";
import convertToADay from "@/lib/convertToADay";
import priceStatus from "@/helpers/priceStatus";

export type CarLeaders = {
  ad_link: string;
  seller_name: string;
  seller_address: string;
  title: string;
  vin: string;
  reg_name: string;
  pick_date: string;
  price: number;
  pick_location: string;
  updated_at: string;
  payment_method: string;
  lien: boolean;
  lien_amount: number;
  lien_bank: string;
  accidents: boolean;
  claim: number;
  damage: boolean;
  damage_condition: string;
  damage_location: string;
};

export const CarColumns: TableColumn<CarLeaders>[] = [
  //   {
  //     header: "Pickup Date",
  //     accessor: "pick_date",
  //     render: (row) => (
  //       <EditableCell
  //         type="date"
  //         value={row.pick_date}
  //         rowId={row.ad_link}
  //         field="pick_date"
  //         sheet="lead"
  //       />
  //     ),
  //   },
  {
    header: "Pickup Date",
    accessor: "pick_date",
    render: (row) =>
      row.pick_date ? (
        <div>
          <div>{formatDate(row.pick_date)}</div>
          <div className="text-xs text-gray-400">
            at {formatTime(row.pick_date)}
          </div>
        </div>
      ) : (
        <EditableCell
          type="date"
          className={`w-18 `}
          value={row.pick_date ? `${row.pick_date}` : ""}
          rowId={row.ad_link}
          field="pick_date"
          sheet="lead"
        />
      ),
  },
  {
    header: "Car Title",
    accessor: "title",
    render: (row) => (
      <EditableCell
        type="text"
        className="w-20"
        value={row.title}
        rowId={row.ad_link}
        field="title"
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
        className="w-20"
        value={row.vin}
        rowId={row.ad_link}
        field="vin"
        sheet="lead"
      />
    ),
  },
  {
    header: "Seller Name",
    accessor: "seller_name",
    render: (row) => (
      <EditableCell
        type="text"
        className="w-15"
        value={row.seller_name}
        rowId={row.ad_link}
        field="seller_name"
        sheet="lead"
      />
    ),
  },
  {
    header: "Registered Name",
    accessor: "reg_name",
    render: (row) => (
      <EditableCell
        type="text"
        className="w-15"
        value={row.reg_name}
        rowId={row.ad_link}
        field="reg_name"
        sheet="lead"
      />
    ),
  },

  //   {
  //     header: "Ad Link",
  //     accessor: "ad_link",
  //     render: (row) =>
  //       row.ad_link ? (
  //         <a
  //           href={row.ad_link}
  //           className="underline text-blue-900"
  //           target="_blank"
  //         >
  //           {row.source}
  //         </a>
  //       ) : (
  //         <EditableCell
  //           type="text"
  //           value={row.ad_link}
  //           rowId={row.ad_link}
  //           field="ad_link"
  //           className="w-20"
  //           sheet="lead"
  //         />
  //       ),
  //   },
  {
    header: "Seller Address",
    accessor: "seller_address",
    render: (row) => (
      <EditableCell
        type="text"
        value={row.seller_address}
        rowId={row.ad_link}
        field="seller_address"
        className="w-20"
        sheet="lead"
      />
    ),
  },
  {
    header: "Pickup Location",
    accessor: "pick_location",
    render: (row) => (
      <EditableCell
        type="text"
        value={row.pick_location}
        rowId={row.ad_link}
        field="pick_location"
        className="w-20"
        sheet="lead"
      />
    ),
  },

  {
    header: "Price",
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
          sheet="lead"
          icon="$"
        />
      ),
  },
  {
    header: "Payment Method",
    accessor: "payment_method",
    render: (row) => (
      <EditableCell
        type="text"
        className="w-15"
        value={row.payment_method}
        rowId={row.ad_link}
        field="payment_method"
        sheet="lead"
      />
    ),
  },
  {
    header: "Lien",
    accessor: "lien",
    render: (row) => (
      <EditableCell
        type="select"
        options={[
          { value: "true", label: "Yes" },
          { value: "false", label: "No" },
        ]}
        className="w-15"
        value={row.lien}
        rowId={row.ad_link}
        field="lien"
        sheet="lead"
      />
    ),
  },
  {
    header: "lien Amount",
    accessor: "lien_amount",
    render: (row) => (
      <EditableCell
        type="text"
        className="w-15"
        value={row.lien_amount ? `$${row.lien_amount}` : ""}
        rowId={row.ad_link}
        field="lien_amount"
        sheet="lead"
        icon="$"
      />
    ),
  },
  {
    header: "Lien Bank",
    accessor: "lien_bank",
    render: (row) => (
      <EditableCell
        type="text"
        className="w-15"
        value={row.lien_bank}
        rowId={row.ad_link}
        field="lien_bank"
        sheet="lead"
      />
    ),
  },
  {
    header: "Accidents",
    accessor: "accidents",
    render: (row) => (
      <EditableCell
        type="select"
        options={[
          { value: "true", label: "Yes" },
          { value: "false", label: "No" },
        ]}
        className="w-15"
        value={row.accidents}
        rowId={row.ad_link}
        field="accidents"
        sheet="lead"
      />
    ),
  },
  {
    header: "Claim Cost",
    accessor: "claim",
    render: (row) => (
      <EditableCell
        type="text"
        className="w-15"
        value={row.claim ? `$${row.claim}` : ""}
        rowId={row.ad_link}
        field="claim"
        sheet="lead"
        icon="$"
      />
    ),
  },
];
