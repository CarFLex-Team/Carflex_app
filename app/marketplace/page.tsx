import Nav from "../../components/Nav/Nav";
import Listings from "../../components/Listings/Listings";
export default async function Marketplace() {
  return (
    <>
      <Nav />
      <Listings active="Marketplace" />
    </>
  );
}
