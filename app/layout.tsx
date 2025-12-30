import TopLoader from "@/components/TopLoader/TopLoader";
import "../styles/globals.css";

import type { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders/ClientProviders";
import Nav from "@/components/Sidebar/Sidebar";

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
      <body className="min-h-screen  font-sans">
        <TopLoader />
        {children}
      </body>
    </html>
  );
}
