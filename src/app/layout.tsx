import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat"
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans"
});

export const metadata: Metadata = {
  title: "Eco Green Nosara - Eco-Tourism in Costa Rica",
  description: "Experience the natural beauty of Nosara, Costa Rica with our eco-friendly tours including kayaking, paddle boarding, coffee tours, nature hikes, and bird watching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${openSans.variable} font-body bg-background text-text min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
