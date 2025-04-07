"use client";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import IconButton from "@/app/_components/IconButton";
import toast from "react-hot-toast";
import { useState } from "react";
import EditCategoryForm from "./EditCategoryForm";
import { useDeleteCategory } from "@/app/_hooks/useCategories";

export default function CategoryTableRow({ category, parentName, categories }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { mutate: deleteCategory, isLoading: isDeleting } = useDeleteCategory();

  const handleDelete = () => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p>
          &quot;{category.name}&quot; kategorisini silmek istediğinizden emin
          misiniz?
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
            disabled={isDeleting}
            onClick={() => {
              toast.dismiss(t.id);
              deleteCategory({
                id: category.id,
                name: category.name,
              });
            }}
          >
            {isDeleting ? "Siliniyor..." : "Sil"}
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors duration-200 dark:bg-gray-700 dark:hover:bg-gray-600">
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-medium dark:text-slate-100  ">
          {category.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-slate-100  ">
          {parentName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-slate-100  ">
          {new Date(category.created_at).toLocaleDateString("tr-TR")}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm ">
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
              disabled={isDeleting}
            />
          </div>
        </td>
      </tr>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md dark:bg-gray-700">
            <h2 className="text-xl font-semibold mb-4">Kategori Düzenle</h2>
            <EditCategoryForm
              category={category}
              categories={categories}
              onClose={() => setIsEditModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
