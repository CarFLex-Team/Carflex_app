import CarCard from "../CarCard/CarCard";
import CarList from "../CarList/CarList";
import SelectView from "../SelectView/SelectView";

export default async function Listings({
  active,
  view,
}: {
  active: string;
  view: string;
}) {
  console.log("Listings component view prop:", view);
  const carDetailsArray = [
    {
      id: 1,
      Source: "Autotrader",
      title: "2020 Honda Civic Sedan 4dr Auto LX ",
      price: 250000,
      location: "Toronto, ON",
      image_src:
        "https://www.hdcarwallpapers.com/thumbs/2020/2020_honda_civic_type_r_5k_4-t2.jpg",
      odometer: 15000,
      estValue: 280000,
      status: "Steal",
      ad_link:
        "https://www.autotrader.ca/a/toyota/corolla/london/ontario/19_13230729_/?showcpo=ShowCpo&ncse=no&ursrc=boost&orup=1_15_953&pc=N6B%203B4&sprx=100&lstIdx=9&srtOrd=ScoringProfileBoostDesc&lstName=advancedSearch",
      description: `2015 Civic Sedan
        Automatic
        125K
        Car drives well, in great condition.
        Selling because my wife got a new car. 2015 Civic Sedan
        Automatic
        125K
        Car drives well, in great condition.
        Selling because my wife got a new car.`,
    },
    {
      id: 2,
      Source: "Kijiji",
      title: "2020 Honda Civic Sedan 4dr Auto LX",
      price: 25000,
      location: "Toronto, ON",
      image_src:
        "https://www.hdcarwallpapers.com/thumbs/2020/2020_honda_civic_type_r_5k_4-t2.jpg",
      odometer: 15000,
      estValue: 26000,
      status: "Good",
      ad_link:
        "https://www.kijiji.ca/v-cars-vehicles/london/2015-honda-civic-sedan-4dr-auto-lx/1534567890",
      description: `2015 Civic Sedan
        Automatic
        125K
        Car drives well, in great condition.
        Selling because my wife got a new car. 2015 Civic Sedan
        Automatic
        125K
        Car drives well, in great condition.
        Selling because my wife got a new car.`,
    },
    {
      id: 3,
      Source: "Marketplace",
      title: "2020 Honda Civic Sedan 4dr Auto LX",
      price: 25000,
      location: "Toronto, ON",
      image_src:
        "https://www.hdcarwallpapers.com/thumbs/2020/2020_honda_civic_type_r_5k_4-t2.jpg",
      odometer: 15000,
      estValue: 25000,
      status: "Fair",
      ad_link: "/listings/1",
      description: `2015 Civic Sedan
        Automatic
        125K
        Car drives well, in great condition.
        Selling because my wife got a new car. 2015 Civic Sedan
        Automatic
        125K
        Car drives well, in great condition.
        Selling because my wife got a new car.`,
    },
    {
      id: 4,
      Source: "Marketplace",
      title: "2020 Honda Civic Sedan 4dr Auto LX",
      price: 25000,
      location: "Toronto, ON",
      image_src:
        "https://www.hdcarwallpapers.com/thumbs/2020/2020_honda_civic_type_r_5k_4-t2.jpg",
      odometer: 15000,
      estValue: 22000,
      status: "Pass",
      ad_link: "/listings/1",
      description: `2015 Civic Sedan
        Automatic
        125K
        Car drives well, in great condition.
        Selling because my wife got a new car. 2015 Civic Sedan
        Automatic
        125K
        Car drives well, in great condition.
        Selling because my wife got a new car.`,
    },
  ];

  return (
    <div className=" px-4 sm:px-9 py-6 ">
      <div className="sm:w-full mb-8 flex justify-between items-center ">
        <p className="text-black text-2xl md:text-3xl font-bold tracking-wide ">
          {active} Listings
        </p>
        <SelectView initial={view} />
      </div>
      {view === "list" ? (
        <div className="grid grid-cols-1 gap-5">
          <CarList carDetails={carDetailsArray[0]} />
          <CarList carDetails={carDetailsArray[1]} />
          <CarList carDetails={carDetailsArray[2]} />
          <CarList carDetails={carDetailsArray[3]} />
          <CarList carDetails={carDetailsArray[0]} />
          <CarList carDetails={carDetailsArray[0]} />
          <CarList carDetails={carDetailsArray[0]} />
          <CarList carDetails={carDetailsArray[0]} />
          <CarList carDetails={carDetailsArray[0]} />
          <CarList carDetails={carDetailsArray[0]} />
          <CarList carDetails={carDetailsArray[0]} />
          <CarList carDetails={carDetailsArray[0]} />
          <CarList carDetails={carDetailsArray[0]} />
          <CarList carDetails={carDetailsArray[0]} />
          <CarList carDetails={carDetailsArray[0]} />
          <CarList carDetails={carDetailsArray[0]} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          <CarCard carDetails={carDetailsArray[0]} />
          <CarCard carDetails={carDetailsArray[1]} />
          <CarCard carDetails={carDetailsArray[2]} />
          <CarCard carDetails={carDetailsArray[3]} />
          <CarCard carDetails={carDetailsArray[0]} />
          <CarCard carDetails={carDetailsArray[0]} />
          <CarCard carDetails={carDetailsArray[0]} />
          <CarCard carDetails={carDetailsArray[0]} />
          <CarCard carDetails={carDetailsArray[0]} />
          <CarCard carDetails={carDetailsArray[0]} />
          <CarCard carDetails={carDetailsArray[0]} />
          <CarCard carDetails={carDetailsArray[0]} />
          <CarCard carDetails={carDetailsArray[0]} />
          <CarCard carDetails={carDetailsArray[0]} />
          <CarCard carDetails={carDetailsArray[0]} />
          <CarCard carDetails={carDetailsArray[0]} />
        </div>
      )}
    </div>
  );
}
