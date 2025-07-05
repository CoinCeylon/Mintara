"use client";

import React, { useState } from "react";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { cn } from "@/lib/utils";

type PasswordInputProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: string;
  placeholder?: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

export function PasswordInput<T extends FieldValues>({
  label,
  register,
  name,
  error,
  ...props
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <Input
          {...register(name)}
          type={showPassword ? "text" : "password"}
          className={cn(`pr-10 bg-transparent`, {
            "border border-red-400": error,
          })}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={togglePasswordVisibility}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOffIcon className="h-4 w-4 text-primary_color" />
          ) : (
            <EyeIcon className="h-4 w-4 text-primary_color" />
          )}
        </Button>
      </div>
      {error && (
        <span className=" text-xs text-red-400">{error.message as string}</span>
      )}
    </div>
  );
}
