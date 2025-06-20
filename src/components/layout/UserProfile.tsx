"use client";

import { ChevronDown, LogOut, User } from "lucide-react";
import type { Session } from "next-auth";

interface UserProfileProps {
  session: Session;
  isProfileDropdownOpen: boolean;
  toggleProfileDropdown: () => void;
  handleLogout: () => void;
}

export default function UserProfile({
  session,
  isProfileDropdownOpen,
  toggleProfileDropdown,
  handleLogout,
}: UserProfileProps) {
  if (!session?.user) return null;

  return (
    <div className="mt-auto px-6 py-4 relative">
      <button
        onClick={toggleProfileDropdown}
        className="flex items-center justify-between w-full p-2 rounded-md transition-colors duration-200 hover:bg-[#0a2825]"
      >
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-medium">
              {session.user.name?.[0] || "J"}
            </span>
          </div>
          <div className="overflow-hidden">
            <p className="font-medium truncate">
              {session.user.name || "John Doe"}
            </p>
            <p className="text-sm text-gray-400 truncate">
              {session.user.email}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${isProfileDropdownOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Dropdown menu */}
      {isProfileDropdownOpen && (
        <div className="absolute bottom-full left-6 right-6 mb-2 bg-[#0a2825] rounded-md overflow-hidden shadow-lg">
          <ul>
            <li>
              <button
                onClick={() => console.log("Billion clicked")}
                className="flex items-center w-full px-4 py-3 text-left hover:bg-[#123c38] transition-colors duration-200"
              >
                <User className="w-5 h-5 mr-3" />
                <span>Billion</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-left hover:bg-[#123c38] transition-colors duration-200"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
} 