export const SHEETS = {
  dabou: {
    table: "sheet_dabou",
    editableFields: new Set([
      "notes",
      "call_status",
      "status",
      "seller_phone",
      "real_value",
      "purch_value",
      "vin",
      "color",
    ]),
    event: "sheet:dabou:update",
  },

  lead: {
    table: "sheet_lead",
    editableFields: new Set(["notes", "call_status", "status", "real_value"]),
    event: "sheet:lead:update",
  },

  ibrahim: {
    table: "sheet_ibrahim",
    editableFields: new Set([
      "notes",
      "call_status",
      "status",
      "seller_phone",
      "real_value",
      "purch_value",
      "vin",
      "color",
    ]),
    event: "sheet:ibrahim:update",
  },
  omar: {
    table: "sheet_omar",
    editableFields: new Set([
      "notes",
      "call_status",
      "status",
      "seller_phone",
      "real_value",
      "purch_value",
      "vin",
      "color",
    ]),
    event: "sheet:omar:update",
  },
} as const;

export type SheetKey = keyof typeof SHEETS;
