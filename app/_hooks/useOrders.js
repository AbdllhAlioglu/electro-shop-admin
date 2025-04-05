"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getOrderItemsByOrderId,
} from "@/services/apiOrders";
import toast from "react-hot-toast";
import { createNotification } from "@/services/apiNotifications";

// Hook to get all orders
export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}

// Hook to get order items by order ID
export function useOrderItems(orderId) {
  return useQuery({
    queryKey: ["orderItems", orderId],
    queryFn: () => getOrderItemsByOrderId(orderId),
    enabled: !!orderId,
  });
}

// Hook for adding a new order
export function useAddOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData) => addOrder(orderData),
    onSuccess: async (newOrder, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      if (newOrder && newOrder[0]) {
        await createNotification({
          action_type: "create",
          entity_type: "order",
          entity_id: newOrder[0].id,
          description: `${variables.customer} tarafından yeni sipariş oluşturuldu`,
        });
      }

      toast.success(`Yeni sipariş başarıyla eklendi!`);
    },
    onError: (error) => {
      console.error("Sipariş eklenirken hata:", error);
      toast.error(
        `Sipariş eklenirken bir hata oluştu: ${
          error.message || "Bilinmeyen hata"
        }`
      );
    },
  });
}

// Hook for updating an order
export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => {
      console.log("Updating order:", id, data); // Debug için
      return updateOrder(id, data);
    },
    onSuccess: async (updatedOrder, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      try {
        await createNotification({
          action_type: "update",
          entity_type: "order",
          entity_id: variables.id,
          description: `Sipariş güncellendi`,
        });
      } catch (notificationError) {
        console.error("Bildirim oluşturulurken hata:", notificationError);
        // Bildirim oluşturulamasa bile devam et
      }

      toast.success(`Sipariş başarıyla güncellendi!`);
    },
    onError: (error) => {
      console.error("Sipariş güncelleme hatası:", error);
      toast.error(
        `Sipariş güncellenirken bir hata oluştu: ${
          error.message || "Bilinmeyen hata"
        }`
      );
    },
  });
}

// Hook for deleting an order
export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, customer }) => deleteOrder(id),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });
      const previousOrders = queryClient.getQueryData(["orders"]);

      // Optimistic update: UI'da hemen güncelle
      if (previousOrders) {
        queryClient.setQueryData(
          ["orders"],
          previousOrders.filter((order) => order.id !== variables.id)
        );
      }

      return { previousOrders };
    },
    onSuccess: async (_, variables) => {
      try {
        await createNotification({
          action_type: "delete",
          entity_type: "order",
          entity_id: variables.id,
          description: `${variables.customer} müşterisinin siparişi silindi`,
        });
      } catch (notificationError) {
        console.error("Bildirim oluşturulurken hata:", notificationError);
        // Bildirim oluşturulamasa bile devam et
      }

      toast.success(`Sipariş başarıyla silindi!`);
    },
    onError: (error, variables, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(["orders"], context.previousOrders);
      }

      toast.error(
        `Sipariş silinirken bir hata oluştu: ${
          error.message || "Bilinmeyen hata"
        }`
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
