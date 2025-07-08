"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAllAvailableRewardByUserId,
  getNFTMetaData,
  updateRewardAsMinted,
} from "@/lib/actions";
import type { MetaDataResponse, Reward, Status } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Badge, Check, DollarSign } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { Transaction, ForgeScript } from "@meshsdk/core";
import { BrowserWallet } from "@meshsdk/wallet";

export default function MarketplacePage() {
  const { data: session } = useSession();
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isMinting, setIsMinting] = useState(false);

  const { data, isLoading, refetch } = useQuery<Status | undefined>({
    queryKey: ["available-rewards", session?.user.id],
    queryFn: () => getAllAvailableRewardByUserId(session?.user.id as string),
  });

  const handleMintNFT = async () => {
    if (!selectedReward) {
      toast.error("Please select a reward to mint as NFT.");
      return;
    }

    setIsMinting(true);
    try {
      // Fetch NFT metadata
      const response = await getNFTMetaData(selectedReward.id);
      const metadataResponse = response?.data as MetaDataResponse;

      if (response?.status !== "success" || !metadataResponse) {
        toast.error("Failed to fetch NFT metadata.");
        return;
      }

      // Connect wallet
      const wallet = await BrowserWallet.enable("eternl");
      console.log("Wallet connected successfully");

      const addresses = await wallet.getUsedAddresses();
      const changeAddress = addresses[0];

      if (!changeAddress) {
        toast.error("No wallet address found.");
        return;
      }
      const assetName = selectedReward.name
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 32);

      const metadata721 = metadataResponse.metadata?.["721"];
      if (!metadata721) {
        toast.error("NFT metadata missing '721' standard");
        return;
      }

      const policyIds = Object.keys(metadata721);
      const matchingPolicyId = policyIds.find((id) =>
        Object.keys(metadata721[id] ?? {}).includes(selectedReward.name)
      );

      if (!matchingPolicyId) {
        toast.error("NFT metadata does not contain selected reward.");
        return;
      }

      const sourceMetadata = metadata721[matchingPolicyId][selectedReward.name];

      const imageRef = `${sourceMetadata.image}`.slice(0, 64);

      const assetMetadata = {
        "721": {
          [matchingPolicyId]: {
            [assetName]: {
              name: (sourceMetadata.name || assetName).slice(0, 32),
              description: (sourceMetadata.description || "NFT Reward").slice(
                0,
                32
              ),
              image: imageRef,
              rarity: (sourceMetadata.rarity || "COMMON").slice(0, 16),
              type: (sourceMetadata.type || "REWARD").slice(0, 16),
            },
          },
        },
      };

      const forgeScript = ForgeScript.withOneSignature(changeAddress);

      const tx = new Transaction({ initiator: wallet });

      tx.mintAsset(forgeScript, {
        assetName: assetName,
        assetQuantity: "1",
        metadata: assetMetadata,
        label: "721",
        recipient: changeAddress,
      });

      tx.setRequiredSigners([changeAddress]);

      console.log("Building transaction...");
      const unsignedTx = await tx.build();

      console.log("Signing transaction...");
      const signedTx = await wallet.signTx(unsignedTx, true);

      console.log("Submitting transaction...");
      const txHash = await wallet.submitTx(signedTx);

      toast.success("NFT minted successfully! 🚀");
      console.log("✅ Minted TX:", txHash);

      await updateRewardAsMinted(selectedReward.id);
      refetch();

      setSelectedReward(null);
    } catch (error) {
      console.error("Minting error:", error);

      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;

        if (errorMessage.includes("UTxO")) {
          errorMessage =
            "Insufficient funds. Please check your wallet balance.";
        } else if (errorMessage.includes("collateral")) {
          errorMessage =
            "Collateral issues. Please ensure you have sufficient ADA.";
        } else if (errorMessage.includes("script")) {
          errorMessage = "Script execution failed. Please try again.";
        } else if (errorMessage.includes("metadata")) {
          errorMessage = "Invalid metadata structure. Please contact support.";
        } else if (
          errorMessage.includes("CBOR") ||
          errorMessage.includes("buffer")
        ) {
          errorMessage = "Transaction encoding error. Please try again.";
        } else if (errorMessage.includes("Redeemer")) {
          errorMessage = "Script configuration error. Please contact support.";
        }
      }

      toast.error(`Failed to mint NFT: ${errorMessage}`);
    } finally {
      setIsMinting(false);
    }
  };

  const availableRewards = (data?.data as Reward[]) ?? [];
  console.log("Data fetched explorer page:", data);

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

  const handleRewardSelect = (reward: Reward) => {
    setSelectedReward(selectedReward?.id === reward.id ? null : reward);
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto !text-primary_color">
      <Card className="mt-6 border-green-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-400 flex flex-col gap-2 md:flex-row items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Mint your rewards
            </div>
            {selectedReward && (
              <div className="flex justify-center">
                <Button
                  variant={"default"}
                  onClick={handleMintNFT}
                  disabled={isMinting}
                >
                  {isMinting ? "Minting..." : "Mint as NFT"}
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <Loader isLoading={isLoading}>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {availableRewards?.length > 0 ? (
                availableRewards?.map((item) => {
                  const isSelected = selectedReward?.id === item.id;
                  if (item.status !== "MINTED") {
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleRewardSelect(item)}
                        className={`p-4 ${getRarityColor(
                          item.rewardCatalog.rarity
                        )} rounded-lg border cursor-pointer transition-all hover:scale-105 relative ${
                          isSelected
                            ? "ring-1 ring-green-400 ring-offset-2 ring-offset-background"
                            : ""
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-green-400 rounded-full p-1">
                            <Check className="w-4 h-4 text-black" />
                          </div>
                        )}
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
                        <div className="flex gap-2 mb-2">
                          <Badge
                            className={getRarityColor(
                              item.rewardCatalog.rarity
                            )}
                          >
                            {item.rewardCatalog.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-green-600 mb-2">
                          {item.rewardCatalog.type}
                        </p>
                        <h3 className="text-sm text-green-400 mb-1">
                          {item.rewardCatalog.description}
                        </h3>
                      </div>
                    );
                  }
                })
              ) : (
                <p>
                  You don&apos;t have any unminted in-game assets yet. Complete
                  challenges and earn rewards to mint them
                </p>
              )}
            </div>
          </CardContent>
        </Loader>
      </Card>
    </div>
  );
}
