import fetchData from "@/helpers/fetchData";

import ClientListings from "../ClientListings/ClientListings";

export default async function Listings({
  active,
  limit,
}: {
  active: string;
  limit?: number;
}) {
  const initialCarsData = await fetchData({
    name: active.toLowerCase(),
    limit: limit ?? 20,
  });
  return (
    <ClientListings
      initialCarsData={initialCarsData.items}
      active={active}
      limit={limit}
    />
  );
}
