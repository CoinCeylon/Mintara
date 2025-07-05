import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
  UseFormRegister,
} from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: string;
  placeholder?: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

export default function FormField<T extends FieldValues>({
  type,
  placeholder,
  name,
  register,
  error,
}: InputFieldProps<T>) {
  return (
    <>
      <Input
        type={type}
        className={cn("w-full bg-transparent", {
          "border border-red-400": error,
        })}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && (
        <span className=" text-xs text-red-400">{error.message as string}</span>
      )}
    </>
  );
}
