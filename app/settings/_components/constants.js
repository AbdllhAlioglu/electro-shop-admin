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
  },
  {
    id: "dark",
    name: "Koyu Mod",
    icon: FiMoon,
    description: "Göz yorgunluğunu azaltan koyu tema",
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
