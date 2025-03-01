"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addProduct } from "@/services/apiProducts";
import toast from "react-hot-toast";
import { createNotification } from "@/services/apiNotifications";
import { useRouter } from "next/navigation";

export default function AddProductForm({ onProductAdded, categories, brands }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formattedData = {
        ...data,
        features: JSON.stringify(
          data.features.split("\n").filter((feature) => feature.trim() !== "")
        ),
        category_id: parseInt(data.category_id),
        brand_id: parseInt(data.brand_id),
        stock: parseInt(data.stock),
        power: parseInt(data.power),
        price: parseFloat(data.price),
      };

      const newProduct = await addProduct(formattedData);

      if (!newProduct || !newProduct[0]) {
        throw new Error("Ürün eklenemedi");
      }

      // Önce bildirimi oluştur
      await createNotification({
        action_type: "create",
        entity_type: "product",
        entity_id: newProduct[0].id,
        description: `"${data.name}" ürünü eklendi`,
      });

      // Başarı mesajını göster
      toast.success("Ürün başarıyla eklendi!");

      // Formu resetle
      reset();

      // Call the onProductAdded callback which will use router.refresh()
      if (onProductAdded) {
        onProductAdded();
      }
    } catch (error) {
      console.error("Ürün eklenirken hata detayı:", error);
      toast.error(
        `Ürün eklenirken bir hata oluştu: ${error.message || "Bilinmeyen hata"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-primary-200 mb-1">
          Ürün Adı
        </label>
        <input
          {...register("name", { required: "Ürün adı gerekli" })}
          type="text"
          className="w-full bg-primary-800 border border-primary-700 rounded-md py-2 px-3 text-primary-100 
            placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.name && (
          <span className="text-red-400 text-sm mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-200 mb-1">
          Açıklama
        </label>
        <textarea
          {...register("description")}
          rows="3"
          className="w-full bg-primary-800 border border-primary-700 rounded-md py-2 px-3 text-primary-100 
            placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-primary-200 mb-1">
            Fiyat
          </label>
          <input
            {...register("price", {
              required: "Fiyat gerekli",
              valueAsNumber: true,
            })}
            type="number"
            step="0.01"
            className="w-full bg-primary-800 border border-primary-700 rounded-md py-2 px-3 text-primary-100 
              placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.price && (
            <span className="text-red-400 text-sm mt-1">
              {errors.price.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-200 mb-1">
            Stok
          </label>
          <input
            {...register("stock", {
              required: "Stok miktarı gerekli",
              valueAsNumber: true,
            })}
            type="number"
            className="w-full bg-primary-800 border border-primary-700 rounded-md py-2 px-3 text-primary-100 
              placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.stock && (
            <span className="text-red-400 text-sm mt-1">
              {errors.stock.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-primary-200 mb-1">
            Marka
          </label>
          <select
            {...register("brand_id", { required: "Marka seçimi gerekli" })}
            className="w-full bg-primary-800 border border-primary-700 rounded-md py-2 px-3 text-primary-100 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Marka Seçin</option>
            {brands?.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          {errors.brand_id && (
            <span className="text-red-400 text-sm mt-1">
              {errors.brand_id.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-200 mb-1">
            Kategori
          </label>
          <select
            {...register("category_id", {
              required: "Kategori seçimi gerekli",
            })}
            className="w-full bg-primary-800 border border-primary-700 rounded-md py-2 px-3 text-primary-100 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Kategori Seçin</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <span className="text-red-400 text-sm mt-1">
              {errors.category_id.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-200 mb-1">
          Güç
        </label>
        <input
          {...register("power", {
            required: "Güç değeri gerekli",
            valueAsNumber: true,
          })}
          type="number"
          className="w-full bg-primary-800 border border-primary-700 rounded-md py-2 px-3 text-primary-100 
            placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.power && (
          <span className="text-red-400 text-sm mt-1">
            {errors.power.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-200 mb-1">
          Özellikler (Her satıra bir özellik yazın)
        </label>
        <textarea
          {...register("features")}
          rows="4"
          className="w-full bg-primary-800 border border-primary-700 rounded-md py-2 px-3 text-primary-100 
            placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Özellik 1&#10;Özellik 2&#10;Özellik 3"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
            focus:ring-offset-primary-800 disabled:bg-blue-800 disabled:cursor-not-allowed
            transition-colors duration-200"
        >
          {isLoading ? "Ekleniyor..." : "Ürün Ekle"}
        </button>
      </div>
    </form>
  );
}
