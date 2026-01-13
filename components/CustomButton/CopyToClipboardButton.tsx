"use client";
import { useState } from "react";
import copy from "clipboard-copy";
import { Check, Copy, Loader } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function CopyToClipboardButton({
  carDetails,
}: {
  carDetails: any;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await copy(carDetails.ad_link + "\nCopied from Carflex App");

      await fetch("api/save-car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carDetails),
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
        <LoadingSpinner size={4} />
      ) : isCopied ? (
        <Check size={18} />
      ) : (
        <Copy size={18} />
      )}
    </button>
  );
}
