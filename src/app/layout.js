import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Web Act",
  description: "Create your Websites with Web Act",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-[#ececec]"}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
