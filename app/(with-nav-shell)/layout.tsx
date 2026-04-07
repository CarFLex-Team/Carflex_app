import PageShell from "@/components/PageShell/PageShell";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getToken } from "next-auth/jwt";
import { validateToken } from "@/lib/auth";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  // 2. Validate JWT
  try {
    await validateToken(session.user.id, session.user.tokenVersion);
  } catch (err) {
    console.error("Token validation error:", err);
    redirect("/login"); // Force logout if token invalidated
  }

  return <PageShell>{children}</PageShell>;
}
