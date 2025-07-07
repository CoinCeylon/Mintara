/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@components/ui/button";
import FormField from "@components/ui/form-field";
import { Label } from "@components/ui/label";
import { PasswordInput } from "@components/ui/password-input";
import { BorderedWrapper } from "@/components/wrapper";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "@/lib/schema";
import { RegistrationFormInputs } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useWallet } from "@meshsdk/react";
import toast from "react-hot-toast";
import { signUpAction } from "@/lib/actions";
import { signIn, useSession } from "next-auth/react";

export default function RegisterForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormInputs>({
    resolver: zodResolver(registrationSchema),
  });
  const { data: session } = useSession();
  const { wallet, connected, name, connect, error } = useWallet();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    if (connected && wallet) {
      wallet.getUsedAddresses().then((addresses) => {
        if (addresses.length > 0) {
          setWalletAddress(addresses[0]);
        }
      });

      // Get wallet balance
      wallet.getBalance().then((balance) => {
        const lovelace = balance.find((b) => b.unit === "lovelace");
        if (lovelace) {
          setBalance(
            (parseInt(lovelace.quantity) / 1000000).toString() + " ADA"
          );
        }
      });
    }
  }, [connected, wallet]);

  const router = useRouter();
  const onSubmit = async (data: FieldValues) => {
    console.log(data, "SIGN UP DATA");
    if (!connected) {
      toast.error("Please connect your wallet first.");
      return;
    }
    const response = await signUpAction({
      username: data.username,
      email: data.email,
      password: data.password,
      wallet: walletAddress,
    });
    console.log(response, "SIGN UP RESPONSE");
    if (response) {
      if (response.status === "success") {
        toast.success(response.message);
        await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        router.push("/dashboard");
      } else {
        toast.error(response.message);
      }
    }
  };
  console.log(errors, "ERRORS");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[650px] w-full mx-auto"
    >
      <BorderedWrapper label="Enter your details">
        <div className="grid gap-2">
          <Label>Username</Label>
          <FormField
            register={register}
            type="text"
            placeholder="Provide a username"
            name="username"
            error={errors["username"]}
          />
        </div>
        <div className="grid gap-2">
          <Label>Email</Label>
          <FormField
            register={register}
            type="email"
            placeholder="Email"
            name="email"
            error={errors["email"]}
          />
        </div>

        <div className="grid gap-2">
          <Label>Password</Label>
          <PasswordInput
            error={errors["password"]}
            register={register}
            name={"password"}
            placeholder="XXXXXXXX"
          />
        </div>
        <div className="grid gap-2">
          <Label>Confirm Password</Label>
          <PasswordInput
            error={errors["confirmPassword"]}
            register={register}
            name="confirmPassword"
            placeholder="XXXXXXXX"
          />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Button
            className="max-w-[600px] w-full"
            variant={"default"}
            disabled={connected}
            onClick={() => {
              connect("eternl");
              if (error) {
                toast.error("Failed to connect wallet. Please try again.");
              }
            }}
          >
            {connected ? "Connected" : "Connect Wallet"}
          </Button>
          {connected && (
            <BorderedWrapper wrapperClassName="w-full" label="Wallet Info">
              <p className="text-xs">
                Address:{" "}
                {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
              </p>
              <p className="text-xs">Name: {name}</p>
              <p className="text-xs">Balance: {balance}</p>
            </BorderedWrapper>
          )}
        </div>
      </BorderedWrapper>

      <div className="flex text-sm mt-4 text-center mx-auto flex-col gap-4">
        <span>
          Already registerd ?{" "}
          <Link href={"/sign-in"} className="hover:underline">
            Sign in from here
          </Link>
        </span>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="group w-full mx-auto max-w-[650px]"
          variant={"default"}
        >
          Register
        </Button>
      </div>
    </form>
  );
}
