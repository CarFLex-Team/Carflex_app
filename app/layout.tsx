import "../styles/globals.css";
import type { Metadata } from "next";

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
      <body className="min-h-full m-0 font-sans">{children}</body>
    </html>
  );
}
