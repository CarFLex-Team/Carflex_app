"use client";
import { useState } from "react";
import { Check, Forward, X } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import NotifyDialog from "../NotifyDialog/ConfirmDialog";

export default function CopyToClipboardButton({
  carDetails,
}: {
  carDetails: any;
}) {
  const [isForwarded, setIsForwarded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleForwardClick = async () => {
    try {
      setIsLoading(true);

      const res = await fetch("api/cars/sheet/forward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carDetails),
      });
      setIsLoading(false);
      if (!res.ok) {
        throw new Error("Failed to forward car details");
      }
      setIsForwarded(true);
      setTimeout(() => setIsForwarded(false), 2000);
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
        className="border border-primary   text-sm  hover:text-white transition-colors duration-300  bg-primary rounded-lg p-1.5 text-white hover:bg-lightPrimary cursor-pointer text-center"
        onClick={handleForwardClick}
      >
        {isLoading ? (
          <LoadingSpinner size={4} color="white" />
        ) : error ? (
          <X size={16} />
        ) : isForwarded ? (
          <Check size={16} />
        ) : (
          <Forward size={16} />
        )}
      </button>
      {open && <NotifyDialog title="Car already Sent" isOpen={open} />}
    </>
  );
}
