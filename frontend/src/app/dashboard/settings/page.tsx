"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Settings } from "lucide-react";

export default function ActivityPage() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto  !text-primary_color  ">
      <Card className="mt-6 border-green-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
