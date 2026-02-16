"use client";

import formatDate from "@/lib/formatDate";
import { useEffect, useState } from "react";
import { mutate } from "swr";

import FavoriteButton from "../CustomButton/FavoriteButton";

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
  useEffect(() => {
    setNewValue(value);
  }, [value]);
  async function save(draftValue?: any) {
    if (loading) return;
    if (draftValue !== undefined) {
      setDraft(draftValue);
    }
    if ((draftValue ?? draft) === newValue) {
      setEditing(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/cars/sheet/editCell?sheet=${sheet}&ad_link=${encodeURIComponent(
          rowId,
        )}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            [field]: !(draftValue ?? draft)
              ? null
              : type === "number"
                ? Number(draftValue ?? draft)
                : (draftValue ?? draft),
          }),
        },
      );
      if (!res.ok) {
        throw new Error("Failed to update cell");
      }
      setLoading(false);
      setEditing(false);
      setNewValue(draftValue ?? draft);

      // 🔥 update sheet
      mutate(
        `/api/cars/sheet/${sheet}?page=1&search=&isAttacking=false&isFavorite=false`,
        (current: any) => {
          if (!current) return current;
          return current.map((row: any) =>
            row.ad_link === rowId
              ? { ...row, [field]: draftValue ?? draft }
              : row,
          );
        },

        false,
      );
    } catch (error) {
      console.error("Error updating cell:", error);
      alert("Failed to update cell. Please try again.");
      setLoading(false);
      setEditing(false);
      return;
    }
  }

  if (!editing && type !== "favorite") {
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
    <div>
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
      ) : type === "favorite" ? (
        <FavoriteButton
          onClick={() => {
            setDraft((prev: any) => !prev);

            save(!draft);
          }}
          isFavorite={draft}
        />
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
