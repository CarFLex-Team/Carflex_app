"use client";
import { useState } from "react";
import copy from "clipboard-copy";
import { Check, Copy } from "lucide-react";

export default function CopyToClipboardButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await copy(text + "\nCopied from Carflex App");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  return (
    <button
      className="border border-primary p-1 rounded-md text-sm text-primary hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer"
      onClick={handleCopyClick}
    >
      {isCopied ? <Check size={18} /> : <Copy size={18} />}
    </button>
  );
}
