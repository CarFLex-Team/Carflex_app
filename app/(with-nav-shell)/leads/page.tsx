"use client";
import CarSentChart from "@/components/CarSentChart/CarSentChart";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((r) => r.json());
export default function Dashboard() {
  const { data, isLoading, error } = useSWR("/api/cars/countCarsSent", fetcher);
  console.log("Cars sent data:", data, "Loading:", isLoading, "Error:", error);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  const carSentData = data.map(
    (item: {
      employeeName: string;
      carsSentCount: string;
      carsAttackCount: string;
    }) => ({
      employee: item.employeeName,
      carsSent: item.carsSentCount,
      carsAttack: item.carsAttackCount,
    }),
  );

  return (
    <div className=" px-4 sm:px-9 py-6 ">
      <div>
        <div className="w-full  mb-8 flex justify-between items-center ">
          <div className="w-full max-h-96 ">
            <CarSentChart data={carSentData} />
          </div>
        </div>
      </div>
    </div>
  );
}
