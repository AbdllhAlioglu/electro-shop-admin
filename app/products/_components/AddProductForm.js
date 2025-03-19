"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddProduct } from "@/app/_hooks/useProducts";

export default function AddProductForm({ onProductAdded, categories, brands }) {
  const [maxLength, setMaxLength] = useState(200);
  const [countLength, setCountLength] = useState(0);

  // Control the description count
  const handleChange = (e) => {
    const value = e.target.value;
    setCountLength(value.length);
    if (value.length > maxLength) {
      setMaxLength(value.length);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: addProduct, isLoading } = useAddProduct();

  const onSubmit = (data) => {
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

    addProduct(formattedData, {
      onSuccess: () => {
        // Formu resetle
        reset();

        // Modalı kapat
        if (onProductAdded) {
          onProductAdded();
        }
      },
    });
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
          placeholder="Ürün adını giriniz"
          autoComplete="false"
          maxLength={200}
          disabled={isLoading}
        />
        {errors.name && (
          <span className="text-red-400 text-sm mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-200 mb-1">
          Açıklama {countLength}/{maxLength}
        </label>
        <textarea
          {...register("description")}
          rows="3"
          className="w-full bg-primary-800 border border-primary-700 rounded-md py-2 px-3 text-primary-100 
            placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ürünün açıklamasını giriniz..."
          onChange={handleChange}
          maxLength={maxLength}
          disabled={isLoading}
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
            placeholder="00,00 ₺"
            min={0}
            max={100000}
            disabled={isLoading}
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
            placeholder="0"
            min={0}
            max={1000}
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
          placeholder="0"
          min={0}
          max={1000}
          onChange={(e) => {
            const value = e.target.value;
            if (value > 1000) {
              e.target.value = 1000;
            }
          }}
          disabled={isLoading}
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
          placeholder="- Özellik 1&#10;- Özellik 2&#10;- Özellik 3"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-200 mb-1">
          Ek Bilgiler
        </label>
        <textarea
          {...register("additional_info")}
          rows="2"
          className="w-full bg-primary-800 border border-primary-700 rounded-md py-2 px-3 text-primary-100 
            placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ek bilgiler..."
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end pt-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center bg-blue-600 text-white py-2 px-6 rounded-md 
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
          disabled={isLoading}
        >
          {isLoading ? "Ekleniyor..." : "Ekle"}
        </button>
      </div>
    </form>
  );
}
