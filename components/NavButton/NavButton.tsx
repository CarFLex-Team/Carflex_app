import type { ReactNode } from "react";
import "./NavButton.css";
interface NavButtonProps {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export default function NavButton(props: NavButtonProps) {
  const { className, onClick, children } = props;

  return (
    <button onClick={onClick} className={className}>
      <span>{children}</span>
    </button>
  );
}
