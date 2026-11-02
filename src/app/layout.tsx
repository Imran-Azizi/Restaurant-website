import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Noto_Naskh_Arabic,
} from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { ScrollToTop } from "@/components/motion/ScrollToTop";
import { Providers } from "@/components/Providers";
import { RestaurantJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Zaitoon Pizza | Kabul",
    template: "%s | Zaitoon Pizza",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_AF",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Zaitoon Pizza",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.brand.logo,
        width: 512,
        height: 512,
        alt: "Zaitoon Pizza emblem",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Zaitoon Pizza",
    description: siteConfig.description,
    images: [siteConfig.brand.logo],
  },
  icons: {
    icon: siteConfig.brand.logo,
    apple: siteConfig.brand.logo,
  },
};

export const viewport: Viewport = {
  themeColor: "#2a1548",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${naskh.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col overflow-x-clip font-[family-name:var(--font-body)]">
        <Providers>
          <ScrollToTop />
          <ScrollProgress />
          <RestaurantJsonLd />
          <Header />
          <main className="min-h-0 flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
