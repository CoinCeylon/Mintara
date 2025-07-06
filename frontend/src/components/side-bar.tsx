"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PackageSearch,
  ShoppingCart,
  Settings,
  Gamepad2,
  Activity,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Gamepad2, label: "My Inventory", href: "/dashboard/inventory" },
  { icon: PackageSearch, label: "Item Explorer", href: "/dashboard/explorer" },
  {
    icon: Activity,
    label: "Activities",
    href: "/dashboard/recent-activities",
  },
  { icon: ShoppingCart, label: "Marketplace", href: "/dashboard/marketplace" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="md:w-64 bg-transparent border-r border-transparent">
      <nav className="p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center p-2 rounded-lg hover:bg-primary_color/10 transition-colors ${
                  pathname === item.href ? "bg-primary_color/20" : ""
                }`}
              >
                <item.icon className="h-5 w-5 md:mr-3" />
                <span className="hidden md:block">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
