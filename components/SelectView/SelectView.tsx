"use client";

import { useState } from "react";
import { LayoutGrid, LayoutList } from "lucide-react";

export default function SelectView({
  view,
  setView,
}: {
  view: "card" | "list";
  setView: React.Dispatch<React.SetStateAction<"card" | "list">>;
}) {
  const [open, setOpen] = useState(false);

  const changeView = (next: "card" | "list") => {
    setView(next);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-md border border-gray-300 shadow-sm hover:bg-gray-100 transition cursor-pointer"
      >
        {view === "list" ? (
          <LayoutList size={18} className="text-gray-600" />
        ) : (
          <LayoutGrid size={18} className="text-gray-600" />
        )}
      </button>

      {open && (
        <div className="absolute right-1 mt-2 w-36 bg-white border border-gray-200 shadow-lg rounded-md z-20">
          <button
            className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => changeView("card")}
          >
            <LayoutGrid size={16} /> Card View
          </button>
          <button
            className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => changeView("list")}
          >
            <LayoutList size={16} /> List View
          </button>
        </div>
      )}
    </div>
  );
}
