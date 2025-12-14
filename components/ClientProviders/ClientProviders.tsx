"use client";

import TopLoader from "../TopLoader/TopLoader";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopLoader />
      {children}
    </>
  );
}
