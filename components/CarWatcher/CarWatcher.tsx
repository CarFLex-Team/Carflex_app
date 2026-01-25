"use client";

import { useEffect, useRef } from "react";
// import { toast } from "sonner";

type Car = { id: string };

export default function CarWatcher({
  cars,
  otherSound,
}: {
  cars: Car[];
  otherSound?: boolean;
}) {
  const lastCarIdRef = useRef<string | null>(null);
  const soundEnabled = useRef(false);

  useEffect(() => {
    const enableSound = () => {
      soundEnabled.current = true;
    };

    window.addEventListener("click", enableSound, { once: true });
    window.addEventListener("touchstart", enableSound, { once: true });

    return () => {
      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
    };
  }, []);

  useEffect(() => {
    if (!cars?.length) return;

    const newestCar = cars[0];

    if (!lastCarIdRef.current) {
      lastCarIdRef.current = newestCar.id;
      return;
    }

    if (newestCar.id !== lastCarIdRef.current) {
      //   toast.success("🚗 New car added!");

      if (soundEnabled.current) {
        const audio = new Audio(
          otherSound ? "/other-notify.mp3" : "/notify.mp3",
        );
        audio.play().catch(() => {});
      }

      lastCarIdRef.current = newestCar.id;
    }
  }, [cars]);

  return null;
}
