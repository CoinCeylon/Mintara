import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Logo from "@components/logo";

const Footer = () => {
  return (
    <footer className="mt-28 text-primary_color border-t border-primary_color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center h-8">
              <Logo />
            </Link>
            <p className="text-sm ">
              Mintara is a Web3 game built on the Cardano blockchain. Battle,
              earn, and collect NFT rewards you truly own. Play. Collect.
              Dominate.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold  tracking-wider uppercase mb-4">
              Game
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-sm  hover:underline">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/rewards" className="text-sm  hover:underline">
                  Rewards
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold  tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:underline">
                  About Mintara
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-sm hover:underline">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-sm hover:underline">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold hover:underline tracking-wider uppercase mb-4">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/discord" className="text-sm hover:underline">
                  Join Discord
                </Link>
              </li>
              <li>
                <div className="flex space-x-4 mt-2">
                  <a
                    href="https://facebook.com/mintaragame"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">Facebook</span>
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com/mintaragame"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">Twitter</span>
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com/mintaragame"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">Instagram</span>
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/company/mintara"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-primary_color pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm ">
            &copy; 2024 Mintara. Play. Collect. Dominate. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm ">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm ">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
