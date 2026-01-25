"use client";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { BotMessageSquare } from "lucide-react";
export default function PageShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);
  return (
    <SessionProvider>
      <div className="flex h-screen">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <div className="flex flex-col flex-1 relative">
          <div className="absolute bottom-5 right-7 rounded-full bg-primary w-12 h-12 z-50 flex items-center justify-center  cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <BotMessageSquare color="white" size={32} strokeWidth={2} />
          </div>
          <TopNav onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-auto ">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
