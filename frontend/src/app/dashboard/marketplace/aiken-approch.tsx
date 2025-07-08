"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllAvailableRewardByUserId, getNFTMetaData } from "@/lib/actions";
import type { MetaDataResponse, Reward, Status } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Badge, Check, DollarSign } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { Mint, Transaction, deserializeAddress } from "@meshsdk/core";
import { BrowserWallet } from "@meshsdk/wallet";

export default function NotWorking() {
  const { data: session } = useSession();
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isMinting, setIsMinting] = useState(false);

  const { data, isLoading } = useQuery<Status | undefined>({
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
      const response = await getNFTMetaData(selectedReward.id);

      const metadataResponse = response?.data as MetaDataResponse;

      console.log(metadataResponse, "METADATA RESPONSE");

      if (response?.status !== "success" || !metadataResponse) {
        toast.error("Failed to fetch NFT metadata.");
        return;
      }

      const wallet = await BrowserWallet.enable("eternl");
      console.log("Wallet connected successfully");

      const addresses = await wallet.getUsedAddresses();
      const changeAddress = addresses[0];

      if (!changeAddress) {
        toast.error("No wallet address found.");
        return;
      }

      const { pubKeyHash } = deserializeAddress(changeAddress);
      const ownerPkh = pubKeyHash;

      const rewardName = selectedReward.name;
      const assetName = rewardName;

      const compiledScriptHex =
        "590388010100229800aba2aba1aba0aab9faab9eaab9dab9a9bae0024888888896600264653001300900198049805000cdc3a400130090024888966002600460126ea800e266446644b30013006001899191919912cc004c05c00e264b3001300c30133754003132323298009bae301a001980d800cdd7180d001cdd7180d00124444b3001301f003899198008009bac301f0042259800800c046264646644b300130250038998030031812802c590221bae3022001375c604400460440026eb0c08000501e45901c0c068004c064004c050dd5000c59012180b0024590141bae3014001375c602800660280026026002601c6ea80222b30013003001899192cc004c05000a0091640446eb8c048004c038dd500445900c201819800911919800800801912cc00400629422b30013003375c602600314a313300200230140014038808a4602060226022602260226022602260226022003230103011301130113011001911192cc004c014c03cdd5000c5200089bad3013301037540028070c966002600a601e6ea8006298103d87a8000899198008009bab30143011375400444b30010018a6103d87a8000899192cc004cdc8803000c56600266e3c018006266e9520003301630140024bd7045300103d87a80004049133004004301800340486eb8c048004c054005013201c32330010010042259800800c5300103d87a8000899192cc004cdc8803000c56600266e3c018006266e9520003301530130024bd7045300103d87a80004045133004004301700340446eb8c044004c05000501224444b30013008300f3754015132329800980a800cdd7180a980b000c8c02cdc6800c8966002003148002266e0120023300200230180014055375c602a004911112cc004c8c8cc8966002b300198009803800d28528a032899b89371a0029032452820328acc004cdc49b8d375c603c006907403c56600330013007375c603c0054a14a280ca266e24cc018018dd6180f180f8012405114a080ca294101945282032301d001375c60380046038002602e6ea80162b30013300b37586014602e6ea80388cdc780080ac4c03260026eacc024c05cdd50074036002804229410154528202a180a80098081baa00a8acc004cc010dd6180198081baa00723371e00201d13370f30013756600460206ea801e00d375c602660206ea80290012400314a0807100e0c02cdd50031bae300d300a37540066e1d20028b2010180480098021baa0098a4d1365640081";

      const mintingScript = {
        code: compiledScriptHex,
        version: "V3" as const,
        parameters: [ownerPkh],
      };

      const policyId =
        "08323bc27047645154898625f5aec2e95b04332af582ff59d74172f4";

      const sourceMetadata =
        metadataResponse.metadata?.[721]?.[policyId]?.[selectedReward.name];

      if (!sourceMetadata) {
        toast.error("Invalid metadata structure received.");
        return;
      }

      const assetMetadata = {
        "721": {
          [policyId]: {
            [assetName]: {
              name: sourceMetadata.name,
              image: "test", // Use actual image URL
              description: sourceMetadata.description.slice(0, 30),
              rarity: sourceMetadata.rarity,
              type: sourceMetadata.type,
            },
          },
        },
      };

      const redeemer = {
        data: {
          alternative: 0,
          fields: [
            Buffer.from(assetName, "utf8").toString("hex"),

            {
              alternative: 0,
              fields: [
                Buffer.from(sourceMetadata.name, "utf8").toString("hex"), // name
                Buffer.from(sourceMetadata.description, "utf8").toString("hex"), // description
                Buffer.from(sourceMetadata.image, "utf8").toString("hex"), // image
                [
                  [
                    Buffer.from("rarity", "utf8").toString("hex"),
                    Buffer.from(sourceMetadata.rarity, "utf8").toString("hex"),
                  ],
                  [
                    Buffer.from("type", "utf8").toString("hex"),
                    Buffer.from(sourceMetadata.type, "utf8").toString("hex"),
                  ],
                ],
              ],
            },
            ownerPkh,
          ],
        },
      };

      const mint: Mint = {
        assetName: assetName,
        assetQuantity: "1",
        metadata: assetMetadata,
        label: "721",
        recipient: changeAddress,
      };

      const collateral = await wallet.getCollateral();

      if (!collateral || collateral.length === 0) {
        toast.error(
          "No collateral available. Please add some ADA to your wallet for collateral."
        );
        return;
      }

      const tx = new Transaction({
        initiator: wallet,
      });

      tx.setCollateral(collateral);

      const unsignedTx = await tx
        .mintAsset(mintingScript, mint, redeemer)
        .setRequiredSigners([changeAddress])
        .build();

      const signedTx = await wallet.signTx(unsignedTx, true);
      const txHash = await wallet.submitTx(signedTx);

      toast.success("NFT minted successfully! 🚀");
      console.log("✅ Minted TX:", txHash);

      setSelectedReward(null);
    } catch (error) {
      console.error("Minting error:", error);
      toast.error(
        `Failed to mint NFT: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsMinting(false);
    }
  };

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

  const handleRewardSelect = (reward: Reward) => {
    // Toggle selection - if same reward is clicked, deselect it
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
              {availableRewards?.length !== undefined &&
                availableRewards?.map((item) => {
                  const isSelected = selectedReward?.id === item.id;
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
                      {/* Check icon for selected item */}
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
                })}
            </div>
          </CardContent>
        </Loader>
      </Card>
    </div>
  );
}
