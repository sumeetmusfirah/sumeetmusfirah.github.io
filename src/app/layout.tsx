import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-sans" });

const description =
  "Sumeet Musfirah studies neuroscience and psychology at Drexel University and researches how language models, and the people who use them, decide what to trust.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sumeetmusfirah.com"),
  title: "Sumeet Musfirah",
  description,
  openGraph: {
    title: "Sumeet Musfirah",
    description,
    url: "https://sumeetmusfirah.com",
    images: ["/img/portrait.jpg"],
  },
  icons: { icon: [{ url: "/sm-mark.ico", sizes: "48x48" }, { url: "/sm-mark.svg", type: "image/svg+xml" }], shortcut: "/sm-mark.ico", apple: "/sm-mark-180.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
