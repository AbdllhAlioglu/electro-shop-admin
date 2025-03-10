import { Josefin_Sans } from "next/font/google";
import "../app/_styles/globals.css";
import ClientLayout from "./ClientLayout";
import Header from "./_components/Header";
import ClientToaster from "./ClientToaster";
import { auth } from "./_lib/auth";
import LoginLayout from "./login/layout";

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

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={josefin.variable}>
        <div className="antialiased h-screen flex flex-col">
          <Header />
          <ClientLayout>{children}</ClientLayout>
          <ClientToaster />
        </div>
      </body>
    </html>
  );
}
