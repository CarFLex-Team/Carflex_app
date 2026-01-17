// components/SheetLiveListener.tsx
"use client";

import { useEffect } from "react";
import { mutate } from "swr";

export function SheetLiveListener() {
  useEffect(() => {
    const es = new EventSource("/api/cars/sheet/stream");
    console.log(es);
    es.onmessage = (event) => {
      console.log("SheetLiveListener received event", event.data);
      const payload = JSON.parse(event.data);
      switch (payload.type) {
        case "sheet:dabou:update":
          mutate("/api/cars/sheet/dabou");
          break;
        case "sheet:ibrahim:update":
          mutate("/api/cars/sheet/ibrahim");
          break;

        case "sheet:omar:update":
          mutate("/api/cars/sheet/omar");
          break;

        case "sheet:lead:update":
          mutate("/api/cars/sheet/lead");
          break;
      }
    };

    es.onerror = () => {
      // browser will auto-reconnect
      es.close();
    };

    return () => es.close();
  }, []);

  return null;
}
