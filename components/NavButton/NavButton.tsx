import type { ReactNode } from "react";
import Link from "next/link";
interface NavButtonProps {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
  item: { id: string; label: string; href: string };
}

export default function NavButton(props: NavButtonProps) {
  const { className, onClick, children, item } = props;

  return (
    <Link href={`${item.href}`} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
