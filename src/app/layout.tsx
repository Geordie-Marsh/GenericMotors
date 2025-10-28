import type { Metadata } from "next";
import "@styles/globals.scss";

import { Analytics } from "@vercel/analytics/next"


export const metadata: Metadata = {
  title: "Generic Motors | Suite of games",
  description: "Your journey to find your dream car starts here. By Geordie Marsh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
		<Analytics />
      </body>
    </html>
  );
}
