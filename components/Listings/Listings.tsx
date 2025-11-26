import { stat } from "fs";
import CarCard from "../CarCard/CarCard";
export default function Listings({ active }: { active: string }) {
  const carDetailsArray = [
    {
      id: 1,
      Source: "Autotrader",
      title: "2020 Honda Civic Sedan 4dr Auto LX",
      price: 25000,
      location: "Toronto, ON",
      image_src:
        "https://www.hdcarwallpapers.com/thumbs/2020/2020_honda_civic_type_r_5k_4-t2.jpg",
      odometer: 15000,
      status: "Steal",
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
      id: 2,
      Source: "Kijiji",
      title: "2020 Honda Civic Sedan 4dr Auto LX",
      price: 25000,
      location: "Toronto, ON",
      image_src:
        "https://www.hdcarwallpapers.com/thumbs/2020/2020_honda_civic_type_r_5k_4-t2.jpg",
      odometer: 15000,
      status: "Good",
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
      id: 3,
      Source: "Marketplace",
      title: "2020 Honda Civic Sedan 4dr Auto LX",
      price: 25000,
      location: "Toronto, ON",
      image_src:
        "https://www.hdcarwallpapers.com/thumbs/2020/2020_honda_civic_type_r_5k_4-t2.jpg",
      odometer: 15000,
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
    <div className=" px-6 sm:px-9 py-6 ">
      <div className="sm:w-full mb-8">
        <p className="text-black text-2xl md:text-3xl font-bold tracking-wide">
          {active} Listings
        </p>
      </div>
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
    </div>
  );
}
