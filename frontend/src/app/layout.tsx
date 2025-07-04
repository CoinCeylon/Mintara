import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";
import MeshWrapper from "@providers/wallet-provider";
import Navbar from "@/components/navbar";

const unbounded = Unbounded({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mintara",
  description: "Built with Mesh.js and Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${unbounded.className} font-outfit bg-[#020A09]  text-primary_color`}
      >
        <MeshWrapper>
          <Navbar />

          {children}
        </MeshWrapper>
      </body>
    </html>
  );
}
