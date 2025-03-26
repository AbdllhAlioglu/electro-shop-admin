import React from "react";
import StatisticsPage from "./_components/StatisticsPage";
import { getProducts } from "@/services/apiProducts";
import { getCategories } from "@/services/apiCategories";

export const metadata = {
  title: "İstatistikler | Electro Shop Admin",
  description: "Ürün ve kategori istatistiklerini görüntüleyin",
};

export default async function Page() {
  // Server-side veri çekme - başlangıç verileri
  const initialProducts = await getProducts();
  const initialCategories = await getCategories();

  return (
    <StatisticsPage
      initialProducts={initialProducts}
      initialCategories={initialCategories}
    />
  );
}
