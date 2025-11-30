"use client";
import { useState } from "react";
import NavButton from "../NavButton/NavButton";
import { Menu, X } from "lucide-react";
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

export default function Nav() {
  const pathname = usePathname() ?? "/";
  const activeId = ITEMS.find((i) => pathname === i.href)?.id ?? ITEMS[0].id;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(
    ITEMS.find((i) => i.id === activeId)?.label || "All"
  );

  return (
    <>
      <nav
        className="flex justify-between  items-center h-fit pt-8 px-6 sm:px-9 gap-10 mb-4"
        aria-label="Listings navigation"
      >
        <button
          onClick={() => setOpen(true)}
          className="md:opacity-0 md:w-25 max-md:block"
          aria-controls="mobile-listings-aside"
          aria-expanded={open}
          aria-label={open ? "Close listings menu" : "Open listings menu"}
        >
          <Menu size={28} />
        </button>
        <div className="max-md:hidden flex justify-between min-w-md lg:min-w-lg h-11 bg-white rounded-xl shadow-[0_0_10px_rgba(0,31,104,0.3)]">
          {ITEMS.map((item) => (
            <NavButton
              key={item.id}
              onClick={() => setActive(item.label)}
              item={item}
              isActive={active === item.label}
              className={`w-full flex items-center justify-center text-sm sm:text-base rounded-xl no-underline py-0 border-0 cursor-pointer text-gray-400 z-10 transition-colors duration-200 ease-in-out`}
            >
              {item.label}
            </NavButton>
          ))}
        </div>

        <div className="w-25 ">
          <img src="/Logo.png" alt="Carflex Logo" className=" w-25" />
        </div>
      </nav>

      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-200 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none "
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />

        <aside
          id="mobile-listings-aside"
          className={` fixed top-0 left-0 h-full w-64 max-w-[80%] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] p-4 transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Listings</h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close listings menu"
              className="p-1 rounded-sm"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-2" aria-label="Mobile listings">
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
        </aside>
      </div>
    </>
  );
}
