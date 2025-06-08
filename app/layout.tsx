import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipes",
  description: "Recipes we love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">{children}</html>;
}
