"use client";
import { JSX, useState } from "react";
import AutotraderLogo from "../Logos/AutotraderLogo";
import FacebookLogo from "../Logos/FacebookLogo";
import KijijiLogo from "../Logos/KijijiLogo";
import { CheckCheck, CircleGauge, SearchCheck, X } from "lucide-react";
import Link from "next/link";
import formatNumber from "@/helpers/formatNumber";
import CopyToClipboardButton from "../CustomButton/CopyToClipboardButton";
import timeAgo from "@/helpers/timeAgoCalculator";
export default function CarList({ carDetails }: { carDetails: any }) {
  const [trimStatus, setTrimStatus] = useState<{
    status: boolean;
    value: string;
  }>();
  const onCheck = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTrimStatus({ status: true, value: "" });
    setTimeout(() => {
      setTrimStatus(undefined);
    }, 3000);
  };
  const logoMap: Record<string, JSX.Element> = {
    autotrader: <AutotraderLogo className="w-8 sm:w-10" />,
    kijiji: <KijijiLogo className="w-8 sm:w-10" />,
    facebook: <FacebookLogo className="w-6 sm:w-8" />,
  };

  const statusStyleMap: Record<string, { bg: string; border: string }> = {
    Steal: {
      bg: "bg-green-700",
      border: "border-green-700",
    },
    Good: {
      bg: "bg-green-400",
      border: "border-green-400",
    },
    Potential: {
      bg: "bg-yellow-500",
      border: "border-yellow-500",
    },
    Entertain: {
      bg: "bg-red-500",
      border: "border-red-500",
    },
    Unknown: {
      bg: "bg-gray-500",
      border: "border-gray-500",
    },
  } as const;

  return (
    <Link
      href={`${carDetails.ad_link}`}
      target="_blank"
      rel="noopener noreferrer"
      className={` h-full  flex bg-gray-200 rounded-lg  shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out relative ${
        carDetails.source === "r" ? "border-2 border-red-500 " : ""
      } `}
    >
      <div
        className={`relative w-20 sm:w-40 md:w-50 aspect-8/3 overflow-hidden rounded-md shrink-0 ${
          trimStatus?.status === true
            ? "border-4 border-green-500"
            : trimStatus?.status === false
            ? "border-4 border-red-500"
            : ""
        }`}
      >
        <img
          src={carDetails.image_src || "/Car-placeholder.png"}
          alt={carDetails.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button
          onClick={onCheck}
          className="absolute top-2 left-2 p-2 rounded-md border border-gray-400 shadow-sm bg-white hover:bg-gray-200 transition cursor-pointer"
        >
          {trimStatus?.status === true ? (
            <CheckCheck size={18} />
          ) : trimStatus?.status === false ? (
            trimStatus.value
          ) : (
            <SearchCheck size={18} />
          )}
        </button>
      </div>
      <div className="absolute bottom-2 left-2 opacity-60 bg-gray-200 p-1 rounded-md ">
        {logoMap[carDetails.source.toLowerCase()]}
      </div>

      <div className="w-full h-full p-5  flex flex-col justify-between">
        <div className="flex gap-2 flex-wrap ">
          <p
            className={`border border-solid border-gray-300 text-gray-200 bg-primary  
             
          shadow-md   px-2.5 py-0.5  rounded-md text-xs w-fit sm:text-base`}
          >
            CA${formatNumber(carDetails.price)}
          </p>
          <p
            className={` ${statusStyleMap[carDetails.status]?.bg}
              text-white px-2.5 py-0.5 rounded-md min-[490px]:hidden text-xs`}
          >
            {carDetails.status}
          </p>
          <div className="flex">
            <p
              className={` ${statusStyleMap[carDetails.status]?.bg}
              text-white px-2.5 py-0.5 rounded-l-md max-[490px]:hidden text-xs  sm:text-base`}
            >
              {carDetails.status}
            </p>
            <p
              className={`border border-solid ${
                statusStyleMap[carDetails.status]?.border
              } 
            flex items-center shadow-md text-gray-700 px-2.5 py-0.5 max-[490px]:rounded-l-md rounded-r-md text-xs w-fit sm:text-base`}
            >
              Est. value ~ CA${formatNumber(carDetails.est_value)}
            </p>
          </div>
          <CopyToClipboardButton carDetails={carDetails} />
        </div>
        <div className="flex justify-between flex-wrap items-center  ">
          <p className="text-black  overflow-ellipsis line-clamp-1 font-bold text-base sm:text-lg pr-2.5">
            {carDetails.title}
          </p>
          <p className="text-gray-700 text-sm">
            {timeAgo(carDetails.created_at)}
          </p>
        </div>
        <p className="text-black overflow-ellipsis max-sm:hidden line-clamp-1 lg:line-clamp-2 text-sm">
          {carDetails.description}
        </p>
        <div className="w-full flex justify-between items-center mt-1">
          <p className="text-gray-500 flex items-center text-sm sm:text-base gap-2">
            <CircleGauge className="w-4 h-4" />
            {formatNumber(carDetails.odometer)} Km
          </p>
          {carDetails.is_sus !== null ? (
            <div
              className={`border border-gray-300 text-gray-200  shadow-md px-2.5 py-0.5 rounded-md cursor-default  w-fit sm:text-base text-sm  ${
                carDetails.is_sus ? "bg-red-600" : "bg-green-600"
              }`}
            >
              {carDetails.is_sus ? "Suspicious" : "Safe"}
            </div>
          ) : (
            <div
              className={`border border-gray-300 text-gray-200  shadow-md px-2.5 py-0.5 rounded-md cursor-default  w-fit sm:text-base text-sm bg-gray-500 `}
            >
              Unknown
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
