import Nav from "../../components/Nav/Nav";
import Listings from "../../components/Listings/Listings";
export default async function Home() {
  return (
    <>
      <Nav />
      <Listings active="Marketplace" />
    </>
  );
}
