import WalletConnection from '@components/wallet-connection';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        My Cardano DApp
      </h1>
      
      <div className="max-w-2xl mx-auto">
        <WalletConnection />
        
        <div className="mt-8 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">About This DApp</h2>
          <p className="text-gray-600">
            This is a Cardano decentralized application built with Mesh.js and Next.js App Router. 
            Connect your wallet above to start interacting with the Cardano blockchain.
          </p>
        </div>
      </div>
    </main>
  );
}