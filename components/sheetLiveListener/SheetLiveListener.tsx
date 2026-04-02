"use client";
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
            `/api/cars/sheet/${session?.user?.name?.toLowerCase()}?page=1&search=&isAttacking=false&isFavorite=false`,
          );
          break;
        case "sheet:lead:update":
          mutate(
            "/api/cars/sheet/lead?date=" +
              new Date().toISOString().slice(0, 10),
          );
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
