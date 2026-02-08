"use client";
import AverageTimeChart from "@/components/AverageTimeChart/AverageTimeChart";
import CarSentChart from "@/components/CarSentChart/CarSentChart";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((r) => r.json());
export default function Dashboard() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // Default to current month
  const { data, isLoading, error } = useSWR(
    `/api/cars/countCarsSent?month=${month}`,
    fetcher,
  );
  const {
    data: averageData,
    isLoading: isLoadingAverage,
    error: errorAverage,
  } = useSWR(`/api/cars/averageTimeTaken?month=${month}`, fetcher);
  if (isLoading || isLoadingAverage)
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  if (error || errorAverage)
    return (
      <div className="flex justify-center items-center h-full text-red-400 font-bold">
        Error loading data
      </div>
    );
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
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-semibold mb-4">Dashboard </h1>
        <input
          type="month"
          value={month}
          max={new Date().toISOString().slice(0, 7)}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded border-gray-300 px-3 py-2 shadow-sm bg-gray-100 border focus:border-blue-500 focus:ring-blue-500 text-sm"
        />
      </div>
      <div className="w-full flex  items-center gap-5 flex-col ">
        <div className="w-full  flex  items-center gap-5 flex-col md:flex-row">
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 shadow-sm w-full  min-h-28 ">
            <p className="text-base text-gray-600 font-semibold">Total Cars:</p>
            <p className=" text-lightPrimary font-bold text-2xl ">
              {data.length > 0 ? data[0].totalCars : 0}
            </p>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 shadow-sm w-full min-h-28 ">
            <p className="text-base text-gray-600 font-semibold">
              All Leads Cars:
            </p>
            <p className=" text-green-700  font-bold text-2xl ">
              {data.length > 0 ? data[0].totalCars - data[0].totalAttacks : 0}
            </p>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 shadow-sm w-full  min-h-28 ">
            <p className="text-base text-gray-600 font-semibold">
              Attack Cars:
            </p>
            <p className="font-bold text-2xl text-red-700">
              {data.length > 0 ? data[0].totalAttacks : 0}
            </p>
          </div>
        </div>
        <div className="w-full mb-8 flex  items-center gap-5 flex-col md:flex-row">
          <div className="w-full  ">
            <AverageTimeChart data={averageData} />
          </div>
          <div className="w-full ">
            <CarSentChart data={carSentData} />
          </div>
        </div>
      </div>
    </div>
  );
}
