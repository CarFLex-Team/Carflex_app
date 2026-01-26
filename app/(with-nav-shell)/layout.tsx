import PageShell from "@/components/PageShell/PageShell";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageShell>{children}</PageShell>;
}
