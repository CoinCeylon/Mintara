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
  Activity,
  Shield,
  Crown,
  Gem,
  Star,
  Clock,
  CheckCircle,
  Circle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Heading from "@/components/heading";
import { useRouter } from "next/navigation";
import { useWallet } from "@meshsdk/react";

const gameItems = [
  {
    id: 1,
    name: "Quantum Blade",
    type: "Weapon",
    rarity: "Legendary",
    minted: true,
    image: "⚔️",
  },
  {
    id: 2,
    name: "Neural Shield",
    type: "Armor",
    rarity: "Epic",
    minted: false,
    image: "🛡️",
  },
  {
    id: 3,
    name: "Cyber Helmet",
    type: "Armor",
    rarity: "Rare",
    minted: true,
    image: "⛑️",
  },
  {
    id: 4,
    name: "Data Crystal",
    type: "Resource",
    rarity: "Common",
    minted: false,
    image: "💎",
  },
  {
    id: 5,
    name: "Plasma Rifle",
    type: "Weapon",
    rarity: "Epic",
    minted: true,
    image: "🔫",
  },
  {
    id: 6,
    name: "Nano Boots",
    type: "Armor",
    rarity: "Rare",
    minted: false,
    image: "👢",
  },
];

const recentActivity = [
  {
    id: 1,
    action: "Completed Quest: Digital Heist",
    reward: "+500 XP",
    time: "2 hours ago",
    icon: Trophy,
  },
  {
    id: 2,
    action: "Minted Quantum Blade NFT",
    reward: "+0.5 ADA",
    time: "4 hours ago",
    icon: Sparkles,
  },
  {
    id: 3,
    action: "Defeated Cyber Dragon",
    reward: "+1000 XP",
    time: "6 hours ago",
    icon: Shield,
  },
  {
    id: 4,
    action: "Found Data Crystal",
    reward: "+250 XP",
    time: "8 hours ago",
    icon: Gem,
  },
  {
    id: 5,
    action: "Joined Guild: Neo Hackers",
    reward: "+100 XP",
    time: "1 day ago",
    icon: Star,
  },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const router = useRouter();
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

  const toggleItemSelection = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
      case "Epic":
        return "text-purple-400 border-purple-400/30 bg-purple-400/10";
      case "Rare":
        return "text-blue-400 border-blue-400/30 bg-blue-400/10";
      default:
        return "text-gray-400 border-gray-400/30 bg-gray-400/10";
    }
  };

  if (!session) {
    router.push("/sign-in");
    return;
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto mt-12 text-green-400 p-6">
      <Heading>Dashboard</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Player Profile */}
        <Card className=" border-green-500/30 backdrop-blur-sm">
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

      {/* Game Items Grid */}
      <Card className="mt-6 border-green-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center justify-between">
            <div className="flex items-center">
              <Gem className="w-5 h-5 mr-2" />
              Earned Items
            </div>
            <div className="text-sm text-green-600">
              {selectedItems.length} selected
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gameItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedItems.includes(item.id)
                    ? "border-green-500 bg-green-500/10"
                    : "border-green-500/20 hover:border-green-500/40"
                }`}
                onClick={() => toggleItemSelection(item.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl">{item.image}</div>
                  <div className="flex items-center space-x-2">
                    {item.minted ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-400" />
                    )}
                    <Badge className={getRarityColor(item.rarity)}>
                      {item.rarity}
                    </Badge>
                  </div>
                </div>

                <h3 className="font-semibold text-green-400 mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-green-600 mb-2">{item.type}</p>

                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={
                      item.minted
                        ? "border-green-400 text-green-400"
                        : "border-yellow-400 text-yellow-400"
                    }
                  >
                    {item.minted ? "Minted" : "Unminted"}
                  </Badge>
                  {selectedItems.includes(item.id) && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="mt-6 border-green-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-3 rounded-lg border border-green-500/10"
              >
                <div className="p-2 rounded-full">
                  <activity.icon className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-green-400">{activity.action}</p>
                  <p className="text-xs text-green-600">{activity.reward}</p>
                </div>
                <div className="flex items-center text-xs text-green-600">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
