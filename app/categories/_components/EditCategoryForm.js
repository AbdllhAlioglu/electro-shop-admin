"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUpdateCategory } from "@/app/_hooks/useCategories";

export default function EditCategoryForm({ category, categories, onClose }) {
  const [formData, setFormData] = useState({
    name: category.name,
    parent_id: category.parent_id || "",
  });

  const { mutate: updateCategory, isLoading } = useUpdateCategory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      parent_id: formData.parent_id || null,
    };

    updateCategory(
      {
        id: category.id,
        data: dataToSubmit,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  // Filter out the current category and its children to prevent circular references
  const availableParentCategories = categories.filter(
    (cat) => cat.id !== category.id
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">
          Kategori Adı
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600  "
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">
          Üst Kategori
        </label>
        <select
          value={formData.parent_id}
          onChange={(e) =>
            setFormData({ ...formData, parent_id: e.target.value || null })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600  "
          disabled={isLoading}
        >
          <option value="">Üst Kategori Yok</option>
          {availableParentCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
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
