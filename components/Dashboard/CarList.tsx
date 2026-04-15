import capitalize from "@/lib/capitalize";
import formatDateTime from "@/lib/formatDateTime";
import { CircleGauge } from "lucide-react";
import Link from "next/link";

export default function CarList({ carDetails }: { carDetails: any }) {
  return (
    <Link
      href={`/dashboard/details/${carDetails.id}`}
      className={` h-full  flex bg-white  border border-primary rounded-lg shadow-md cursor-pointer hover:scale-101 transition-scale duration-300 ease-in-out    `}
    >
      <div className="w-full h-full p-5  flex flex-col justify-between gap-3">
        <div className="flex justify-between flex-wrap items-center  ">
          <div>
            <p
              className={`text-primary overflow-ellipsis line-clamp-1 font-bold text-sm sm:text-base md:text-lg pr-2.5 `}
            >
              {carDetails.v_year || carDetails.year || "-"}{" "}
              {carDetails.make_name || carDetails.make || "-"}{" "}
              {carDetails.model_name || carDetails.model || "-"}{" "}
              {carDetails.trim_name || carDetails.trim || "-"}
            </p>
          </div>
          <p className="text-gray-500 sm:text-sm text-xs">
            {formatDateTime(carDetails.created_at)}
          </p>
        </div>
        <div className="max-w-3xl">
          <p className="text-gray-700  max-w-full overflow-ellipsis max-sm:hidden line-clamp-1 lg:line-clamp-2 text-sm">
            Transmission: {capitalize(carDetails.transmission)}
          </p>
        </div>
        <p className="text-sm text-gray-700 ">
          Condition:{" "}
          <span
            className={`font-semibold ${
              carDetails.condition === "poor"
                ? "text-red-500"
                : carDetails.condition === "good"
                  ? "text-green-500"
                  : "text-blue-500"
            }`}
          >
            {capitalize(carDetails.condition)}
          </span>
        </p>
        <div className="w-full flex justify-between items-center mt-1">
          <p className="text-gray-500 flex items-center text-xs sm:text-base gap-2">
            <CircleGauge className="w-4 h-4" />
            {carDetails.mileage?.toLocaleString() || "-"} Km
          </p>
          <div>
            {carDetails.offer ? (
              <span className="bg-green-500 py-2 px-3 rounded-lg text-white">
                Offered ${carDetails.offer}
              </span>
            ) : !carDetails.is_interested && !carDetails.offer ? (
              <span className="bg-red-500 py-2 px-3 rounded-lg text-white">
                Not Interested
              </span>
            ) : (
              <span className="bg-gray-500 py-2 px-3 rounded-lg text-white">
                No Offer
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
