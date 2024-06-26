"use client"

import { Inter } from "next/font/google";
import NavBar from "./components/navbar/NavBar";
import { ContextProvider } from "./contexts/product-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
        <NavBar></NavBar>
        {children}
        </ContextProvider>
        
        </body>
    </html>
  );
}
