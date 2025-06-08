import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipes",
  description: "A collection of recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
