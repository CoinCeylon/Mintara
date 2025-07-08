"use client";
import Loader from "@/components/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllAvailableRewardByUserId } from "@/lib/actions";
import { Reward, Status } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Badge, Coins, Gem } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function InventoryPage() {
  const { data: session } = useSession();

  console.log("Session data in inventory page:", session);

  const { data, isLoading } = useQuery<Status | undefined>({
    queryKey: ["available-rewards", session?.user.id],
    queryFn: () => getAllAvailableRewardByUserId(session?.user.id as string),
  });

  const availableRewards = (data?.data as Reward[]) ?? [];

  console.log("Data fetched explorer page :", data);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "LEGENDARY":
        return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
      case "MYTHIC":
        return "text-red-400 border-red-400/30 bg-red-400/10";
      case "EPIC":
        return "text-purple-400 border-purple-400/30 bg-purple-400/10";
      default:
        return "text-green-400 border-green-400/30 bg-green-400/10";
    }
  };
  const unMintedRewards = availableRewards.filter(
    (item) => item.status === "UNMINTED"
  );
  const mintedRewards = availableRewards.filter(
    (item) => item.status !== "UNMINTED"
  );
  return (
    <div className="min-h-screen max-w-7xl mx-auto  !text-primary_color  ">
      <Card className="mt-6 border-green-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center justify-between">
            <div className="flex items-center">
              <Gem className="w-5 h-5 mr-2" />
              In Game Assets
            </div>
          </CardTitle>
        </CardHeader>
        <Loader isLoading={isLoading}>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {unMintedRewards?.length > 0 ? (
                unMintedRewards?.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`p-4 ${getRarityColor(
                        item.rewardCatalog.rarity
                      )} rounded-lg border cursor-pointer transition-all`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Image
                          unoptimized
                          src={`https://gateway.pinata.cloud/ipfs/${item.rewardCatalog.imageUrl}`}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="rounded-md w-full h-full"
                        />
                      </div>

                      <h3 className="font-semibold text-green-400 mb-1">
                        {item.name}
                      </h3>
                      <div className="flex gap-2">
                        <Badge
                          className={getRarityColor(item.rewardCatalog.rarity)}
                        >
                          {item.rewardCatalog.rarity}
                        </Badge>
                        <p>{item.rewardCatalog.rarity}</p>
                      </div>
                      <p className="text-sm text-green-600 mb-2">
                        {item.rewardCatalog.type}
                      </p>
                      <h3 className="text-sm text-green-400 mb-1">
                        {item.rewardCatalog.description}
                      </h3>
                    </div>
                  );
                })
              ) : (
                <p className="w-full">
                  You don&apos;t have any in-game assets yet. Complete
                  challenges and earn rewards to see them here!
                </p>
              )}
            </div>
          </CardContent>
        </Loader>
      </Card>
      <Card className="mt-6 border-green-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center justify-between">
            <div className="flex items-center">
              <Coins className="w-5 h-5 mr-2" />
              My NFT Collection
            </div>
          </CardTitle>
        </CardHeader>
        <Loader isLoading={isLoading}>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mintedRewards?.length > 0 ? (
                mintedRewards?.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`p-4 ${getRarityColor(
                        item.rewardCatalog.rarity
                      )} rounded-lg border cursor-pointer transition-all`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Image
                          unoptimized
                          src={`https://gateway.pinata.cloud/ipfs/${item.rewardCatalog.imageUrl}`}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="rounded-md w-full h-full"
                        />
                      </div>

                      <h3 className="font-semibold text-green-400 mb-1">
                        {item.name}
                      </h3>
                      <div className="flex gap-2">
                        <Badge
                          className={getRarityColor(item.rewardCatalog.rarity)}
                        >
                          {item.rewardCatalog.rarity}
                        </Badge>
                        <p>{item.rewardCatalog.rarity}</p>
                      </div>
                      <p className="text-sm text-green-600 mb-2">
                        {item.rewardCatalog.type}
                      </p>
                      <h3 className="text-sm text-green-400 mb-1">
                        {item.rewardCatalog.description}
                      </h3>
                    </div>
                  );
                })
              ) : (
                <p>
                  Your NFT collection is empty. Mint your in-game assets to
                  start building your collection!
                </p>
              )}
            </div>
          </CardContent>
        </Loader>
      </Card>
    </div>
  );
}
