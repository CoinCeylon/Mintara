import { FaqItem, NavItem } from "@lib/types";
import { Gem, Shield, Sparkles, Star, Trophy } from "lucide-react";

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

export const gameItems = [
  {
    id: 1,
    name: "Quantum Blade",
    type: "Weapon",
    rarity: "Legendary",
    minted: true,
    image: "⚔️",
  },
  {
    id: 2,
    name: "Neural Shield",
    type: "Armor",
    rarity: "Epic",
    minted: false,
    image: "🛡️",
  },
  {
    id: 3,
    name: "Cyber Helmet",
    type: "Armor",
    rarity: "Rare",
    minted: true,
    image: "⛑️",
  },
  {
    id: 4,
    name: "Data Crystal",
    type: "Resource",
    rarity: "Common",
    minted: false,
    image: "💎",
  },
  {
    id: 5,
    name: "Plasma Rifle",
    type: "Weapon",
    rarity: "Epic",
    minted: true,
    image: "🔫",
  },
  {
    id: 6,
    name: "Nano Boots",
    type: "Armor",
    rarity: "Rare",
    minted: false,
    image: "👢",
  },
];

export const recentActivity = [
  {
    id: 1,
    action: "Completed Quest: Digital Heist",
    reward: "+500 XP",
    time: "2 hours ago",
    icon: Trophy,
  },
  {
    id: 2,
    action: "Minted Quantum Blade NFT",
    reward: "+0.5 ADA",
    time: "4 hours ago",
    icon: Sparkles,
  },
  {
    id: 3,
    action: "Defeated Cyber Dragon",
    reward: "+1000 XP",
    time: "6 hours ago",
    icon: Shield,
  },
  {
    id: 4,
    action: "Found Data Crystal",
    reward: "+250 XP",
    time: "8 hours ago",
    icon: Gem,
  },
  {
    id: 5,
    action: "Joined Guild: Neo Hackers",
    reward: "+100 XP",
    time: "1 day ago",
    icon: Star,
  },
];
