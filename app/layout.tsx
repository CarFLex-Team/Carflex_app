import TopLoader from "@/components/TopLoader/TopLoader";
import "../styles/globals.css";

import type { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders/ClientProviders";

export const metadata: Metadata = {
  title: "Carflex Cars",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-full m-0 font-sans">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
