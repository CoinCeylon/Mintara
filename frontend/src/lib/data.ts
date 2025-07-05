import { FaqItem, NavItem } from "@lib/types";

export const navItems: NavItem[] = [
  { name: "Timeline", href: "/#timeline" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "History", href: "/history" },
  { name: "Contact Us", href: "/#contact" },
];

export const faqItem: FaqItem[] = [
  {
    question: "What is Mintara?",
    answer:
      "Mintara is a Web3-powered blockchain game where players battle, explore, and complete challenges to earn unique in-game items. These items can be minted as NFTs on the Cardano blockchain, giving players full ownership and the ability to trade them freely.",
  },
  {
    question: "How do I earn NFTs in Mintara?",
    answer:
      "You earn in-game items by progressing through the game—completing missions, defeating enemies, or achieving milestones. These items are initially stored in your game inventory and can be optionally minted as NFTs to your connected Cardano wallet.",
  },
  {
    question: "Is it necessary to mint every item I earn?",
    answer:
      "No. Minting is optional. You can keep your items in your game inventory, or choose to mint only the rare or valuable ones as NFTs for trading or showcasing on marketplaces.",
  },
  {
    question: "Do I need a wallet to play Mintara?",
    answer:
      "You can play Mintara without a wallet. However, to mint NFTs, collect on-chain rewards, or trade items, you'll need a Cardano-compatible wallet like Nami, Eternl, or Lace.",
  },
  {
    question: "Is Mintara free to play?",
    answer:
      "Yes, Mintara is completely free to play. Only optional blockchain actions like minting NFTs or trading them require a small amount of ADA to cover network fees.",
  },
  {
    question: "What technologies power Mintara?",
    answer:
      "Mintara is built using Next.js for the frontend, MeshJS for blockchain integration, Aiken for smart contracts, and Cardano for secure NFT minting and decentralized asset management.",
  },
  {
    question: "Can I trade my minted NFTs?",
    answer:
      "Yes! Once you mint an in-game item as an NFT, it's stored in your wallet and can be traded or sold on any Cardano NFT marketplace, such as JPG Store.",
  },
];
