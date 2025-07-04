'use client';

import { MeshProvider } from '@meshsdk/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

export default function WalletProvider({ children }: Props) {
  return (
    <MeshProvider>
      {children}
    </MeshProvider>
  );
}