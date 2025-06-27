import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { TRPCReactProvider } from "@/components/trpc/client";
import { auth } from "@/auth";
import ClientLayout from "@/components/layout/ClientLayout";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <TRPCReactProvider>
      <html lang="en">
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        >
          <ClientLayout session={session}>{children}</ClientLayout>
        </body>
      </html>
    </TRPCReactProvider>
  );
}
