import AutoSwitch from "../AutoSwitch/AutoSwitch";
import CarCard from "../CarCard/CarCard";
import CarList from "../CarList/CarList";
import SelectView from "../SelectView/SelectView";

export default async function Listings({
  active,
  view,
  carDetailsArray,
}: {
  active: string;
  view: string;
  carDetailsArray: any[];
}) {
  return (
    <div className=" px-4 sm:px-9 py-6 ">
      <div className="sm:w-full mb-8 flex justify-between items-center ">
        <p className="text-black text-2xl md:text-3xl font-bold tracking-wide ">
          {active} Listings
        </p>
        <div className="flex items-center gap-4">
          {/* <AutoSwitch /> */}
          <SelectView initial={view} />
        </div>
      </div>
      {view === "list" ? (
        <div className="grid grid-cols-1 gap-5">
          {carDetailsArray.map((carDetails) => (
            <CarList key={carDetails.id} carDetails={carDetails} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          {carDetailsArray.map((carDetails) => (
            <CarCard key={carDetails.id} carDetails={carDetails} />
          ))}
        </div>
      )}
    </div>
  );
}
