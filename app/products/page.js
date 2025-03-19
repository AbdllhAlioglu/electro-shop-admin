import React from "react";
import { getProducts } from "@/services/apiProducts";
import { getCategories } from "@/services/apiCategories";
import { getBrands } from "@/services/apiBrands";
import ProductsClient from "./_components/ProductsClient";

export const metadata = {
  title: "Ürünler | Electro Shop Admin",
  description: "Ürünleri yönetin",
};

export const dynamic = "force-dynamic"; // Her sayfada güncel veri için

export default async function ProductsPage() {
  // Server-side veri çekme - başlangıç verileri
  const initialProducts = await getProducts();
  const initialCategories = await getCategories();
  const initialBrands = await getBrands();

  return (
    <ProductsClient
      initialProducts={initialProducts}
      initialCategories={initialCategories}
      initialBrands={initialBrands}
    />
  );
}
