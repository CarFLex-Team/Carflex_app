import fetchData from "@/helpers/fetchData";
import AutoSwitch from "../AutoSwitch/AutoSwitch";
import CarCard from "../CarCard/CarCard";
import CarList from "../CarList/CarList";
import SelectView from "../SelectView/SelectView";
import ClientListings from "../ClientListings/ClientListings";

export default async function Listings({ active }: { active: string }) {
  const initialCarsData = await fetchData({ name: "autotrader", limit: 20 });
  return (
    <ClientListings initialCarsData={initialCarsData.items} active={active} />
  );
}
