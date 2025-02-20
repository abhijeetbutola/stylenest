import clsx from "clsx";
import { ElementType, ReactNode } from "react";

type Color = "primary" | "secondary" | "error" | "warning" | "success";

interface TextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  color?: Color;
}

const colorClasses: Record<Color, string> = {
  primary: "text-neutral-900 text-base font-normal",
  secondary: "text-neutral-600 text-base font-normal",
  error: "text-red-600",
  warning: "text-yellow-600",
  success: "text-green-600",
};

function Text({ children, as: Tag = "p", className = "", color }: TextProps) {
  return (
    <Tag
      className={clsx("text-base", color ? colorClasses[color] : "", className)}
    >
      {children}
    </Tag>
  );
}

export default Text;
