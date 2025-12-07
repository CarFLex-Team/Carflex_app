import Nav from "../../components/Nav/Nav";
import Listings from "../../components/Listings/Listings";

import getData from "@/helpers/getData";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view = "card" } = await searchParams;
  const carData = await getData();
  return (
    <>
      <Nav />
      <Listings
        active="Autotrader"
        view={view}
        carDetailsArray={carData.items}
      />
    </>
  );
}
