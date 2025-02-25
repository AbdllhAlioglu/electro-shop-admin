"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addCategory } from "@/services/apiCategories";
import toast from "react-hot-toast";
import { createNotification } from "@/services/apiNotifications";

export default function AddCategoryForm({ onCategoryAdded, categories }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formattedData = {
        ...data,
        parent_id: data.parent_id || null,
      };

      const newCategory = await addCategory(formattedData);

      await createNotification({
        action_type: "create",
        entity_type: "category",
        entity_id: newCategory[0].id,
        description: `"${data.name}" kategorisi eklendi`,
      });

      toast.success("Kategori başarıyla eklendi!");
      reset();
      if (onCategoryAdded) onCategoryAdded();
    } catch (error) {
      console.error("Kategori eklenirken hata oluştu:", error);
      toast.error("Kategori eklenirken bir hata oluştu!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-primary-200 mb-1">
          Kategori Adı
        </label>
        <input
          {...register("name", { required: "Kategori adı gerekli" })}
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
          Üst Kategori
        </label>
        <select
          {...register("parent_id")}
          className="w-full bg-primary-800 border border-primary-700 rounded-md py-2 px-3 text-primary-100 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Üst Kategori Yok</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
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
          {isLoading ? "Ekleniyor..." : "Kategori Ekle"}
        </button>
      </div>
    </form>
  );
}
