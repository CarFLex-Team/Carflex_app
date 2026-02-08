export default async function fetchData({
  name,
  limit,
}: {
  name: string;
  limit?: number;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${name}Cars?limit=${limit || 20}`,
    {
      cache: "no-store", // always fetch fresh DB results
    },
  );

  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
