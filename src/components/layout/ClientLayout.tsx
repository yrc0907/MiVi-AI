"use client";

import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import type { Session } from "next-auth";
import Sidebar from "./Sidebar";
import MobileMenuToggle from "./MobileMenuToggle";

// Client-side component to handle state
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Mock session data with required fields for Session type
  const session = {
    user: {
      name: "John Doe",
      email: "tutorialmailing@gmail.com",
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  } as Session;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    // Handle logout functionality
    console.log("Logging out...");
  };

  return (
    <SessionProvider session={session}>
      <div className="flex h-screen relative">
        <MobileMenuToggle
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />

        <Sidebar
          isMobileMenuOpen={isMobileMenuOpen}
          isProfileDropdownOpen={isProfileDropdownOpen}
          toggleProfileDropdown={toggleProfileDropdown}
          handleLogout={handleLogout}
          session={session}
        />

        {/* Overlay for mobile when menu is open */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Main content */}
        <div className="flex-1 bg-gray-100 overflow-auto">{children}</div>
      </div>
    </SessionProvider>
  );
} 