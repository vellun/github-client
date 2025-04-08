import * as React from "react";

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: "primary" | "secondary" | "accent";
};

export const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  width = "24",
  height = "24",
  viewBox = "0 0 24 24",
  children,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

