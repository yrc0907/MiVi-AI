'use client';

import { Search } from "lucide-react";

export default function HomeClient() {
  // The content of the original page.tsx
  const pageContent = (
    <div className="h-full flex flex-col">
      {/* Search bar */}
      <div className="p-4 border-b flex items-center">
        <div className="flex-1 flex items-center border rounded-md pl-3 pr-4 py-1 mr-4">
          <span className="p-1 border border-gray-200 rounded mr-2 hidden sm:flex items-center justify-center text-xs">⌘</span>
          <Search className="w-4 h-4 text-gray-400 mr-1" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none w-full"
          />
        </div>
        <div className="text-sm hidden sm:block">
          <span className="p-1 border border-gray-200 rounded">K</span>
        </div>
      </div>

      <div>
        <h1>HomeView</h1>
      </div>
    </div>
  );

  return pageContent;
} 