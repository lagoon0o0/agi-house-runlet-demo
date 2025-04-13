import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Market Creation Demo",
  description: "Demo for creating prediction markets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <script id="tailwind-config" type="application/json"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <div className="fixed top-0 left-0 right-0 bg-background border-b border-border z-50">
          <div className="container mx-auto px-4 py-[10px] flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-[28px] font-semibold text-primary tracking-[-0.5px]">
                Market Creation Demo
              </div>
            </div>
          </div>
        </div>
        <div className="pt-14">
          {children}
        </div>
        <div className="w-full mt-8 border-t border-border">
          <div className="container mx-auto px-4 py-[10px] text-center">
            <span className="text-xs text-gray-500">© 2025 Runlet Labs, Inc.</span>
          </div>
        </div>
      </body>
    </html>
  );
}
