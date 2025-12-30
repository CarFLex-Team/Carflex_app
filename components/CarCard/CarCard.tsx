import { JSX } from "react";

import FacebookLogo from "../Logos/FacebookLogo";
import KijijiLogo from "../Logos/KijijiLogo";
import { CircleGauge } from "lucide-react";
import Link from "next/link";
import AutotraderLogo from "../Logos/AutotraderLogo";
import formatNumber from "@/helpers/formatNumber";
import CustomButton from "../CustomButton/CustomButton";
export default function CarCard({ carDetails }: { carDetails: any }) {
  const logoMap: Record<string, JSX.Element> = {
    autotrader: <AutotraderLogo className="w-10" />,
    kijiji: <KijijiLogo className="w-10" />,
    facebook: <FacebookLogo className="w-8" />,
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
      className="h-120 min-h-fit bg-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out "
    >
      <div className="w-full h-1/2 overflow-hidden rounded-md ">
        <img
          src={carDetails.image_src || "/Car-placeholder.png"}
          alt={carDetails.title}
          className="w-full object-cover h-full"
        />
      </div>
      <div className="w-full min-h-1/2 p-5 lg:pb-8 flex flex-col justify-between">
        <div className=" w-full flex justify-between items-center ">
          <div className=" flex items-center gap-3 flex-row ">
            {logoMap[carDetails.source.toLowerCase()]}

            <p
              className={` ${statusStyleMap[carDetails.status]?.bg}
            text-white px-2.5 py-0.5 rounded-4xl`}
            >
              {carDetails.status}
            </p>
          </div>
          <p className="text-gray-500 flex items-center gap-0.5">
            <CircleGauge className="w-4 h-4" />
            {formatNumber(carDetails.odometer)} Km
          </p>
        </div>
        <div className="flex justify-between flex-wrap items-center  ">
          <p className="text-black font-bold text-lg pr-2.5 line-clamp-2">
            {carDetails.title}
          </p>
          <p className="text-gray-400 text-sm">
            {carDetails.location?.toUpperCase()}
          </p>
        </div>
        <div className="flex justify-between items-center  flex-wrap gap-2 ">
          <div className="flex gap-2 flex-wrap ">
            <p
              className={`border border-solid border-gray-300 text-gray-200 bg-primary  
              
              shadow-md   px-2.5 py-0.5  rounded-md text-sm w-fit sm:text-base`}
            >
              CA${formatNumber(carDetails.price)}
            </p>
            <p
              className={`border border-solid ${
                statusStyleMap[carDetails.status]?.border
              } 
            flex items-center shadow-md text-gray-700 px-2.5 py-0.5  rounded-md text-sm w-fit sm:text-base`}
            >
              Est. value ~ CA${formatNumber(carDetails.est_value)}
            </p>
          </div>
          <CustomButton
            img={carDetails.image_src || ""}
            className="text-sm bg-green-600 hover:bg-green-700"
          />
        </div>
        <p className="text-black overflow-ellipsis line-clamp-2 text-sm">
          {carDetails.description}
        </p>
      </div>
    </Link>
  );
}
