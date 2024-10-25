
import { Footer,Navbar } from "@/components";
import OtherProviders from "@/components/providers/providers";
import { SITE_CONFIG } from "@/config";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { EmailProvider } from '@/components/providers/context/Employee'

const font = Inter({ subsets: ["latin"] });

export const metadata = SITE_CONFIG;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden",
          font.className
        )}
      >
        <EmailProvider>
          <OtherProviders>
            <Navbar />
            {children}
            <Footer />
          </OtherProviders>
        </EmailProvider>

      </body>
    </html>
  );
}
