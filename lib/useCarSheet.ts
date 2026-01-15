import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useCarsSheet() {
  return useSWR("/api/cars/sheet", fetcher, {
    // refreshInterval: 10000, // fallback polling
    revalidateOnFocus: true,
  });
}
