"use client";

import { useState } from "react";
import { mutate } from "swr";

export function EditableCell({
  value,
  rowId,
  field,
  type,
  options,
  className,
  sheet,
}: {
  value: any;
  rowId: string;
  field: string;
  type: string;
  sheet: string;
  options?: string[];
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [loading, setLoading] = useState(false);

  async function save() {
    if (draft === value) {
      setEditing(false);
      return;
    }

    setLoading(true);

    await fetch(
      `/api/cars/sheet/editCell?sheet=${sheet}&ad_link=${encodeURIComponent(
        rowId
      )}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: draft }),
      }
    );

    setLoading(false);
    setEditing(false);
    setDraft(null);

    // 🔥 update sheet
    mutate("/api/cars/sheet/" + sheet);
  }

  if (!editing) {
    return (
      <div
        onClick={() => setEditing(true)}
        className="cursor-pointer border border-transparent hover:border-gray-300 "
      >
        {value === "" || value == null ? "—" : value}
      </div>
    );
  }

  return (
    <div className="flex gap-0.5">
      {type === "select" ? (
        <select
          value={draft ?? ""}
          onChange={(e) => setDraft(e.target.value)}
          className={`border max-w-30 ${className}`}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          value={draft ?? ""}
          onChange={(e) => setDraft(e.target.value)}
          className={`border max-w-30 ${className}`}
        />
      )}
      <button onClick={save} disabled={loading}>
        ✔
      </button>
      <button onClick={() => setEditing(false)}>✖</button>
    </div>
  );
}
