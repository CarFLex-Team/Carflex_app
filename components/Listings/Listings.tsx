import fetchData from "@/helpers/fetchData";

import ClientListings from "../ClientListings/ClientListings";

export default async function Listings({ active }: { active: string }) {
  const initialCarsData = await fetchData({
    name: active.toLowerCase(),
    limit: 20,
  });
  return (
    <ClientListings initialCarsData={initialCarsData.items} active={active} />
  );
}
