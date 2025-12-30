"use client";
import { useState } from "react";

import verifyCarFetch from "@/helpers/verifyCarFetch";
import useSWR from "swr";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
export default function CustomButton({
  img,
  className,
  title,
}: {
  img: string;
  className?: string;
  title?: string;
}) {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, isLoading, error } = useSWR(
    shouldFetch ? "verify-car" : null,
    () => verifyCarFetch(img),
    {
      revalidateOnFocus: false,
    }
  );
  const verifyCar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShouldFetch(true);
  };

  return (
    <button
      className={`border border-solid border-gray-300 text-gray-200  cursor-pointer shadow-md px-2.5 py-0.5 rounded-md  w-fit sm:text-base  transition-colors duration-200 ${className}`}
      onClick={verifyCar}
    >
      {title ? (
        title
      ) : isLoading ? (
        <LoadingSpinner size={4} color="white" />
      ) : error ? (
        "Error"
      ) : data ? (
        `${data}`
      ) : (
        "Verify"
      )}
    </button>
  );
}
