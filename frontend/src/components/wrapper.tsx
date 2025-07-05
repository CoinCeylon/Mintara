import React from "react";
import { cn } from "@/lib/utils";

type BorderedWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  labelClassName?: string;
  wrapperClassName?: string;
  children: React.ReactNode;
};

export function BorderedWrapper({
  label,
  labelClassName,
  wrapperClassName,
  children,
  className,
  ...props
}: BorderedWrapperProps) {
  return (
    <div
      className={cn(
        "relative border-2 border-primary_color bg-[#020A09] text-primary_color rounded-md p-6 mt-6",
        wrapperClassName
      )}
      {...props}
    >
      <span
        className={cn(
          "absolute -top-3 left-2 px-1 bg-[#020A09] text-sm font-medium",
          labelClassName
        )}
      >
        {label}
      </span>
      <div className={cn("space-y-3", className)}>{children}</div>
    </div>
  );
}
