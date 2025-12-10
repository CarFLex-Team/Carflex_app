import Nav from "../../components/Nav/Nav";
import Listings from "../../components/Listings/Listings";
import carDetailsArray from "../../data/KijijiCars.json";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view = "card" } = await searchParams;

  return (
    <>
      <Nav />
      <Listings active="Kijiji" />
    </>
  );
}
