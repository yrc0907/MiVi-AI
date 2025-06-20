"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import Navigation from "./Navigation";
import UserProfile from "./UserProfile";
import type { Session } from "next-auth";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  isProfileDropdownOpen: boolean;
  toggleProfileDropdown: () => void;
  handleLogout: () => void;
  session: Session;
}

export default function Sidebar({
  isMobileMenuOpen,
  isProfileDropdownOpen,
  toggleProfileDropdown,
  handleLogout,
  session,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={`
      ${isMobileMenuOpen
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0"
        } 
      w-80 bg-[#041614] text-white flex flex-col fixed lg:relative h-full z-40
      transition-transform duration-300 ease-in-out
    `}
    >
      {/* Logo */}
      <div className="p-6 flex items-center">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" />
            <path d="M9.25 12.75L4.75 15L12 19.25L19.25 15L14.75 12.75" />
          </svg>
        </div>
        <span className="text-2xl font-bold">Meet.AI</span>
      </div>

      <Navigation />

      {/* Upgrade button */}
      <div className="mt-20 px-6">
        <Link
          href="/upgrade"
          className={`flex items-center p-2 rounded-md transition-colors duration-200 
            ${pathname === "/upgrade"
              ? "bg-[#0a2825] text-white"
              : "text-gray-300 hover:bg-[#0a2825] hover:text-white"
            }`}
        >
          <Star className="w-5 h-5 mr-4" />
          <span className="text-lg">Upgrade</span>
        </Link>
      </div>

      <UserProfile
        session={session}
        isProfileDropdownOpen={isProfileDropdownOpen}
        toggleProfileDropdown={toggleProfileDropdown}
        handleLogout={handleLogout}
      />
    </div>
  );
} 