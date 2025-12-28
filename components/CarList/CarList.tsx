import { JSX } from "react";
import AutotraderLogo from "../Logos/AutotraderLogo";
import FacebookLogo from "../Logos/FacebookLogo";
import KijijiLogo from "../Logos/KijijiLogo";
import { CircleGauge } from "lucide-react";
import Link from "next/link";
import formatNumber from "@/helpers/formatNumber";
import CustomButton from "../CustomButton/CustomButton";
export default function CarList({ carDetails }: { carDetails: any }) {
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
      className=" h-full  flex bg-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out relative "
    >
      <div className="relative w-20 sm:w-40 md:w-50 aspect-8/3 overflow-hidden rounded-md shrink-0">
        <img
          src={carDetails.image_src || "/Car-placeholder.png"}
          alt={carDetails.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-2 left-2 opacity-60 bg-gray-200 p-1 rounded-md ">
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
        </div>
        <div className="flex justify-between flex-wrap items-center  ">
          <p className="text-black  overflow-ellipsis line-clamp-2  sm:line-clamp-1 font-bold text-base sm:text-lg pr-2.5">
            {carDetails.title}
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

          <CustomButton img={carDetails.image_src || ""} className="text-xs" />
        </div>
      </div>
    </Link>
  );
}
