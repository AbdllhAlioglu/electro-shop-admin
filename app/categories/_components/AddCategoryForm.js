"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddCategory } from "@/app/_hooks/useCategories";

export default function AddCategoryForm({ onCategoryAdded, categories }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: addCategory, isLoading } = useAddCategory();

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      parent_id: data.parent_id || null,
    };

    addCategory(formattedData, {
      onSuccess: () => {
        reset();
        if (onCategoryAdded) onCategoryAdded();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-primary-200 mb-1 dark:text-slate-100">
          Kategori Adı
        </label>
        <input
          {...register("name", { required: "Kategori adı gerekli" })}
          type="text"
          className="w-full bg-primary-800 border border-primary-700 rounded-md py-2 px-3 text-primary-100 
            placeholder-primary-400 focus:outline-none focus:ring-2  dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600"
          disabled={isLoading}
        />
        {errors.name && (
          <span className="text-red-400 text-sm mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-200 mb-1 dark:text-slate-100 ">
          Üst Kategori
        </label>
        <select
          {...register("parent_id")}
          className="w-full bg-primary-800 border border-primary-700 rounded-md py-2 px-3 text-primary-100 
            focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600"
          disabled={isLoading}
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
