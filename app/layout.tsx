import TopLoader from "@/components/TopLoader/TopLoader";
import "../styles/globals.css";

import type { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders/ClientProviders";
import Nav from "@/components/Nav/Nav";

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
      <body className="h-screen overflow-hidden font-sans">
        <TopLoader />
        <div className="flex h-full">
          <Nav />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
