import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { SITE_URL } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Malavika Susan | Senior Product Designer, Enterprise Software & AI",
    template: "%s | Malavika Susan",
  },
  description:
    "Senior product designer in Dublin designing enterprise software and AI: GenAI assistants, conversation design and research. Currently at IBM.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Malavika Susan | Senior Product Designer, Enterprise Software & AI",
    description:
      "Senior product designer in Dublin designing enterprise software and AI: GenAI assistants, conversation design and research. Currently at IBM.",
    url: SITE_URL,
    siteName: "Malavika Susan",
    type: "website",
    locale: "en_IE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malavika Susan | Senior Product Designer, Enterprise Software & AI",
    description:
      "Senior product designer in Dublin designing enterprise software and AI: GenAI assistants, conversation design and research. Currently at IBM.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Nav />
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
