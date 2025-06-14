import { auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome</h1>
      {session?.user ? (
        <div className="mt-8 text-center">
          <p>Signed in as {session.user.email}</p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="mt-4 rounded-md bg-gray-800 px-4 py-2 text-white"
            >
              Sign out
            </button>
          </form>
        </div>
      ) : (
        <p className="mt-8">You are not signed in.</p>
      )}
    </main>
  );
}
