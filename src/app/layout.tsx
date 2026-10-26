import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, JetBrains_Mono, Jost, Newsreader } from "next/font/google";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
// Journal faces: an elegant display serif and a clean geometric sans.
const jdisplay = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-jdisplay" });
const jbody = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jbody" });

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
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable} ${jdisplay.variable} ${jbody.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
