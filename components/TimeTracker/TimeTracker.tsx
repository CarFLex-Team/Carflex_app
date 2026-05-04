import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TimeTracker() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);
  useEffect(() => {
    if (!session?.user?.id || session.user.role !== "TEAM") return;
    console.log("TimeTracker initialized for user:", session.user.id);
    console.log("Session data:", sessionStorage.getItem("tabSessionStarted"));
    let startTime: Date;
    if (!sessionStorage.getItem("tabSessionStarted")) {
      startTime = new Date();
      sessionStorage.setItem("tabSessionStarted", "true");
      sessionStorage.setItem("startTime", startTime.toISOString());
    } else {
      const oldStartTime = new Date(sessionStorage.getItem("startTime")!);
      const hoursDiff =
        (new Date().getTime() - oldStartTime.getTime()) / (1000 * 60 * 60);
      console.log("Hours difference since last start time:", hoursDiff);
      if (hoursDiff > 14) {
        startTime = new Date();
        sessionStorage.setItem("startTime", startTime.toISOString());
      } else {
        startTime = oldStartTime;
      }
    }

    const handleUnload = () => {
      const endTime = new Date();

      navigator.sendBeacon(
        "/api/trackTime",
        JSON.stringify({
          employeeId: session.user.id,
          startTime,
          endTime,
        }),
      );
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [session?.user?.id]);

  return null;
}
