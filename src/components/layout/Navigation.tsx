"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Users } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Camera, label: "Meetings" },
    { href: "/agents", icon: Users, label: "Agents" },
  ];

  return (
    <nav className="mt-8 px-6">
      <ul className="space-y-6">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center p-2 rounded-md transition-colors duration-200 
                ${pathname === item.href
                  ? "bg-[#0a2825] text-white"
                  : "text-gray-300 hover:bg-[#0a2825] hover:text-white"
                }`}
            >
              <item.icon className="w-5 h-5 mr-4" />
              <span className="text-lg">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
} 