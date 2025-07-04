"use client";

import { useWallet } from "@meshsdk/react";
import { useState, useEffect } from "react";
import { Button } from "@components/ui/button";

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
    <div>
      <Button
        className="w-full"
        variant={"default"}
        onClick={() => connect("lace")}
      >
        {connected ? "Welcome Back!" : "Connect Lace Wallet"}
      </Button>
      <p className="text-sm">Address: {walletAddress}</p>
      <p>Name: {name}</p>
      <p>Balance: {balance}</p>
    </div>
  );
}
