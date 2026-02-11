"use client";
import AverageTimeChart from "@/components/AverageTimeChart/AverageTimeChart";
import CarSentChart from "@/components/CarSentChart/CarSentChart";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import progressColumns from "@/components/ProgressTable/progresColumns";
import ProgressTable from "@/components/ProgressTable/ProgressTable";
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
  const {
    data: progressData,
    isLoading: isLoadingProgress,
    error: errorProgress,
  } = useSWR(`/api/cars/progress?month=${month}`, fetcher);
  const progressDataWithCalculations = progressData
    ? progressData.map((item: any) => {
        const carsSentProgress = item.carsSentLastMonth
          ? ((item.carsSentThisMonth - item.carsSentLastMonth) /
              item.carsSentLastMonth) *
            100
          : 0;
        const averageTimeProgress = item.averageTimeInMinutesLastMonth
          ? ((item.averageTimeInMinutesThisMonth -
              item.averageTimeInMinutesLastMonth) /
              item.averageTimeInMinutesLastMonth) *
            100
          : 0;
        return {
          ...item,
          carsSentProgress: carsSentProgress.toFixed(2),
          averageTimeProgress: averageTimeProgress.toFixed(2),
        };
      })
    : [];
  const top3ProgressData = progressDataWithCalculations
    .map((item: any) => {
      const carsSentProgress = parseFloat(item.carsSentProgress);
      const averageTimeProgress = parseFloat(item.averageTimeProgress);

      // Calculate a combined score (you can use weighted sum if you need different priorities for each)
      const combinedProgress = (carsSentProgress + averageTimeProgress) / 2;

      return {
        ...item,
        combinedProgress,
      };
    })
    .sort(
      (a: { combinedProgress: number }, b: { combinedProgress: number }) =>
        b.combinedProgress - a.combinedProgress,
    ); // Sort by combined progress in descending order

  if (isLoading || isLoadingAverage || isLoadingProgress)
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  if (error || errorAverage || errorProgress)
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
          <div className="bg-primary border border-gray-200 rounded-lg p-4 shadow-sm w-full  min-h-28  ">
            <p className="text-base text-gray-200 font-semibold">Total Cars:</p>
            <p className=" text-white font-bold text-2xl ">
              {data.length > 0 ? data[0].totalCars : 0}
            </p>
          </div>
          <div className="bg-green-800 border border-gray-200 rounded-lg p-4 shadow-sm w-full min-h-28 ">
            <p className="text-base text-gray-200 font-semibold">
              All Leads Cars:
            </p>
            <p className=" text-white  font-bold text-2xl ">
              {data.length > 0 ? data[0].totalCars - data[0].totalAttacks : 0}
            </p>
          </div>
          <div className="bg-red-800 border border-gray-200 rounded-lg p-4 shadow-sm w-full  min-h-28 ">
            <p className="text-base text-gray-200 font-semibold">
              Attack Cars:
            </p>
            <p className="font-bold text-2xl text-white">
              {data.length > 0 ? data[0].totalAttacks : 0}
            </p>
          </div>
        </div>
        <div className="flex space-x-6 w-full">
          <div className="flex flex-col w-2/3 gap-4">
            {/* <div className="w-full mb-8 flex  items-center gap-5 flex-col md:flex-row"> */}
            <div className="flex-1 ">
              <AverageTimeChart data={averageData.employeeAverageTime} />
            </div>
            <div className="flex-1 ">
              <CarSentChart data={carSentData} />
            </div>
            {/* </div> */}
            {/* <div className="w-full mb-8 flex  items-center gap-5 flex-col md:flex-row"> */}
            <div className="flex-1 ">
              <AverageTimeChart data={averageData.teamAverageTime} />
              {/* </div> */}
            </div>
          </div>
          <div className="w-1/3 bg-gray-100 rounded-lg shadow-sm">
            <ProgressTable
              title="Employees Progress"
              data={top3ProgressData}
              columns={progressColumns}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
