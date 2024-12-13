"use client";

import { ThemeProvider } from "@/lib/ThemeProvider";
import { Toaster } from "@/lib/ui/toaster";
import { ReduxProvider } from "@/redux/provider";
import ProtectedWrapper from "@/utils/protectedWrapper";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { Public_Sans } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";

const publicSans400 = Public_Sans({
  weight: "400",
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"] });

const LayoutSwitcher = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLivekitAudio = pathname.includes("agents");

  return (
    <div>
      {isLivekitAudio ? (
        <body className={`h-full ${publicSans400.className} bg-[#111]`}>

<Toaster />
              <ToastContainer />
          {children}
        </body>
      ) : (
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
      )}
    </div>
  );
};

export default LayoutSwitcher;
