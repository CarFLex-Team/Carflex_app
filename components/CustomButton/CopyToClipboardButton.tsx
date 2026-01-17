"use client";
import { useState } from "react";
import copy from "clipboard-copy";
import { Check, Copy, Loader, X } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import NotifyDialog from "../NotifyDialog/ConfirmDialog";

export default function CopyToClipboardButton({
  carDetails,
  status,
  estimatedValue,
}: {
  carDetails: any;
  status?: string;
  estimatedValue?: number;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleCopyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await copy(
        carDetails.ad_link +
          `\n${status === "Unknown" || !status ? "" : status?.toUpperCase()}` +
          `${
            estimatedValue
              ? `\nEstimated Value: $${estimatedValue}`
              : carDetails.est_value
              ? `\nEstimated Value: $${carDetails.est_value}`
              : ""
          }` +
          "\nGenerated using Carflex App"
      );

      const res = await fetch("api/cars/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...carDetails,
          status,
          real_value: Number(estimatedValue),
        }),
      });
      setIsLoading(false);
      if (!res.ok) {
        throw new Error("Failed to save car details");
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      setOpen(true);
      setTimeout(() => setError(false), 2000);
      setTimeout(() => setOpen(false), 1000);
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
          <X size={18} />
        ) : isCopied ? (
          <Check size={18} />
        ) : (
          <Copy size={18} />
        )}
      </button>
      {open && <NotifyDialog title="Car already Sent" isOpen={open} />}
    </>
  );
}
