import Listings from "../../components/Listings/Listings";
export default async function All() {
  return <Listings active="All" limit={50} />;
}
