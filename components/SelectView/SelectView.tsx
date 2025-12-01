"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LayoutGrid, LayoutList } from "lucide-react";

export default function SelectView({ initial }: { initial?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(initial ?? "card");

  // Sync from URL after mount (useSearchParams is available in client)
  useEffect(() => {
    const v = searchParams?.get("view");
    if (v === "list" || v === "card") setView(v);
  }, [searchParams]);

  const changeView = useCallback(
    (next: "card" | "list") => {
      setView(next);
      router.push(`?view=${next}`, { scroll: false });
      setOpen(false);
    },
    [router]
  );

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-md border border-gray-300 shadow-sm hover:bg-gray-100 transition"
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
