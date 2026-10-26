import type { Metadata } from "next";
import { Caveat, Hanken_Grotesk, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" });

const description =
  "Sumeet Musfirah studies how language models, and the people who use them, decide whom to believe: AI safety, LLM evaluation, social influence, NeuroAI, and applied AI engineering.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sumeetmusfirah.com"),
  title: "Sumeet Musfirah — AI × Cognition × Neuro",
  description,
  openGraph: {
    title: "Sumeet Musfirah",
    description,
    url: "https://sumeetmusfirah.com",
    images: ["/img/portrait.jpg"],
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable} ${hand.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
