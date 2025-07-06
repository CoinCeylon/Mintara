/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Progress } from "@components/ui/progress";
import {
  Wallet,
  Trophy,
  Coins,
  ShoppingCart,
  Sparkles,
  Crown,
  Check,
  Copy,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useWallet } from "@meshsdk/react";
import { useClipboard } from "use-clipboard-copy";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const { data: session } = useSession();

  const router = useRouter();
  const { wallet, connected, name, connecting, connect, disconnect } =
    useWallet();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const clipboard = useClipboard({
    copiedTimeout: 2000,
  });
  const handleCopy = () => {
    clipboard.copy(session?.user.id);
    setIsCopied(true);
  };

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

  if (!session) {
    router.push("/sign-in");
    return;
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto  !text-primary_color">
      <div className="grid grid-cols-1 gap-6">
        {/* Player Profile */}
        <Card className="mt-6 border-green-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center">
              <Crown className="w-5 h-5 mr-2" />
              Player Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 bg-transparent border-2 border-green-500">
                <AvatarFallback className="bg-transparent text-green-400">
                  {session.user.username.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-green-400">
                  {session.user?.username}
                </h3>
                <p className="text-sm text-green-600">Level 42 • Hacker</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-row justify-start items-center gap-4 w-full">
                <div>Player ID : </div>
                <div>
                  <Input
                    id="link"
                    defaultValue={session.user.id}
                    readOnly
                    className="min-w-[400px] w-full"
                  />
                </div>
                <Button
                  variant={"default"}
                  type="submit"
                  size="sm"
                  onClick={handleCopy}
                >
                  <span className="sr-only">Copy</span>
                  {isCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Experience</span>
                <span className="text-green-400">8,750 / 10,000 XP</span>
              </div>
              <Progress value={87.5} className=" [&>div]:bg-green-500" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-3  rounded-lg border border-green-500/20">
                <Coins className="w-6 h-6 mx-auto mb-1 text-green-400" />
                <div className="text-lg font-bold text-green-400">1,247</div>
                <div className="text-xs text-green-600">MINT Tokens</div>
              </div>
              <div className="text-center p-3  rounded-lg border border-green-500/20">
                <Trophy className="w-6 h-6 mx-auto mb-1 text-green-400" />
                <div className="text-lg font-bold text-green-400">23</div>
                <div className="text-xs text-green-600">NFTs Owned</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cardano Wallet Status */}
        <Card className=" border-green-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center">
              <Wallet className="w-5 h-5 mr-2" />
              Cardano Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-green-600">Status</span>
              <Badge className=" text-green-400 border-green-500/30">
                Connected
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-green-600">Wallet Address</div>
              <div className="text-sm font-mono p-2 rounded border border-green-500/20 text-green-400">{`${session.user.wallet.slice(
                0,
                10
              )}...${session.user.wallet.slice(-10)}`}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg border border-green-500/20">
                <div className="text-lg font-bold text-green-400">
                  {balance}
                </div>
                <div className="text-xs text-green-600">ADA Balance</div>
              </div>
              <div className="text-center p-3 rounded-lg border border-green-500/20">
                <div className="text-lg font-bold text-green-400">8</div>
                <div className="text-xs text-green-600">NFTs</div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <Button variant={"default"} className="w-[49%]">
                <Sparkles className="w-4 h-4 mr-2" />
                Mint Selected NFTs
              </Button>
              <Button variant="default" className="w-[49%]">
                <ShoppingCart className="w-4 h-4 mr-2" />
                View on Marketplace
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
