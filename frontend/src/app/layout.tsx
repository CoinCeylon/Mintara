import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import MeshWrapper from '@providers/wallet-provider';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mintara',
  description: 'Built with Mesh.js and Next.js App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <MeshWrapper>
          {children}
        </MeshWrapper>
      </body>
    </html>
  );
}