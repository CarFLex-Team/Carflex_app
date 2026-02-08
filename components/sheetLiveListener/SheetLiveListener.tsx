"use client";

import fetchData from "@/helpers/fetchData";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { mutate } from "swr";

export function SheetLiveListener({
  name,
  limit,
}: {
  name?: string;
  limit?: number;
}) {
  const { data: session, status } = useSession();
  useEffect(() => {
    const es = new EventSource("/api/cars/sheet/stream");
    es.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      switch (payload.type) {
        case "sheet:caller:update":
          console.log("Caller sheet updated, refetching data...");
          mutate(
            `/api/cars/sheet/${session?.user?.name?.toLowerCase()}?page=1&search=`,
          );
          break;
        case "sheet:lead:update":
          mutate(
            "/api/cars/sheet/lead?date=" +
              new Date().toISOString().slice(0, 10),
          );
          break;
        case "sheet:team:update":
          if (session?.user?.role !== "TEAM") return;
          (async () => {
            const updatedData = await fetchData({ name: name || "", limit }); // Now `await` works
            mutate([name, Number(limit ?? 20)], updatedData, false); // Update cache with fresh data
          })(); // Immediately invoking the async function
          break;
      }
    };

    es.onerror = () => {
      // browser will auto-reconnect
      es.close();
    };

    return () => es.close();
  }, [session?.user?.name, name, limit]);

  return null;
}
