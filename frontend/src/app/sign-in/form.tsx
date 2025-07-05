"use client";

import { Button } from "@components/ui/button";
import FormField from "@components/ui/form-field";
import { Label } from "@components/ui/label";
import { PasswordInput } from "@components/ui/password-input";
import { BorderedWrapper } from "@components/wrapper";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@lib/schema";
import { LogInFormInputs } from "@lib/types";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: LogInFormInputs) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error("Invalid email or password");
      return;
    } else if (result?.ok) {
      toast.success("Login successful");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[600px] w-full mx-auto"
    >
      <BorderedWrapper label="Account details">
        <div className="grid gap-2">
          <Label>Email</Label>
          <FormField
            register={register}
            type="text"
            placeholder="Email"
            name="email"
            error={errors["email"]}
          />
        </div>
        <div className="grid gap-2">
          <Label>Password</Label>
          <PasswordInput
            placeholder="XXXXXXXX"
            error={errors["password"]}
            register={register}
            name="password"
          />
        </div>
      </BorderedWrapper>
      <div className="flex text-sm mt-4 text-center mx-auto flex-col gap-4">
        <span>
          Not registered yet ?{" "}
          <Link href={"/sign-up"} className="hover:underline">
            Sign up from here
          </Link>
        </span>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="group w-full max-w-[600px] mx-auto"
          variant={"default"}
        >
          Log in
        </Button>
      </div>
    </form>
  );
}
