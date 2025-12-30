"use client";
import { useState } from "react";
import NavButton from "../NavButton/NavButton";
import {
  X,
  PanelLeftClose,
  LogOut,
  Settings,
  PanelLeftOpen,
} from "lucide-react";

import { usePathname } from "next/navigation";

type Item = {
  id: string;
  href: string;
  label: string;
};

const ITEMS: Item[] = [
  { id: "all", href: "/", label: "All" },
  { id: "autotrader", href: "/autotrader", label: "Autotrader" },
  { id: "kijiji", href: "/kijiji", label: "Kijiji" },
  { id: "marketplace", href: "/marketplace", label: "Marketplace" },
];

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const pathname = usePathname() ?? "/";
  const activeId = ITEMS.find((i) => pathname === i.href)?.id ?? ITEMS[0].id;

  const [active, setActive] = useState(
    ITEMS.find((i) => i.id === activeId)?.label || "All"
  );

  return (
    <>
      <button
        type="button"
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 z-20 md:hidden ${
          open ? "opacity-100" : "hidden"
        }`}
        onClick={() => setOpen(false)}
        aria-label="Close menu"
      />

      <aside
        className={`h-screen flex flex-col justify-between bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]  p-4 z-50  max-md:fixed max-md:inset-0 transform transition-transform duration-300 ease-in-out ${
          open ? "w-58 max-md:translate-x-0" : "w-15 max-md:-translate-x-full"
        }`}
      >
        <div className="overflow-auto">
          <div className="flex items-center justify-between mb-4">
            {open && (
              <img src="/Logo.png" alt="Carflex Logo" className=" w-16" />
            )}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Close listings menu"
              className="p-1 rounded-sm  hover:bg-gray-100 cursor-pointer"
            >
              {open ? (
                <PanelLeftClose size={20} />
              ) : (
                <PanelLeftOpen size={20} />
              )}
            </button>
          </div>

          {open && (
            <div className="flex flex-col ">
              <div className="flex flex-col gap-2" aria-label="Mobile listings">
                <p className="text-gray-500 ">Listings</p>
                {ITEMS.map((item) => (
                  <NavButton
                    key={item.id}
                    onClick={() => setActive(item.label)}
                    item={item}
                    isActive={active === item.label}
                    className={`text-left w-full px-4 py-3 rounded-lg font-medium text-sm transition-colors`}
                  >
                    {item.label}
                  </NavButton>
                ))}
              </div>
              <div className="  flex flex-col gap-2 mt-4">
                <p className="text-gray-500 ">VIN</p>
                <NavButton
                  key="vin-decoder"
                  item={{
                    id: "vin-decoder",
                    href: "/vin-decoder",
                    label: "Vin Decoder",
                  }}
                  isActive={active === "Vin Decoder"}
                  onClick={() => setActive("Vin Decoder")}
                  className={`text-left w-full px-4 py-3 rounded-lg font-medium text-sm transition-colors`}
                >
                  Vin Decoder
                </NavButton>
              </div>
            </div>
          )}
        </div>
        <a
          href="/signup"
          className={`flex items-center gap-2 text-red-600 cursor-pointer hover:bg-red-100 decoration-none ${
            open ? " px-3 py-2 rounded-lg" : "p-1 rounded-lg "
          }`}
        >
          <LogOut size={20} /> {open && <span>Sign Out</span>}
        </a>
      </aside>
    </>
  );
}
