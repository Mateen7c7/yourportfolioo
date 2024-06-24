import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YourPortfolioo",
  description: "Create your portfolio with YourPortfolio",
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
