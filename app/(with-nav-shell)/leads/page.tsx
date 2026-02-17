"use client";
import AverageTimeChart from "@/components/AverageTimeChart/AverageTimeChart";
import CarSentChart from "@/components/CarSentChart/CarSentChart";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import progressColumns from "@/components/ProgressTable/progresColumns";
import ProgressTable from "@/components/ProgressTable/ProgressTable";
import { SummaryCard } from "@/components/SummaryCard/SummaryCard";
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
    ? progressData?.map((item: any) => {
        const carsSentProgress = item.carsSentLastMonth
          ? ((item.carsSentThisMonth - item.carsSentLastMonth) /
              item.carsSentLastMonth) *
            100
          : 0;
        const averageTimeProgress = item.averageTimeInSecondsLastMonth
          ? ((item.averageTimeInSecondsLastMonth -
              item.averageTimeInSecondsThisMonth) /
              item.averageTimeInSecondsLastMonth) *
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
    ?.map((item: any) => {
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
    );

  const carSentData = data?.sentCars?.map(
    (item: {
      employeeName: string;
      carsSentCount: string;
      carsAttackCount: string;
      totalAttacks: string;
      totalCars: string;
    }) => ({
      employee: item.employeeName,
      carsSent: item.carsSentCount,
      carsAttack: item.carsAttackCount,
      totalAttacks: item.totalAttacks,
      totalCars: item.totalCars,
    }),
  );
  console.log("Car Sent Data:", carSentData);
  console.log("Average Data:", averageData);
  console.log("Progress Data:", progressData);
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
      {error || errorAverage || errorProgress ? (
        <div className="flex justify-center items-center h-full text-red-400 font-bold">
          Error loading data
        </div>
      ) : isLoading || isLoadingAverage || isLoadingProgress ? (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full flex  items-center gap-5 flex-col ">
          <div className="w-full  flex  items-center gap-5 flex-col lg:flex-row">
            <SummaryCard
              title="All Ads"
              data={data?.adCars[0]?.carsadded || 0}
              bgColor="bg-primary"
            />
            <SummaryCard
              title="Seen Cars"
              data={data?.seenCars[0]?.carsSeen || 0}
              bgColor="bg-cyan-900"
              percentage={
                data?.adCars[0]?.carsadded &&
                (
                  (data?.seenCars[0]?.carsSeen / data?.adCars[0]?.carsadded) *
                  100
                ).toFixed(0)
              }
              percentageLabel="Ads"
            />
            <SummaryCard
              title="Sent Cars"
              data={carSentData[0]?.totalCars || 0}
              bgColor="bg-purple-900"
              percentage={
                data?.seenCars[0]?.carsSeen &&
                (
                  (carSentData[0]?.totalCars / data?.seenCars[0]?.carsSeen) *
                  100
                ).toFixed(0)
              }
              percentageLabel="Seen"
            />
            <SummaryCard
              title="All Leads Cars"
              data={
                carSentData[0]?.totalCars - carSentData[0]?.totalAttacks || 0
              }
              bgColor="bg-green-800"
              percentage={
                carSentData[0]?.totalCars &&
                (
                  ((carSentData[0]?.totalCars - carSentData[0]?.totalAttacks) /
                    carSentData[0]?.totalCars) *
                  100
                ).toFixed(0)
              }
              percentageLabel="Sent"
            />
            <SummaryCard
              title="Attack Cars"
              data={carSentData[0]?.totalAttacks || 0}
              bgColor="bg-red-800"
              percentage={
                carSentData[0]?.totalCars &&
                (
                  (carSentData[0]?.totalAttacks / carSentData[0]?.totalCars) *
                  100
                ).toFixed(0)
              }
              percentageLabel="Sent"
            />
          </div>
          <div className="flex gap-4 w-full lg:flex-row flex-col ">
            <div className="flex flex-col lg:w-2/3 w-full gap-4">
              <div className="flex-1 ">
                <AverageTimeChart data={averageData.employeeAverageTime} />
              </div>
              <div className="flex-1 ">
                <CarSentChart data={carSentData} />
              </div>

              <div className="flex-1 ">
                <AverageTimeChart data={averageData.teamAverageTime} />
              </div>
            </div>
            <div className="lg:w-1/3 w-full bg-gray-100 rounded-lg shadow-sm">
              <ProgressTable
                title="Employees Progress"
                data={top3ProgressData}
                columns={progressColumns}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
