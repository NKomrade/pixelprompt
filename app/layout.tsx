import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./providers";
import { Footer } from "@/components/layout/Footer";
import { ConditionalNavbar } from "@/components/layout/ConditionalNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixelPrompt - AI-Powered Image Generation",
  description:
    "Transform your ideas into stunning images with advanced AI technology. Create professional-quality images from simple text descriptions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Providers>
            <ConditionalNavbar />
            <main>{children}</main>
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
