"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  functioni?: () => void;
}

export const Button = ({ children, className, functioni }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={functioni}
    >
      {children}
    </button>
  );
};
