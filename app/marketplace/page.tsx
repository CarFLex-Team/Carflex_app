import Nav from "../../components/Nav/Nav";
import Listings from "../../components/Listings/Listings";
import carDetailsArray from "../../data/MarketplaceCars.json";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view = "card" } = await searchParams;

  return (
    <>
      <Nav />
      <Listings
        active="Marketplace"
        view={view}
        carDetailsArray={carDetailsArray}
      />
    </>
  );
}
