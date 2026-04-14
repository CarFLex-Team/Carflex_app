"use client";
import CarList from "@/components/Dashboard/CarList";
import useSWR from "swr";
export default function Dashboard() {
  const { data } = useSWR(
    "/api/offers",
    (url) => fetch(url).then((res) => res.json()),
    {
      revalidateOnFocus: true,
    },
  );

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  if (data.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 ">No vehicles found.</p>
      </div>
    );
  return (
    <div className="min-h-screen  pt-10 pb-7 px-4">
      <div className="flex flex-col gap-4">
        {data?.map((vehicle: any) => (
          <CarList key={vehicle.id} carDetails={vehicle} />
        ))}
      </div>
    </div>
  );
}
