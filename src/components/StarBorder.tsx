import React from "react";
import "./StarBorder.css";

type StarBorderProps<T extends React.ElementType = "button"> = {
  as?: T;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "color">;

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "hsl(var(--primary))",
  speed = "2.5s",
  thickness = 3.5,
  children,
  style,
  ...rest
}: StarBorderProps<T>) => {
  const Component = (as || "button") as React.ElementType;
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...style,
      }}
      {...rest}
   >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
