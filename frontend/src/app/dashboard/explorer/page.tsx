"use client";
import Loader from "@/components/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllAvailableRewardCatalogs } from "@/lib/actions";
import { RewardCatalog, Status } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Badge, Gem } from "lucide-react";
import Image from "next/image";

export default function ExplorerPage() {
  const { data, isLoading } = useQuery<Status | undefined>({
    queryKey: ["items"],
    queryFn: () => getAllAvailableRewardCatalogs(),
  });

  const availableCatalogs = (data?.data as RewardCatalog[]) ?? [];

  console.log("Available Catalogs:", availableCatalogs);

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
  return (
    <div className="min-h-screen max-w-7xl mx-auto  !text-primary_color  ">
      <Card className="mt-6 border-green-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center justify-between">
            <div className="flex items-center">
              <Gem className="w-5 h-5 mr-2" />
              Available Items
            </div>
          </CardTitle>
        </CardHeader>
        <Loader isLoading={isLoading}>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableCatalogs.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 ${getRarityColor(
                    item.rarity
                  )} rounded-lg border cursor-pointer transition-all`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Image
                      unoptimized
                      src={`https://gateway.pinata.cloud/ipfs/${item.imageUrl}`}
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
                    <Badge className={getRarityColor(item.rarity)}>
                      {item.rarity}
                    </Badge>
                    <p>{item.rarity}</p>
                  </div>
                  <p className="text-sm text-green-600 mb-2">{item.type}</p>
                  <h3 className="text-sm text-green-400 mb-1">
                    {item.description}
                  </h3>
                </div>
              ))}
            </div>
          </CardContent>
        </Loader>
      </Card>
    </div>
  );
}
