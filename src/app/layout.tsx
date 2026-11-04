import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, DM_Sans } from "next/font/google";
import { Backdrop } from "@/components/Backdrop";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GlassEffects } from "@/components/GlassEffects";
import { Providers } from "@/components/Providers";
import { SampleNotice } from "@/components/SampleNotice";
import { profile } from "@/content";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--ff-display", subsets: ["latin"] });
const body = DM_Sans({ variable: "--ff-body", subsets: ["latin"] });
const hand = Caveat({ variable: "--ff-hand", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://vidurbuilds.in"),
  title: `${profile.name} | Product & Project Management Portfolio`,
  description: "Explore Vidur Ramachandran’s product strategy, user research, AI prototypes and project delivery work. Based in Hyderabad, India; open to product and project management roles.",
  openGraph: { type: "website", siteName: profile.brand },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#faf1e9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${hand.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>
          <GlassEffects />
          <Backdrop />

          <div>
            <Header />
            <main className="mx-auto max-w-[1360px] px-4 pt-4 pb-10 md:px-6 md:pt-5 lg:px-[2.5vw]">{children}</main>
            <Footer />
          </div>
          <SampleNotice />
        </Providers>
      </body>
    </html>
  );
}
