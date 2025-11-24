import type { ReactNode } from "react";
import Link from "next/link";
interface NavButtonProps {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
  item: { id: string; label: string; href: string };
  isActive?: boolean;
}
const colorMap: Record<string, string> = {
  Autotrader: "bg-red-800",
  Kijiji: "bg-violet-800",
  Marketplace: "bg-blue-800", // example additional
};
export default function NavButton(props: NavButtonProps) {
  const { className, onClick, children, item, isActive } = props;

  return (
    <Link
      href={`${item.href}`}
      className={`${className} ${
        isActive
          ? "text-white bg-primary shadow-[0_0px_12px_rgba(0,0,0,0.5)] rounded-xl "
          : //+ colorMap[item.label]
            ""
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
