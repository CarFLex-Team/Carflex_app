"use client";
import Nav from "../../components/Sidebar/Sidebar";
import Listings from "../../components/Listings/Listings";
import PageShell from "@/components/PageShell/PageShell";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageShell>{children} </PageShell>;
}
