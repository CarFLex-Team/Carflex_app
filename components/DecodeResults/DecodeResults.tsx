"use client";
export default function DecodeResults({
  vin,
  onaAnotherVin,
}: {
  vin: string;
  onaAnotherVin: () => void;
}) {
  return (
    <div className=" flex justify-between mt-4 bg-gray-100 rounded-md border border-gray-300 p-4">
      <div>
        <p className="text-xl md:text-2xl font-medium my-2">
          2015 Toyota Sienna Base
        </p>
        <p className="my-1 text-base md:text-lg">
          Mini-van, Passenger | 3.5L V6 | FWD
        </p>
        <p className="my-1 text-base md:text-lg">5TDZK3DC9FS629267</p>
        <p className="my-1 text-base md:text-lg">
          Country of Assembly: United States
        </p>
      </div>
      <div
        className="cursor-pointer text-lightPrimary hover:underline md:text-base text-sm "
        onClick={onaAnotherVin}
      >
        Try another VIN
      </div>
    </div>
  );
}
