import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/ui/theme-provider";

import "./globals.css";
import { Navbar } from "@/components/navbar";
import { GridBackground } from "@/components/grid-background";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const geist_mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TmpLockr",
  description: "Store & share files fast and easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geist_mono.variable} font-mono relative antialiased`}
        >
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <GridBackground />
            {children}
            <Toaster closeButton />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
