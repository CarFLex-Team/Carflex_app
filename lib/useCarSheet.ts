import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useCarsSheet(sheet: string, page?: string, search?: string) {
  return useSWR(
    `/api/cars/sheet/${sheet ? sheet : "leads"}?page=${page || 1}&search=${search || ""}`,
    fetcher,
    {
      // refreshInterval: 30_000, // fallback polling
      revalidateOnFocus: true,
    },
  );
}
