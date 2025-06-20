"use client";

import { X, Menu } from "lucide-react";

interface MobileMenuToggleProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export default function MobileMenuToggle({
  isMobileMenuOpen,
  toggleMobileMenu,
}: MobileMenuToggleProps) {
  return (
    <div className="lg:hidden fixed top-4 left-4 z-50">
      <button
        onClick={toggleMobileMenu}
        className="text-gray-700 p-2 rounded-md bg-white shadow-md"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
} 