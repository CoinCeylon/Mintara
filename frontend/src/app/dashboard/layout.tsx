import Sidebar from "@components/side-bar";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-transparent mt-28">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}
