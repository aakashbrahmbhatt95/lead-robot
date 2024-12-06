import { ThemeProvider } from "@/lib/ThemeProvider";
import { Toaster } from "@/lib/ui/toaster";
import { ReduxProvider } from "@/redux/provider";
import ProtectedWrapper from "@/utils/protectedWrapper";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { Public_Sans } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "@livekit/components-styles";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <ProtectedWrapper>{children}</ProtectedWrapper>
            <Toaster />
            <ToastContainer />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
