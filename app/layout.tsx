import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
import { LanguageProvider } from "@/components/language-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { clerkAppearance } from "@/lib/clerk-appearance";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Kut Banya · Traditional Russian steam room",
    template: "%s · Kut Banya",
  },
  description:
    "Kut Banya — traditional Russian steam room since 2018. Book a coal-fired session online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ky"
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <ClerkProvider appearance={clerkAppearance}>
          <LanguageProvider>
            <AuthProvider>
              <SiteHeader />
              <div className="flex flex-1 flex-col">{children}</div>
              <SiteFooter />
            </AuthProvider>
          </LanguageProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
