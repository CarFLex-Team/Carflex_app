"use client";

import decodeVin from "@/helpers/decodeVin";
import useSWR from "swr";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
export default function DecodeResults({
  vin,
  onaAnotherVin,
}: {
  vin: string;
  onaAnotherVin: () => void;
}) {
  const { data, error, isLoading } = useSWR(
    [`vinDecode`, vin],
    () => decodeVin(vin),
    {
      revalidateOnFocus: false,
    },
  );

  if (error) return <div className="text-red-600">Failed to load</div>;
  if (isLoading && !data)
    return (
      <div className="flex justify-center mt-10">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className=" flex justify-between mt-4 bg-gray-100 rounded-md border border-gray-300 p-4">
      {data.decode_version === 1 ? (
        <div className="text-red-600">
          Unable to decode VIN. Please check the VIN and try again.
        </div>
      ) : (
        <div>
          <p className="text-xl md:text-2xl font-medium my-2">
            {data.year} {data.make.toUpperCase()} {data.model.toUpperCase()}{" "}
            {data.trim}
          </p>
          <p className="my-1 text-base md:text-lg">{vin}</p>
          <p className="my-1 text-base md:text-lg">
            {data.body_type} {data.body_subtype}{" "}
            {data.vehicle_type.toLowerCase()} | {data.engine} |{" "}
            {data.drivetrain}
          </p>
          <p className="my-1 text-base md:text-lg">
            Transmission: {data.transmission}
          </p>
          <p className="my-1 text-base md:text-lg">
            Fuel Type: {data.fuel_type}
          </p>

          <p className="my-1 text-base md:text-lg">
            Country of Assembly: {data.country}
          </p>
          {/* <p className="my-1 text-base md:text-lg">Version: {data.version}</p> */}
        </div>
      )}
      <div
        className="cursor-pointer text-lightPrimary hover:underline md:text-base text-sm "
        onClick={onaAnotherVin}
      >
        Try another VIN
      </div>
    </div>
  );
}
