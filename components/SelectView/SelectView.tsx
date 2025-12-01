"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function SelectView({ initial }: { initial?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams?.get("view") ?? initial ?? "card";

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const view = e.target.value;
      // update the URL; server will re-render the page for the new param
      router.push(`?view=${view}`, { scroll: false });
    },
    [router]
  );

  return (
    <select
      value={current}
      onChange={onChange}
      className="p-1 border border-primary rounded-lg focus:ring focus:ring-primary focus:outline-none "
    >
      <option value="card">Card View</option>
      <option value="list">List View</option>
    </select>
  );
}
