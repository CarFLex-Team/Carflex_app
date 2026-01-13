"use client";
import { useState } from "react";
import copy from "clipboard-copy";
import { Check, Copy, Loader } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function CopyToClipboardButton({
  carDetails,
  status,
  estimatedValue,
}: {
  carDetails: any;
  status?: string;
  estimatedValue?: string;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

      await fetch("api/save-car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...carDetails,
          status: status,
          real_value: estimatedValue,
        }),
      });
      setIsLoading(false);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text or save car details", error);
    }
  };

  return (
    <button
      className="border border-primary p-1 rounded-md text-sm text-primary hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer"
      onClick={handleCopyClick}
    >
      {isLoading ? (
        <LoadingSpinner size={4} color="white" />
      ) : isCopied ? (
        <Check size={18} />
      ) : (
        <Copy size={18} />
      )}
    </button>
  );
}
