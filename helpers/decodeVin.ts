export default async function decodeVin(vin: string) {
  // const url = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`;
  const url = `https://api.marketcheck.com/v2/decode/car/neovin/${vin}/specs?api_key=${"fVHi4Jmee2osQkopWH3GW3s3ytaMK6bh"}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }

  const data = await res.json();
  return data;
}
