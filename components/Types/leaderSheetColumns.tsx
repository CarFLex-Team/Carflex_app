import { TableColumn } from "../SheetTable/SheetTable";
import { EditableCell } from "../SheetTable/EditableCell";

export type CarLeaders = {
  id: string;
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

export const leaderSheetColumns: TableColumn<CarLeaders>[] = [
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
    render: (row) => (
      <EditableCell
        type="datetime"
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
    render: (row) => (
      <EditableCell
        type="text"
        className="w-15"
        value={row.price ? `${row.price}` : ""}
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
        value={row.lien ? "Yes" : "No"}
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
        value={row.lien_amount ? `${row.lien_amount}` : ""}
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
        value={row.accidents ? "Yes" : "No"}
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
        value={row.claim ? `${row.claim}` : ""}
        rowId={row.ad_link}
        field="claim"
        sheet="lead"
        icon="$"
      />
    ),
  },
  {
    header: "Damage",
    accessor: "damage",
    render: (row) => (
      <EditableCell
        type="select"
        options={[
          { value: "true", label: "Yes" },
          { value: "false", label: "No" },
        ]}
        className="w-15"
        value={row.damage ? "Yes" : "No"}
        rowId={row.ad_link}
        field="damage"
        sheet="lead"
      />
    ),
  },
  {
    header: "Damage Condition",
    accessor: "damage_condition",
    render: (row) => (
      <EditableCell
        type="text"
        className="w-15"
        value={row.damage_condition}
        rowId={row.ad_link}
        field="damage_condition"
        sheet="lead"
      />
    ),
  },
  {
    header: "Damage Location",
    accessor: "damage_location",
    render: (row) => (
      <EditableCell
        type="text"
        className="w-15"
        value={row.damage_location}
        rowId={row.ad_link}
        field="damage_location"
        sheet="lead"
      />
    ),
  },
];
