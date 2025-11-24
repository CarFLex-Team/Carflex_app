import CarCard from "../CarCard/CarCard";
export default function Listings() {
  const carDetails = {
    //Missing: discription in autotrader
    id: 1,
    title: "2020 Honda Civic",
    price: 25000,
    location: "Toronto, ON",
    odometer: "/cars/civic2020.jpg",
    mileage: 15000,
    ad_link: "/listings/1",
    discription: "A well-maintained sedan with great fuel efficiency.",
  };
  return (
    <div className=" px-6 sm:px-9 py-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
        <CarCard carDetails={carDetails} />
        <CarCard carDetails={carDetails} />
        <CarCard carDetails={carDetails} />
        <CarCard carDetails={carDetails} />
        <CarCard carDetails={carDetails} />
        <CarCard carDetails={carDetails} />
        <CarCard carDetails={carDetails} />
        <CarCard carDetails={carDetails} />
        <CarCard carDetails={carDetails} />
        <CarCard carDetails={carDetails} />
        <CarCard carDetails={carDetails} />
        <CarCard carDetails={carDetails} />
        <CarCard carDetails={carDetails} />
        <CarCard carDetails={carDetails} />
        <CarCard carDetails={carDetails} />
      </div>
    </div>
  );
}
