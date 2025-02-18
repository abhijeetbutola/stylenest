import clsx from "clsx";
import { ElementType, ReactNode } from "react";

type Color = "primary" | "secondary" | "error" | "warning" | "success";

interface TextProps {
  children: ReactNode;
  as?: ElementType; // Allows passing "p", "span", "div", etc.
  className?: string;
  color?: Color;
}

const colorClasses: Record<Color, string> = {
  primary: "text-blue-600",
  secondary: "text-gray-500",
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
