import SideNav from "../../components/SideNav/Nav";
import Listings from "../../components/Listings/Listings";
export default function Home() {
  return (
    <>
      <SideNav />

      <Listings page="Kijiji" />
    </>
  );
}
