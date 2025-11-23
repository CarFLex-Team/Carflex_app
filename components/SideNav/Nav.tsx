"use client";
import { useEffect, useRef, useState } from "react";
import NavButton from "../NavButton/NavButton";
import "./Nav.css";
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
    <nav className="nav-container" aria-label="Listings navigation">
      {ITEMS.map((item) => (
        <NavButton
          key={item.id}
          onClick={() => setActive(item.label)}
          item={item}
          className={`nav-item ${active === item.label ? "active" : ""}`}
        >
          {item.label}
        </NavButton>
      ))}
    </nav>
  );
}
