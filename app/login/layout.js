import { Inter } from "next/font/google";
import "../_styles/globals.css";
import Providers from "../providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Giriş Yap - Electro Shop Admin",
  description: "Electro Shop Admin Paneli Giriş Sayfası",
};

export default function LoginLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
