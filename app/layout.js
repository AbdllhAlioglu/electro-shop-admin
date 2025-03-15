import { Josefin_Sans } from "next/font/google";
import "../app/_styles/globals.css";
import RootLayoutClient from "./_components/RootLayoutClient";
import Header from "./_components/Header";
import Providers from "./providers";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
});

export const metadata = {
  title: {
    template: "%s | Electro Shop Admin Panel",
    default: "Electro Shop Admin Panel",
  },
  description: "Electro Shop Admin Panel",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={josefin.variable}>
      <body className="min-h-screen bg-gray-50">
        <Providers>
          <RootLayoutClient header={await Header()}>
            {children}
          </RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
