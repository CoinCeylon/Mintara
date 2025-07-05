"use client";

import { useWallet } from "@meshsdk/react";
import { useState, useEffect } from "react";
import { Button } from "@components/ui/button";
import { BorderedWrapper } from "./wrapper";

export default function ConnectWallet() {
  const { wallet, connected, name, connect } = useWallet();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    if (connected && wallet) {
      wallet.getRewardAddresses().then((addresses) => {
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

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <Button
        className="w-full"
        variant={"default"}
        disabled={connected}
        onClick={() => connect("lace")}
      >
        {connected ? "Connected" : "Connect Lace Wallet"}
      </Button>
      {connected && (
        <BorderedWrapper label="Wallet Info">
          <p className="text-sm">Address: {walletAddress}</p>
          <p className="text-sm">Name: {name}</p>
          <p className="text-sm">Balance: {balance}</p>
        </BorderedWrapper>
      )}
    </div>
  );
}
