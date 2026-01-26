import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user.role === "LEAD") {
      redirect("/sheet-leads");
    }
    if (session.user.role === "CALLER") {
      redirect("/sheet-caller");
    }
  }
  redirect("/listings");
}
