import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/common/header/Header";
import Footer from "@/common/footer/Footer";
import Sidebar from "@/common/navbar/Sidebar";
import { ReduxProvider } from "@/redux/provider";
import Loading from "@/common/loading/Loading";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "eeeCLOUD"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <ReduxProvider>
          <div>
            <Header />
            <div className="flex w-full max-w-[100%]">
              <div className="w-80 z-40">
                <Sidebar />
              </div>
              <div className="z-20" style={{ width: "calc(100% - 20rem)" }}>
                {children}
              </div>
            </div>
            <Footer />
          </div>
          <Loading />
        </ReduxProvider>
      </body>
    </html>
  );
}
