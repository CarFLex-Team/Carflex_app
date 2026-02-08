import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .catch((error) => {
      console.error("Error fetching data from", url, error);
      throw error; // re-throw to let SWR know the fetch failed
    });

export function useCarsSheet(sheet: string, page?: string, search?: string) {
  return useSWR(
    `/api/cars/sheet/${sheet ? sheet : "leads"}?page=${page || "1"}&search=${search || ""}`,
    fetcher,
    {
      refreshInterval: 30_000, // fallback polling
      revalidateOnFocus: true,
    },
  );
}
