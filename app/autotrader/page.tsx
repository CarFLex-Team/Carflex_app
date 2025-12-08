import Nav from "../../components/Nav/Nav";
import Listings from "../../components/Listings/Listings";

import fetchData from "@/helpers/fetchData";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view = "card" } = await searchParams;
  const carData = await fetchData({ name: "autotrader", limit: 20 });
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
