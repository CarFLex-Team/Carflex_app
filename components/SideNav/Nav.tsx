"use client";
import { useState } from "react";
import NavButton from "../NavButton/NavButton";
import "./Nav.css";
export default function Nav() {
  const [active, setActive] = useState("All");

  return (
    <nav className="nav-container">
      {["All", "Autotrader", "Kijiji", "Facebook"].map((item) => (
        <NavButton
          key={item}
          onClick={() => setActive(item)}
          className={active === item ? "nav-item active" : "nav-item"}
        >
          {item}
        </NavButton>
      ))}
    </nav>
  );
}
