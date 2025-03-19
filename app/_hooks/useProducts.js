"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/services/apiProducts";
import toast from "react-hot-toast";
import { createNotification } from "@/services/apiNotifications";

// Ürünleri getiren hook
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}

// Ürün ekleme mutation hook'u
export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData) => addProduct(productData),
    onSuccess: async (newProduct, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      if (newProduct && newProduct[0]) {
        // Bildirim oluştur
        await createNotification({
          action_type: "create",
          entity_type: "product",
          entity_id: newProduct[0].id,
          description: `"${variables.name}" ürünü eklendi`,
        });
      }

      toast.success(`${variables.name} ürünü başarıyla eklendi!`);
    },
    onError: (error) => {
      console.error("Ürün eklenirken hata:", error);
      toast.error(
        `Ürün eklenirken bir hata oluştu: ${error.message || "Bilinmeyen hata"}`
      );
    },
  });
}

// Ürün güncelleme mutation hook'u
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: async (updatedProduct, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Bildirim oluştur
      await createNotification({
        action_type: "update",
        entity_type: "product",
        entity_id: variables.id,
        description: `"${variables.data.name}" ürünü güncellendi`,
      });

      toast.success(`${variables.data.name} ürünü başarıyla güncellendi!`);
    },
    onError: (error) => {
      toast.error(
        `Ürün güncellenirken bir hata oluştu: ${
          error.message || "Bilinmeyen hata"
        }`
      );
    },
  });
}

// Ürün silme mutation hook'u
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }) => deleteProduct(id),
    onMutate: async (variables) => {
      // Mevcut verileri önbelleğe al
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousProducts = queryClient.getQueryData(["products"]);

      // Optimistic update: UI'da hemen güncelle
      if (previousProducts) {
        queryClient.setQueryData(
          ["products"],
          previousProducts.filter((product) => product.id !== variables.id)
        );
      }

      return { previousProducts };
    },
    onSuccess: async (_, variables) => {
      // Bildirim oluştur
      await createNotification({
        action_type: "delete",
        entity_type: "product",
        entity_id: variables.id,
        description: `"${variables.name}" ürünü silindi`,
      });

      toast.success(`${variables.name} ürünü başarıyla silindi!`);
    },
    onError: (error, variables, context) => {
      // Hata durumunda eski verilere geri dön
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }

      toast.error(
        `Ürün silinirken bir hata oluştu: ${error.message || "Bilinmeyen hata"}`
      );
    },
    onSettled: () => {
      // Her durumda verileri yeniden getir
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
