import { fontSans } from "@/app/fonts";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Notes App",
  description: "My notes app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <div className="flex flex-col h-screen">
          <Header />

          <div className="h-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
