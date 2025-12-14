import SearchVin from "../SearchVin/SearchVin";

export default function DecoderNav() {
  return (
    <nav
      className="flex justify-between  items-center h-fit pt-8 px-6 sm:px-9 gap-10 mb-4"
      aria-label="Listings navigation"
    >
      <SearchVin label="Listings" />
      <div className="w-25 ">
        <img src="/Logo.png" alt="Carflex Logo" className=" w-25" />
      </div>
    </nav>
  );
}
