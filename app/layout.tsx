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
      <body>
        <header className="flex flex-col p-4 sticky top-0">
          <h1 className="text-4xl self-center">Recipes</h1>
        </header>

        {children}
      </body>
    </html>
  );
}
