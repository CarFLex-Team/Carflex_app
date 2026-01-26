// components/SheetLiveListener.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { mutate } from "swr";

export function SheetLiveListener() {
  const { data: session, status } = useSession();
  useEffect(() => {
    const es = new EventSource("/api/cars/sheet/stream");
    es.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      switch (payload.type) {
        case "sheet:caller:update":
          mutate(
            `/api/cars/sheet/${session?.user?.name?.toLowerCase()}?date=${new Date().toISOString().slice(0, 10)}`,
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
  }, [session?.user?.name]);

  return null;
}
