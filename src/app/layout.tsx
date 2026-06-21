import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { PageLoader } from "@/components/ui/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creston Peak",
  description: "Global forex and cryptocurrency trading platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen dark:bg-black text-slate-900 dark:text-white transition-colors duration-300`}
        style={{ backgroundColor: 'transparent' }}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="crestonpeak-theme">
          {/* Fixed light-mode background image — sits below all content */}
          <div
            className="dark:hidden"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: -1,
              backgroundImage: "url('/auth-bg-light.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          />
          <ClientProviders>
            <PageLoader />
            {children}
            <WhatsAppWidget />
          </ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
