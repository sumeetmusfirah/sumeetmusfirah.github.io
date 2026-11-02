import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Jost } from "next/font/google";
import "./globals.css";

// A display serif for names and titles, a book serif for reading, and a quiet sans for small labels.
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--font-display" });
const serif = EB_Garamond({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif" });
const sans = Jost({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-sans" });

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
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
