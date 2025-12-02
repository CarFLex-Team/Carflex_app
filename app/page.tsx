import Nav from "../components/Nav/Nav";
import Listings from "../components/Listings/Listings";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view = "card" } = await searchParams;
  const res = await fetch("http://localhost:3000/api/allCars");
  const json = await res.json();
  console.log(json);
  return (
    <>
      <Nav />
      <Listings active="All" view={view} />
    </>
  );
}
