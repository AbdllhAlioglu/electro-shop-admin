import { Josefin_Sans } from "next/font/google";
import "../app/_styles/globals.css";
import RootLayoutClient from "./_components/RootLayoutClient";
import Header from "./_components/Header";
import Providers from "./providers";
import AuthProvider from "./_components/AuthProvider";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
  preload: true,
  weight: ["400", "700"],
});

export const metadata = {
  title: {
    template: "%s | Electro Shop Admin Panel",
    default: "Electro Shop Admin Panel",
  },
  description: "Electro Shop Admin Panel",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={josefin.variable}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                // localStorage'dan tema ayarını oku
                const savedTheme = localStorage.getItem("selectedTheme");
                // Eğer dark mod seçiliyse hemen uygula
                if (savedTheme === "dark") {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              } catch (e) {
                console.error("Tema yüklenirken hata:", e);
              }
            })();
          `,
        }}
      />
      <body className="min-h-screen bg-gray-50">
        <Providers>
          <AuthProvider>
            <RootLayoutClient header={await Header()}>
              {children}
            </RootLayoutClient>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
