import React from "react";
import { getCategories } from "@/services/apiCategories";
import CategoriesClient from "./_components/CategoriesClient";

export const metadata = {
  title: "Kategoriler | Electro Shop Admin",
  description: "Kategorileri yönetin",
};

export const dynamic = "force-dynamic";
export default async function CategoriesPage() {
  // Başlangıç verilerini server-side olarak getir
  const initialCategories = await getCategories();

  // Client component'e iletilecek
  return <CategoriesClient initialCategories={initialCategories} />;
}
