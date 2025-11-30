type Props = {
  params: {
    id: string;
  };
};

export default async function CarDetailsPage({ params }: Props) {
  const { id } = await params;
  // fetch car info from your API or DB
  //   const res = await fetch(`https://your-api.com/cars/${id}`);
  //   const car = await res.json();
  const car = {
    id: 1,
    Source: "Autotrader",
    title: "2020 Honda Civic Sedan 4dr Auto LX",
    price: 25000,
    location: "Toronto, ON",
    image_src:
      "https://www.hdcarwallpapers.com/thumbs/2020/2020_honda_civic_type_r_5k_4-t2.jpg",
    odometer: 15000,
    estValue: 28000,
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
  };

  //   console.log("Fetching car details for ID:", id);

  return (
    <div>
      <h1>Car ID: {id}</h1>
      <h2>
        {car.title} {car.odometer}km
      </h2>
      <p>Price: ${car.price}</p>
    </div>
  );
}
