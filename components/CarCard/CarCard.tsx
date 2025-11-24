// import AutotraderLogo from "../Logos/AutotraderLogo";
// import KijijiLogo from "../Logos/Kijiji";
import { CircleGauge } from "lucide-react";
export default function CarCard({ carDetails }: { carDetails: any }) {
  return (
    <div className=" h-110 bg-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out ">
      <div className="w-full h-1/2 overflow-hidden rounded-md ">
        <img
          src={carDetails.image_src}
          alt={carDetails.title}
          className="w-full object-cover h-full"
        />
      </div>
      <div className="w-full h-1/2 p-5 pb-8 flex flex-col justify-between">
        {/* <div className="w-full flex items-center gap-3 flex-row ">
          {carDetails.Source === "Autotrader" && (
            <AutotraderLogo className="w-10 " />
          )}
          {carDetails.Source === "Kijiji" && <KijijiLogo className="w-10 " />}
          <p className="bg-green-700 text-white px-2  rounded-4xl">Steal</p>
        </div> */}
        <div className="flex justify-between flex-wrap">
          <p className="text-black font-bold text-lg">{carDetails.title}</p>
          <p className="text-gray-400 text-sm">{carDetails.location}</p>
        </div>
        <p className="text-black text-base">CA${carDetails.price}</p>
        <p className="text-black overflow-ellipsis max-sm:hidden line-clamp-1 lg:line-clamp-2 text-sm">
          {carDetails.description}
        </p>
        <p className="text-gray-500 flex items-center gap-2">
          <CircleGauge className="w-4 h-4" />
          {carDetails.odometer.toLocaleString()} Km
        </p>
      </div>
    </div>
  );
}
