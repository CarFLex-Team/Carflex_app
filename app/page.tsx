import Nav from "../components/Nav/Nav";
import Listings from "../components/Listings/Listings";
export default function Home() {
  return (
    <>
      <Nav />
      <Listings page="All" />
    </>
  );
}
