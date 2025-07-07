import { cn } from "@/lib/utils";
import React from "react";

interface LoaderProps {
  children: React.ReactNode;
  isLoading: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
  text?: string;
  adjustHeight?: boolean;
}

export default function Loader({
  children,
  adjustHeight = false,
  isLoading,
  size = "md",
  text = "Loading",
}: Readonly<LoaderProps>) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4 ",
  };

  return isLoading ? (
    <div
      className={cn("flex items-center justify-center", {
        "min-h-[60vh]": adjustHeight,
      })}
    >
      <div className="flex flex-col items-center space-y-2">
        <div
          className={`animate-spin rounded-full ${sizeClasses[size]} border-t-transparent border-primary_color`}
        />
        <p className="text-sm font-medium">{text}</p>
      </div>
    </div>
  ) : (
    children
  );
}
