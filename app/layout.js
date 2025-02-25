import { Josefin_Sans } from "next/font/google";
import "../app/_styles/globals.css";
import ClientLayout from "./ClientLayout";

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
      <body className={josefin.variable}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
