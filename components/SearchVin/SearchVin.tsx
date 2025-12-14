"use client";

import Link from "next/link";

export default function SearchVin() {
  return (
    <Link
      href={"/vin-decoder"}
      className="p-2 rounded-md border bg-primary text-white border-gray-300 shadow-sm hover:bg-lightPrimary transition cursor-pointer"
    >
      <span className="sm:inline hidden">VIN</span> Decoder
    </Link>
  );
}
