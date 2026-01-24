import Nav from "../../components/Sidebar/Sidebar";
import Listings from "../../components/Listings/Listings";
import PageShell from "@/components/PageShell/PageShell";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return <PageShell>{children} </PageShell>;
}
