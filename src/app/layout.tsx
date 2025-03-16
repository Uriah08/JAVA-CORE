import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/provider/redux";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Java Condition Monitoring",
  description: "A website where we ensure optimal performance and longevity of your equipment with our expert machine health specialist services, providing proactive maintenance and diagnostics.",
};

const fontSans = Poppins({
  weight: ['200','300','400','500','600','700','800','900'],
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.className} antialiased bg-[#eee8e8] overflow-x-hidden`}
      > 
        <StoreProvider>
        {children}
        <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
