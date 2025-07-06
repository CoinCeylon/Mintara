"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, XIcon } from "lucide-react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { NotificationDrawer } from "./notification-drawer";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHasScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    router.push("/sign-up");
  };

  return (
    <nav
      className={cn(
        `fixed top-0 left-0 right-0 z-[200] transition-all duration-300`,
        {
          "bg-transparent backdrop-blur-md": hasScrolled,
        },
        {
          "bg-[#020A09]": !hasScrolled,
        }
      )}
    >
      <div className="px-[24px] py-[8px] lg:px-[84px] lg:py-[16px] mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="flex flex-row ">
          {/* Desktop menu */}
          <div className="hidden lg:flex space-x-6 mr-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className=" text-nowrap my-auto hover:pb-[2px] hover:border-b-[1px] border-[#11B55F] focus:border-b-[1px] transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <NotificationDrawer />
          </div>

          {session ? (
            <Button
              onClick={() => router.push("/dashboard")}
              size={"nav"}
              variant={"default"}
              className="group hidden lg:block"
            >
              Dashboard
            </Button>
          ) : (
            <Button
              onClick={handleClick}
              size={"nav"}
              variant={"default"}
              className="group hidden lg:block"
            >
              Register
            </Button>
          )}

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary_color"
            >
              {isOpen ? (
                <XIcon size={24} />
              ) : (
                <Menu className="text-primary_color" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.3 }}
        className={`${
          hasScrolled ? "bg-black/50 backdrop-blur-md" : "bg-[#0A0000]"
        } lg:hidden ${isOpen ? "block" : "hidden"}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 ">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="   block px-3 py-2 rounded-md text-base font-medium"
            >
              {item.name}
            </Link>
          ))}

          {session ? (
            <Button
              onClick={() => router.push("/dashboard")}
              size={"nav"}
              variant={"default"}
              className="group hidden lg:block"
            >
              Dashboard
            </Button>
          ) : (
            <Button
              onClick={handleClick}
              size={"nav"}
              variant={"default"}
              className="group hidden lg:block"
            >
              Register
            </Button>
          )}
        </div>
      </motion.div>
    </nav>
  );
}
