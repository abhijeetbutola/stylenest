import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`bg-white max-w-[1408px] flex-1 rounded-t-lg w-full mx-4 ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
