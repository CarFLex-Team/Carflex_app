import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useCarsSheet(sheet: string) {
  return useSWR("/api/cars/sheet/" + sheet, fetcher, {
    // refreshInterval: 10000, // fallback polling
    revalidateOnFocus: true,
  });
}
