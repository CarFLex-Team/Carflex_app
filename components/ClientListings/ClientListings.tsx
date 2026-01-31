"use client";
import { useState } from "react";
import useSWR from "swr";
import CarCard from "../CarCard/CarCard";
import CarList from "../CarList/CarList";
import SelectView from "../SelectView/SelectView";
import fetchData from "@/helpers/fetchData";
import CarWatcher from "../CarWatcher/CarWatcher";
import CallerPicker from "../CallerPicker/CallerPicker";
import { SheetLiveListener } from "../sheetLiveListener/SheetLiveListener";

type Item = {
  id: number;
  title: string;
  price: string;
  location: string;
  odometer: string;
  image: string;
  ad_link: string;
  created_at: string;
  description: string;
  status: string;
  est_value: string;
  source: string;
  is_sus: boolean;
  real_value: string;
};

export default function ClientListings({
  active,
  initialCarsData,
  limit,
}: {
  active: string;
  initialCarsData: any[];
  limit?: number;
}) {
  const [view, setView] = useState<"card" | "list">("list");
  const SOURCES = ["facebook", "kijiji", "autotrader"];
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const { data, error, isLoading } = useSWR(
    [`${active.toLowerCase()}`, limit ?? 20],
    ([name, limit]) => {
      const result = fetchData({ name: name || "", limit });
      return result;
    },
    {
      refreshInterval: 30_000, // poll every 30 seconds
      fallbackData: { items: initialCarsData },
      revalidateOnFocus: true,
    },
  );
  function toggleSource(source: string) {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source],
    );
  }

  function clearFilters() {
    setSelectedSources([]);
  }

  if (error) return <div className="text-red-600">Failed to load</div>;
  if (isLoading && !data) return <div>Loading...</div>;

  const items: Item[] = data.items.filter(
    (item: { source: string }) =>
      selectedSources.length === 0 || selectedSources.includes(item.source),
  );

  return (
    <>
      <SheetLiveListener name={`${active.toLowerCase()}`} limit={limit ?? 20} />
      <CarWatcher cars={data.items} />
      <div className=" px-4 sm:px-9 py-6 ">
        <div className="sm:w-full mb-8 flex justify-between items-center ">
          <p className="text-black text-2xl md:text-3xl font-bold tracking-wide ">
            {active} Listings
          </p>

          <div className="flex items-center gap-4">
            {/* <AutoSwitch /> */}
            <CallerPicker />

            <SelectView view={view} setView={setView} />
            {/* <SearchVin /> */}
          </div>
        </div>
        {active === "All" && (
          <div className="items-center gap-6 mb-5 hidden md:flex">
            <p className="font-semibold">Filter by source:</p>

            {SOURCES.map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSources.includes(s)}
                  onChange={() => toggleSource(s)}
                />
                <span className="capitalize">{s}</span>
              </label>
            ))}

            <button
              onClick={clearFilters}
              className="px-3 py-1 rounded bg-black text-white text-sm"
            >
              Clear
            </button>
          </div>
        )}

        {view === "list" ? (
          <div className="grid grid-cols-1 gap-5">
            {items.map((carDetails) => (
              <CarList key={carDetails.id} carDetails={carDetails} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {items.map((carDetails) => (
              <CarCard key={carDetails.id} carDetails={carDetails} />
            ))}
          </div>
        )}
      </div>
      {/* <ConfirmDialog
        isOpen={open}
        title="Notify?"
        description="Are you sure you want to send this car?"
        onCancel={() => setOpen(false)}
        onConfirm={callNotifyApi}
        loading={loading}
      /> */}
    </>
  );
}
