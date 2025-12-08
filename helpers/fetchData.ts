export default async function fetchData({
  name,
  limit = 20,
}: {
  name: string;
  limit?: number;
}) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/${name}Cars?limit=${limit}`,
    {
      cache: "no-store", // always fetch fresh DB results
    }
  );

  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
