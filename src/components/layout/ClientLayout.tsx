'use client';

import { usePathname } from 'next/navigation';
import { useState } from "react";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import Sidebar from "@/components/layout/Sidebar";
import MobileMenuToggle from "@/components/layout/MobileMenuToggle";

interface ClientLayoutProps {
  children: React.ReactNode;
  session: Session | null;
}

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  session: Session;
}

function AuthenticatedLayout({ children, session }: AuthenticatedLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  return (
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
  );
}

export default function ClientLayout({ children, session }: ClientLayoutProps) {
  const pathname = usePathname();
  const noSidebarRoutes = ['/login', '/register'];

  if (!session || noSidebarRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return <AuthenticatedLayout session={session}>{children}</AuthenticatedLayout>;
} 