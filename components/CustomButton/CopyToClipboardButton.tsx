"use client";
import { useEffect, useState } from "react";
import copy from "clipboard-copy";
import { Check, Copy, Loader, X } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import NotifyDialog from "../NotifyDialog/ConfirmDialog";
import { useSettingsStore } from "@/store/useSettingStore";

export default function CopyToClipboardButton({
  carDetails,
  status,
  estimatedValue,
  session,
}: {
  carDetails: any;
  status?: string;
  estimatedValue?: number;
  session?: any;
}) {
  const callerName = useSettingsStore((s) => s.callerName);
  const [isCopied, setIsCopied] = useState(carDetails.is_sent || false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [is_truck, setIsTruck] = useState(false);
  useEffect(() => {
    if (carDetails.is_sent) {
      setIsCopied(true);
    }
  }, [carDetails.is_sent]);
  const handleCopyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      setIsLoading(true);
      if (
        carDetails.title.toLowerCase().includes("150") ||
        carDetails.title.toLowerCase().includes("250") ||
        carDetails.title.toLowerCase().includes("350") ||
        carDetails.title.toLowerCase().includes("ram") ||
        carDetails.title.toLowerCase().includes("sierra") ||
        carDetails.title.toLowerCase().includes("silverado") ||
        carDetails.title.toLowerCase().includes("tundra") ||
        carDetails.title.toLowerCase().includes("tacoma")
      ) {
        console.log("Identified as truck based on title:", carDetails.title);
        setIsTruck(true);
      }
      const res = await fetch("/api/cars/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...carDetails,
          status,
          real_value: Number(estimatedValue),
          sheet_id: callerName,
          sent_by: session?.user?.name,
          is_truck,
        }),
      });
      setIsLoading(false);
      if (!res.ok) {
        throw new Error("Failed to save car details" + res.statusText);
      }
      if (res.ok) {
        await copy(
          carDetails.ad_link +
            `\n${status === "Unknown" || !status ? "" : status?.toUpperCase()}` +
            `${
              estimatedValue || estimatedValue === 0
                ? `\nEstimated Value: $${estimatedValue}`
                : carDetails.est_value
                  ? `\nEstimated Value: $${carDetails.est_value}`
                  : ""
            }` +
            "\nGenerated using Carflex App",
        );
      }

      setIsCopied(true);
      // setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError(true);
      setOpen(true);
      setTimeout(() => setError(false), 4000);
      setTimeout(() => setOpen(false), 4000);
      console.error("Failed to copy text or save car details", error);
    }
  };

  return (
    <>
      <button
        className="border border-primary p-1 rounded-md text-sm text-primary hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer"
        onClick={handleCopyClick}
      >
        {isLoading ? (
          <LoadingSpinner size={4} color="white" />
        ) : error ? (
          <X size={17} />
        ) : isCopied ? (
          <Check size={17} />
        ) : (
          <Copy size={17} />
        )}
      </button>
      {open && (
        <NotifyDialog
          title="Car may be already sent or you missed to pick the caller"
          isOpen={open}
        />
      )}
    </>
  );
}
