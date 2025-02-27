"use client";
import { useState } from "react";
import { updateCategory } from "@/services/apiCategories";
import toast from "react-hot-toast";
import { createNotification } from "@/services/apiNotifications";

export default function EditCategoryForm({
  category,
  categories,
  onClose,
  onCategoryUpdated,
}) {
  const [formData, setFormData] = useState({
    name: category.name,
    parent_id: category.parent_id || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        parent_id: formData.parent_id || null,
      };
      await updateCategory(category.id, dataToSubmit);
      await createNotification({
        action_type: "update",
        entity_type: "category",
        entity_id: category.id,
        description: `"${dataToSubmit.name}" kategorisi güncellendi`,
      });
      toast.success("Kategori başarıyla güncellendi");
      if (onCategoryUpdated) onCategoryUpdated();
      else onClose();
    } catch (error) {
      toast.error("Kategori güncellenirken bir hata oluştu: " + error.message);
    }
  };

  // Filter out the current category and its children to prevent circular references
  const availableParentCategories = categories.filter(
    (cat) => cat.id !== category.id
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kategori Adı
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Üst Kategori
        </label>
        <select
          value={formData.parent_id}
          onChange={(e) =>
            setFormData({ ...formData, parent_id: e.target.value || null })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
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
        >
          İptal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}
