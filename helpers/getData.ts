export default async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/autotraderCars?limit=20`,
    {
      cache: "no-store", // always fetch fresh DB results
    }
  );

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}
