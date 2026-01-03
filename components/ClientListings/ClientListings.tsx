"use client";
import { useState } from "react";
import useSWR from "swr";
import CarCard from "../CarCard/CarCard";
import CarList from "../CarList/CarList";
import SelectView from "../SelectView/SelectView";
import fetchData from "@/helpers/fetchData";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
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
};

export default function ClientListings({
  active,
  initialCarsData,
}: {
  active: string;
  initialCarsData: any[];
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"card" | "list">("list");
  const { data, error, isLoading } = useSWR(
    [`${active.toLowerCase()}Cars`, 20],
    () => fetchData({ name: active.toLowerCase(), limit: 20 }),
    {
      refreshInterval: 30_000, // poll every 30 seconds
      fallbackData: { items: initialCarsData },
      revalidateOnFocus: false,
    }
  );

  if (error) return <div className="text-red-600">Failed to load</div>;
  if (isLoading && !data) return <div>Loading...</div>;
  const callNotifyApi = async () => {
    try {
      setLoading(true);

      await fetch("/api/notify", { method: "POST" });

      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const onNotify = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };
  const items: Item[] = data.items;
  return (
    <>
      <div className=" px-4 sm:px-9 py-6 ">
        <div className="sm:w-full mb-8 flex justify-between items-center ">
          <p className="text-black text-2xl md:text-3xl font-bold tracking-wide ">
            {active} Listings
          </p>
          <div className="flex items-center gap-4">
            {/* <AutoSwitch /> */}
            <SelectView view={view} setView={setView} />
            {/* <SearchVin /> */}
          </div>
        </div>
        {view === "list" ? (
          <div className="grid grid-cols-1 gap-5">
            {items.map((carDetails) => (
              <CarList
                key={carDetails.id}
                carDetails={carDetails}
                onNotify={onNotify}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {items.map((carDetails) => (
              <CarCard
                key={carDetails.id}
                carDetails={carDetails}
                onNotify={onNotify}
              />
            ))}
          </div>
        )}
      </div>
      <ConfirmDialog
        isOpen={open}
        title="Notify?"
        description="Are you sure you want to send this car?"
        onCancel={() => setOpen(false)}
        onConfirm={callNotifyApi}
        loading={loading}
      />
    </>
  );
}
