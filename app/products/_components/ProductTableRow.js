"use client";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import StockStatus from "./StockStatus";
import IconButton from "@/app/_components/IconButton";
import { deleteProduct } from "@/services/apiProducts";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import EditProductForm from "./EditProductForm";
import { convertPrice, formatPrice } from "@/services/currencyService";
import { createNotification } from "@/services/apiNotifications";
import { useRouter } from "next/navigation";

export default function ProductTableRow({
  product,
  categories,
  brands,
  onEdit,
  onDelete,
  exchangeRates,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();
  const [currentCurrency, setCurrentCurrency] = useState("TRY");

  useEffect(() => {
    // localStorage'dan para birimini al
    const savedCurrency = localStorage.getItem("selectedCurrency");
    if (savedCurrency) {
      setCurrentCurrency(savedCurrency);
    }
  }, []);

  const handleDelete = async () => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p>
          &quot;{product.name}&quot; ürününü silmek istediğinizden emin misiniz?
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            İptal
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded-md"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await deleteProduct(product.id);

                // Bildirim oluştur
                await createNotification({
                  action_type: "delete",
                  entity_type: "product",
                  entity_id: product.id,
                  description: `"${product.name}" ürünü silindi`,
                });

                router.refresh();
                onDelete(product);
                toast.success("Ürün başarıyla silindi");
              } catch (error) {
                toast.error(
                  "Ürün silinirken bir hata oluştu: " + error.message
                );
              }
            }}
          >
            Sil
          </button>
        </div>
      </div>
    ));
  };

  const displayPrice = exchangeRates
    ? formatPrice(
        convertPrice(product.price, "TRY", currentCurrency, exchangeRates),
        currentCurrency
      )
    : `${product.price} ₺`;

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors duration-200">
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">
          {product.name}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
          {displayPrice}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm">
          <StockStatus stock={product.stock} />
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
          {categories?.find((category) => category.id === product.category_id)
            ?.name || "-"}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
          {brands?.find((brand) => brand.id === product.brand_id)?.name || "-"}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm">
          <div className="flex gap-2">
            <IconButton
              icon={FiEdit2}
              variant="primary"
              onClick={() => setIsEditModalOpen(true)}
              className="!p-1 !bg-slate-500"
              title="Düzenle"
            />
            <IconButton
              icon={FiTrash2}
              variant="danger"
              onClick={handleDelete}
              className="!p-1"
              title="Sil"
            />
          </div>
        </td>
      </tr>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Ürün Düzenle</h2>
            <EditProductForm
              product={product}
              categories={categories}
              brands={brands}
              onClose={() => setIsEditModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
