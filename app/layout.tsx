import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ModalProvider from "@/providers/ModalProvider";
import { Inconsolata, Quicksand } from "next/font/google";
import AuthModal from "@/hooks/auth/AuthModal";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inconsolata",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "e-commerce",
  description: "your ultimate gadgets shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased hide-scrollbar",
          quicksand.variable,
          inconsolata.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>

              {children}
              <AuthModal />
              <Toaster richColors position="bottom-right" />
              <ModalProvider />
            </AuthProvider>

          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

