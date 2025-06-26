import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { TRPCReactProvider } from "@/components/trpc/client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <html lang="en">
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        >
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </TRPCReactProvider>
  );
}
