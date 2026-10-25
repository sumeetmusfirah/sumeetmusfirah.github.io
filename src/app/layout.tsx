import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sumeet Musfirah",
  description:
    "A personal world for research, reflection, and building across neuroscience, AI, ethics, and thoughtful systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
