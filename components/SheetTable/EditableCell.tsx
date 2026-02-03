"use client";

import formatDate from "@/lib/formatDate";
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
  noEditClassName,
  date,
}: {
  value: any;
  rowId: string;
  field: string;
  type: string;
  sheet: string;
  options?: string[];
  className?: string;
  noEditClassName?: string;
  date?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [loading, setLoading] = useState(false);
  const [newValue, setNewValue] = useState(value);
  async function save() {
    if (loading) return;
    if (draft === newValue) {
      setEditing(false);
      return;
    }

    setLoading(true);

    await fetch(
      `/api/cars/sheet/editCell?sheet=${sheet}&ad_link=${encodeURIComponent(
        rowId,
      )}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [field]: !draft ? null : type === "number" ? Number(draft) : draft,
        }),
      },
    );

    setLoading(false);
    setEditing(false);
    setNewValue(draft);

    // 🔥 update sheet
    mutate(
      `/api/cars/sheet/${sheet}${date ? `?date=${date}` : ""}`,
      (current: any) => {
        if (!current) return current;
        return current.map((row: any) =>
          row.ad_link === rowId ? { ...row, [field]: draft } : row,
        );
      },

      false,
    );
  }

  if (!editing) {
    return (
      <div
        onClick={() => setEditing(true)}
        className={`cursor-pointer border border-transparent hover:border-gray-300 ${newValue ? noEditClassName : ""}`}
      >
        {newValue === "" || newValue == null
          ? "—"
          : type === "date"
            ? formatDate(newValue)
            : newValue}
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
          onBlur={() => save()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              save(); // 🔥 your existing save function
            }

            if (e.key === "Escape") {
              e.preventDefault();
              setEditing(false); // optional but recommended
            }
          }}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          autoFocus
          type={type}
          value={draft ?? ""}
          onBlur={() => save()}
          onChange={(e) => setDraft(e.target.value)}
          className={`border max-w-30 ${className}`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              save(); // 🔥 your existing save function
            }

            if (e.key === "Escape") {
              e.preventDefault();
              setEditing(false); // optional but recommended
            }
          }}
        />
      )}
      {/* <button onClick={save} disabled={loading}>
        ✔
      </button>
      <button onClick={() => setEditing(false)}>✖</button> */}
    </div>
  );
}
