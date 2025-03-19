"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  checkCategoryHasProducts,
} from "@/services/apiCategories";
import toast from "react-hot-toast";
import { createNotification } from "@/services/apiNotifications";

// Kategorileri getiren hook
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

// Kategori ekleme mutation hook'u
export function useAddCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryData) => addCategory(categoryData),
    onSuccess: async (newCategory, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      if (newCategory && newCategory[0]) {
        // Bildirim oluştur
        await createNotification({
          action_type: "create",
          entity_type: "category",
          entity_id: newCategory[0].id,
          description: `"${variables.name}" kategorisi eklendi`,
        });
      }

      toast.success(`${variables.name} kategorisi başarıyla eklendi!`);
    },
    onError: (error) => {
      console.error("Kategori eklenirken hata:", error);
      toast.error(
        `Kategori eklenirken bir hata oluştu: ${
          error.message || "Bilinmeyen hata"
        }`
      );
    },
  });
}

// Kategori güncelleme mutation hook'u
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      // Bildirim oluştur
      await createNotification({
        action_type: "update",
        entity_type: "category",
        entity_id: variables.id,
        description: `"${variables.data.name}" kategorisi güncellendi`,
      });

      toast.success(`${variables.data.name} kategorisi başarıyla güncellendi!`);
    },
    onError: (error) => {
      toast.error(
        `Kategori güncellenirken bir hata oluştu: ${
          error.message || "Bilinmeyen hata"
        }`
      );
    },
  });
}

// Kategori silme mutation hook'u
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, name }) => {
      // Önce kategoriye bağlı ürün var mı kontrol et
      const hasProducts = await checkCategoryHasProducts(id);
      if (hasProducts) {
        throw new Error("Bu kategori ürünler tarafından kullanılıyor");
      }
      // Ürün yoksa kategoriyi sil
      return deleteCategory(id);
    },
    onMutate: async (variables) => {
      // Mevcut verileri önbelleğe al
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousCategories = queryClient.getQueryData(["categories"]);

      // Optimistic update: UI'da hemen güncelle
      if (previousCategories) {
        queryClient.setQueryData(
          ["categories"],
          previousCategories.filter((category) => category.id !== variables.id)
        );
      }

      return { previousCategories };
    },
    onSuccess: async (_, variables) => {
      // Bildirim oluştur
      await createNotification({
        action_type: "delete",
        entity_type: "category",
        entity_id: variables.id,
        description: `"${variables.name}" kategorisi silindi`,
      });

      toast.success(`${variables.name} kategorisi başarıyla silindi!`);
    },
    onError: (error, variables, context) => {
      // Hata durumunda eski verilere geri dön
      if (context?.previousCategories) {
        queryClient.setQueryData(["categories"], context.previousCategories);
      }

      // Özel hata mesajları
      if (error.message.includes("ürünler tarafından kullanılıyor")) {
        toast.error(
          "Bu kategori ürünler tarafından kullanılıyor. Önce bağlı ürünleri başka kategorilere taşıyın veya silin."
        );
      } else {
        toast.error(
          `Kategori silinirken bir hata oluştu: ${
            error.message || "Bilinmeyen hata"
          }`
        );
      }
    },
    onSettled: () => {
      // Her durumda verileri yeniden getir
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
