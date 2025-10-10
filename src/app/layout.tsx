import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/ui/theme-provider";

import "./globals.css";
import { Navbar } from "@/components/navbar";
import { GridBackground } from "@/components/grid-background";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { logo } from "@/lib/consts";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className={`${geist_mono.variable} font-mono relative antialiased`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense
            fallback={
              <div className="h-screen w-full flex justify-center items-center">
                <pre className="ascii-art animate-pulse text-[6px] sm:text-xs lg:text-sm whitespace-pre-wrap text-center">
                  {logo}
                </pre>
                <GridBackground />
              </div>
            }
          >
            <GridBackground />
              <Navbar />
              {children}
            <Toaster />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
