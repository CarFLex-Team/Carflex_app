// hooks/useRealtimeCars.js
"use client";
import { useEffect } from "react";
import useSWR from "swr";
import { supabase } from "@/lib/supabase";
import getValidFirstImage from "@/helpers/getValidFirstImage";
import priceStatus from "@/helpers/priceStatus";

// fetcher function for SWR
const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .catch((error) => {
      console.error("Error fetching data from", url, error);
      throw error; // re-throw to let SWR know the fetch failed
    });

export default function useRealtimeCars(
  sheet: string,
  page?: string,
  search?: string,
  isAttacking?: boolean,
  isFavorite?: boolean,
  callStatus?: string,
  isTruck?: boolean,
) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/cars/sheet/${sheet ? sheet : "leads"}?page=${page || "1"}&search=${search || ""}&isAttacking=${isAttacking}&isFavorite=${isFavorite}&callStatus=${callStatus || ""}&isTruck=${isTruck}`,
    fetcher,
    {
      // refreshInterval: 30_000, // fallback polling
      revalidateOnFocus: true,
    },
  );

  useEffect(() => {
    if (!sheet) return;
    const currentMonth = new Date().getMonth() + 1; // 1 = Jan, 4 = Apr
    const year = new Date().getFullYear();
    let newTableName = `sheet_caller_${year}_${currentMonth.toString().padStart(2, "0")}`;

    console.log("Setting up real-time listener for", newTableName);
    const insertSubscription = supabase
      .channel(`realtime-caller-insert`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: newTableName },
        () => {
          mutate(undefined, true);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(insertSubscription);
    };
  }, [
    mutate,
    sheet,
    page,
    search,
    isAttacking,
    isFavorite,
    callStatus,
    isTruck,
  ]);

  return { data, error, isLoading };
}
