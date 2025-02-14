import { Josefin_Sans } from "next/font/google";
import "../app/_styles/globals.css";
import Header from "./_components/Header";
import LeftMenu from "./_components/LeftMenu";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Electro Shop Admin Panel",
    default: "Electro Shop Admin Panel",
  },
  description: "Electro Shop Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.variable} antialiased bg-primary-950 text-primary-100 h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid grid-cols-4 gap-8 overflow-hidden">
          <div className="col-span-1 bg-primary-900 rounded-lg p-4 border-r">
            <LeftMenu />
          </div>
          <div className="col-span-3">
            <main className="max-w-7xl mx-auto pr-4 h-[calc(100vh-136px)] overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
