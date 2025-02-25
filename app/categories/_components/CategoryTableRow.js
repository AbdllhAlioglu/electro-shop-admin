"use client";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import IconButton from "@/app/ui/IconButton";
import {
  deleteCategory,
  checkCategoryHasProducts,
} from "@/services/apiCategories";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import EditCategoryForm from "./EditCategoryForm";
import { createNotification } from "@/services/apiNotifications";

export default function CategoryTableRow({
  category,
  parentName,
  categories,
  onEdit,
  onDelete,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      // Önce kategoriye bağlı ürün var mı kontrol et
      const hasProducts = await checkCategoryHasProducts(category.id);

      if (hasProducts) {
        toast.error(
          "Bu kategori ürünler tarafından kullanılıyor. Önce bağlı ürünleri başka kategorilere taşıyın veya silin."
        );
        return;
      }

      // Eğer ürün yoksa silme onayı iste
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
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await deleteCategory(category.id);
                  await createNotification({
                    action_type: "delete",
                    entity_type: "category",
                    entity_id: category.id,
                    description: `"${category.name}" kategorisi silindi`,
                  });
                  queryClient.invalidateQueries({ queryKey: ["categories"] });
                  onDelete(category);
                  toast.success("Kategori başarıyla silindi");
                } catch (error) {
                  toast.error(
                    "Kategori silinirken bir hata oluştu: " + error.message
                  );
                }
              }}
            >
              Sil
            </button>
          </div>
        </div>
      ));
    } catch (error) {
      toast.error(
        "Kategori kontrol edilirken bir hata oluştu: " + error.message
      );
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors duration-200">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
          {category.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {parentName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {new Date(category.created_at).toLocaleDateString("tr-TR")}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
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
