"use client";
import ProductTableHeader from "./ProductTableHeader";
import ProductTableBody from "./ProductTableBody";
import { useQuery } from "@tanstack/react-query";
import { getExchangeRates } from "@/services/currencyService";

export default function ProductTable({
  products,
  categories,
  brands,
  onEdit,
  onDelete,
}) {
  const { data: exchangeRates } = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: () => getExchangeRates(),
    staleTime: 1000 * 60 * 60, // 1 saat
  });

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <table className="min-w-full bg-white">
        <ProductTableHeader />
        <ProductTableBody
          products={products}
          categories={categories}
          brands={brands}
          onEdit={onEdit}
          onDelete={onDelete}
          exchangeRates={exchangeRates}
        />
      </table>
    </div>
  );
}
