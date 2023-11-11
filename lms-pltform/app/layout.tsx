import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { siteConfig } from "@/lib/config/site-config";
import TosterProvider from "@/components/providers/toster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Agrinovate",
    "Plant Disease Prediction",
    "Fertilizer Recommendation",
    "Crop Recommendation",
  ],
  creator: siteConfig.author,

  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo-light.png",
        href: "/logo-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.png",
        href: "/logo-dark.png",
      },
    ],
  },
  other: {
    "og:image": "https://learnin.vercel.app/og-dark.png",
    "og:title": siteConfig.name,
    "og:description": siteConfig.description,
    "og:url": siteConfig.url,
    "twitter:image": "https://learnin.vercel.app/og-dark.png",
    "twitter:card": "summary_large_image",
    "twitter:title": siteConfig.name,
    "twitter:description": siteConfig.description,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="bg-background ">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TosterProvider  />
            <main className=" bg-background">{children}</main>
            <span className="fixed bottom-4 right-4 ">
              {" "}
              <ModeToggle />{" "}
            </span>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
