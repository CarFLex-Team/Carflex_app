// components/SheetLiveListener.tsx
"use client";

import { useEffect } from "react";
import { mutate } from "swr";

export function SheetLiveListener() {
  useEffect(() => {
    const es = new EventSource("/api/cars/sheet/stream");

    es.onmessage = () => {
      // 🔥 someone pressed SEND
      mutate("/api/cars/sheet");
    };

    es.onerror = () => {
      // browser will auto-reconnect
      es.close();
    };

    return () => es.close();
  }, []);

  return null;
}
