import { Menu } from "lucide-react";
export default function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav
      className="flex justify-between  items-center h-17  px-6 sm:px-9  "
      aria-label="Listings navigation"
    >
      <button
        onClick={onMenuClick}
        className="md:opacity-0 md:w-25 max-md:block"
        aria-controls="mobile-listings-aside"
      >
        <Menu size={28} />
      </button>

      <div className="w-25 ">
        <img src="/Logo.png" alt="Carflex Logo" className=" w-25" />
      </div>
    </nav>
  );
}
