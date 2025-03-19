"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUpdateProduct } from "@/app/_hooks/useProducts";

export default function EditProductForm({
  product,
  categories,
  brands,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
    category_id: product.category_id,
    brand_id: product.brand_id,
  });

  const { mutate: updateProduct, isLoading } = useUpdateProduct();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(
      {
        id: product.id,
        data: formData,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ürün Adı
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fiyat</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Stok</label>
        <input
          type="number"
          value={formData.stock}
          onChange={(e) =>
            setFormData({ ...formData, stock: Number(e.target.value) })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kategori
        </label>
        <select
          value={formData.category_id || ""}
          onChange={(e) =>
            setFormData({ ...formData, category_id: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          disabled={isLoading}
        >
          <option value="">Seçiniz</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Marka</label>
        <select
          value={formData.brand_id || ""}
          onChange={(e) =>
            setFormData({ ...formData, brand_id: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          disabled={isLoading}
        >
          <option value="">Seçiniz</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
          disabled={isLoading}
        >
          İptal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </form>
  );
}
