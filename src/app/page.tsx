import { auth, signOut } from "@/auth";
import { Search } from "lucide-react";

export default async function Home() {
  const session = await auth();
  const userName = session?.user?.name || "John Doe";

  return (
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

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-start pt-6 md:pt-12 px-4">
        <div className="w-full max-w-lg">
          <h3 className="text-lg font-medium mb-4 md:mb-6">Logged in as {userName}</h3>

          {session?.user ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="w-full rounded-md bg-green-500 hover:bg-green-600 py-3 text-white font-medium"
              >
                Sign out
              </button>
            </form>
          ) : (
            <p>You are not signed in.</p>
          )}
        </div>
      </div>
    </div>
  );
}
