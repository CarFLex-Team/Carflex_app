import Nav from "../components/Nav/Nav";
import Listings from "../components/Listings/Listings";
import priceStatus from "@/helpers/priceStatus";
export default async function Home() {
  return (
    <>
      <Nav />
      <Listings active="All" />
    </>
  );
}
