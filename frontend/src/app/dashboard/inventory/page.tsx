"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { gameItems } from "@/lib/data";
import { Badge, CheckCircle, Circle, Gem } from "lucide-react";
import { useState } from "react";

export default function InventoryPage() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
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
  return (
    <div className="min-h-screen max-w-7xl mx-auto  !text-primary_color  ">
      <Card className="mt-6 border-green-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center justify-between">
            <div className="flex items-center">
              <Gem className="w-5 h-5 mr-2" />
              Claimed Items
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
    </div>
  );
}
