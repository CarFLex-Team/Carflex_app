import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
export default function SearchVin({ label }: { label?: string }) {
  return (
    <Link
      href={label ? "/" : "/vin-decoder"}
      className="p-2 rounded-md border bg-primary text-white border-gray-300 shadow-sm hover:bg-lightPrimary transition cursor-pointer"
    >
      {label ? (
        <div className="flex items-center gap-1">
          <ArrowBigLeft size={20} /> <div>{label}</div>
        </div>
      ) : (
        <>
          <span className="sm:inline hidden">VIN</span> Decoder
        </>
      )}
    </Link>
  );
}
