"use client";

import { useWallet } from "@meshsdk/react";
import { useState, useEffect } from "react";
import { Button } from "@components/ui/button";

export default function WalletConnection() {
  const { wallet, connected, name, connecting, connect, disconnect } =
    useWallet();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    if (connected && wallet) {
      // Get wallet address
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

  if (connecting) {
    return <div className="p-4">Connecting wallet...</div>;
  }

  return (
    <div className="p-6 border rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Cardano Wallet</h2>

      {connected ? (
        <div className="space-y-3">
          <div>
            <strong>Wallet:</strong> {name}
          </div>
          {walletAddress && (
            <div>
              <strong>Address:</strong>
              <div className="text-sm break-all text-gray-600">
                {walletAddress}
              </div>
            </div>
          )}
          {balance && (
            <div>
              <strong>Balance:</strong> {balance}
            </div>
          )}
          <button
            onClick={disconnect}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-gray-600">
            Connect your Cardano wallet to get started
          </p>
          <button
            onClick={() => connect("nami")}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Connect Nami Wallet
          </button>
          <Button variant={"default"} onClick={() => connect("lace")}>
            Connect Lace Wallet
          </Button>
          <button
            onClick={() => connect("eternl")}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Connect Eternl Wallet
          </button>
          <button
            onClick={() => connect("flint")}
            className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Connect Flint Wallet
          </button>
        </div>
      )}
    </div>
  );
}
