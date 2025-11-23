"use client";
import { useEffect, useRef, useState } from "react";
import NavButton from "../NavButton/NavButton";
// import "./Nav.css";
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

  const [active, setActive] = useState(
    ITEMS.find((i) => i.id === activeId)?.label || "All"
  );

  return (
    <nav
      className="flex justify-center items-center h-20"
      aria-label="Listings navigation"
    >
      <div className="max-sm:hidden flex justify-between min-w-md sm:min-w-lg h-11 bg-white rounded-xl shadow-[0_0_10px_rgba(0,31,104,0.3)]">
        {ITEMS.map((item) => (
          <NavButton
            key={item.id}
            onClick={() => setActive(item.label)}
            item={item}
            isActive={active === item.label}
            className={`w-full flex items-center justify-center text-sm sm:text-base  rounded-xl  no-underline px-1.5 sm:px-2 py-0 border-0  cursor-pointer text-gray-400 z-10 transition-colors duration-200 ease-in-out  `}
          >
            {item.label}
          </NavButton>
        ))}
      </div>
    </nav>
  );
}
