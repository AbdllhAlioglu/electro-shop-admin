import { FiSun, FiMoon, FiLayout, FiDroplet } from "react-icons/fi";

export const CURRENCIES = [
  { code: "TRY", symbol: "₺", name: "Türk Lirası" },
  { code: "USD", symbol: "$", name: "Amerikan Doları" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "İngiliz Sterlini" },
];

export const THEMES = [
  {
    id: "light",
    name: "Açık Tema",
    icon: FiSun,
    description: "Klasik, temiz ve profesyonel görünüm",
    colors: {
      primary: "#f8fafc",
      secondary: "#1e293b",
      accent: "#3b82f6",
    },
  },
  {
    id: "colored",
    name: "Renkli Tema",
    icon: FiDroplet,
    description: "Modern ve canlı gradyan tasarım",
    colors: {
      primary: "#4f46e5",
      secondary: "#7c3aed",
      accent: "#6366f1",
    },
  },
];

export const FONT_SIZES = [
  {
    id: "normal",
    name: "Normal",
    scale: "1",
    description: "Varsayılan yazı boyutu",
  },
  {
    id: "large",
    name: "Büyük",
    scale: "1.1",
    description: "Daha büyük yazı boyutu",
  },
  {
    id: "larger",
    name: "Çok Büyük",
    scale: "1.2",
    description: "En büyük yazı boyutu",
  },
];
