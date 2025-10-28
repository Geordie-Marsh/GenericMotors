import type { Metadata } from "next";
import "@styles/globals.scss";


export const metadata: Metadata = {
  title: "Generic Motors | One of a kind",
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
      </body>
    </html>
  );
}
