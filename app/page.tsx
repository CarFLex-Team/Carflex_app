import Nav from "../components/SideNav/Nav";
import Listings from "../components/Listings/Listings";
export default function Home() {
  return (
    <>
      <Nav />
      <Listings page="All" />
    </>
  );
}
