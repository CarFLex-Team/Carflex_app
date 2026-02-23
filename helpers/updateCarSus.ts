export async function updateCarValue(
  id: string,
  source: string,
  realValue: number
) {
  const res = await fetch(`/api/editCar?ad_link=${id}&source=${source}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ real_value: realValue }),
  });

  if (!res.ok) throw new Error("Update failed");
}
