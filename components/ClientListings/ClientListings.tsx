"use client";
import { useState } from "react";
import AutoSwitch from "../AutoSwitch/AutoSwitch";
import useSWR from "swr";
import CarCard from "../CarCard/CarCard";
import CarList from "../CarList/CarList";
import SelectView from "../SelectView/SelectView";
import fetchData from "@/helpers/fetchData";
type Item = {
  id: number;
  title: string;
  price: string;
  location: string;
  odometer: string;
  image: string; // single validated image URL or ""
  ad_link: string;
  created_at: string;
  description: string;
  status: string;
  estValue: string;
  source: string;
};

export default function ClientListings({
  active,
  initialCarsData,
}: {
  active: string;
  initialCarsData: any[];
}) {
  const [view, setView] = useState<"card" | "list">("card");
  const { data, error, isLoading } = useSWR(
    [`${active.toLowerCase()}Cars`, 20],
    () => fetchData({ name: active.toLowerCase(), limit: 20 }),
    {
      // refreshInterval: 30_000, // poll every 30 seconds
      fallbackData: { items: initialCarsData },
      revalidateOnFocus: false,
    }
  );

  if (error) return <div className="text-red-600">Failed to load</div>;
  if (isLoading && !data) return <div>Loading...</div>;

  const items: Item[] = data.items;
  return (
    <div className=" px-4 sm:px-9 py-6 ">
      <div className="sm:w-full mb-8 flex justify-between items-center ">
        <p className="text-black text-2xl md:text-3xl font-bold tracking-wide ">
          {active} Listings
        </p>
        <div className="flex items-center gap-4">
          {/* <AutoSwitch /> */}
          <SelectView view={view} setView={setView} />
        </div>
      </div>
      {view === "list" ? (
        <div className="grid grid-cols-1 gap-5">
          {items.map((carDetails) => (
            <CarList key={carDetails.id} carDetails={carDetails} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          {items.map((carDetails) => (
            <CarCard key={carDetails.id} carDetails={carDetails} />
          ))}
        </div>
      )}
    </div>
  );
}
