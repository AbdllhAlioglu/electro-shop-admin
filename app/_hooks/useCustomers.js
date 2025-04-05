"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/services/apiCustomers";
import toast from "react-hot-toast";
import { createNotification } from "@/services/apiNotifications";

// Tüm müşterileri getirmek için hook
export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
}

// Yeni müşteri eklemek için hook
export function useAddCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerData) => addCustomer(customerData),
    onSuccess: async (newCustomer, variables) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });

      try {
        if (newCustomer && newCustomer[0]) {
          await createNotification({
            action_type: "create",
            entity_type: "customer",
            entity_id: newCustomer[0].id,
            description: `${variables.name} adlı yeni müşteri eklendi`,
          });
        }
      } catch (notificationError) {
        console.error("Bildirim oluşturulurken hata:", notificationError);
      }

      toast.success(`Yeni müşteri başarıyla eklendi!`);
    },
    onError: (error) => {
      console.error("Müşteri eklenirken hata:", error);
      toast.error(
        `Müşteri eklenirken bir hata oluştu: ${
          error.message || "Bilinmeyen hata"
        }`
      );
    },
  });
}

// Müşteri güncellemek için hook
export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => {
      console.log("Müşteri güncelleniyor:", id, data); // Debug için
      return updateCustomer(id, data);
    },
    onSuccess: async (updatedCustomer, variables) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });

      try {
        await createNotification({
          action_type: "update",
          entity_type: "customer",
          entity_id: variables.id,
          description: `${variables.data.name} adlı müşteri güncellendi`,
        });
      } catch (notificationError) {
        console.error("Bildirim oluşturulurken hata:", notificationError);
      }

      toast.success(`Müşteri başarıyla güncellendi!`);
    },
    onError: (error) => {
      console.error("Müşteri güncelleme hatası:", error);
      toast.error(
        `Müşteri güncellenirken bir hata oluştu: ${
          error.message || "Bilinmeyen hata"
        }`
      );
    },
  });
}

// Müşteri silmek için hook
export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }) => deleteCustomer(id),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["customers"] });
      const previousCustomers = queryClient.getQueryData(["customers"]);

      // Optimistic update: UI'da hemen güncelle
      if (previousCustomers) {
        queryClient.setQueryData(
          ["customers"],
          previousCustomers.filter((customer) => customer.id !== variables.id)
        );
      }

      return { previousCustomers };
    },
    onSuccess: async (_, variables) => {
      try {
        await createNotification({
          action_type: "delete",
          entity_type: "customer",
          entity_id: variables.id,
          description: `${variables.name} adlı müşteri silindi`,
        });
      } catch (notificationError) {
        console.error("Bildirim oluşturulurken hata:", notificationError);
      }

      toast.success(`Müşteri başarıyla silindi!`);
    },
    onError: (error, variables, context) => {
      if (context?.previousCustomers) {
        queryClient.setQueryData(["customers"], context.previousCustomers);
      }

      toast.error(
        `Müşteri silinirken bir hata oluştu: ${
          error.message || "Bilinmeyen hata"
        }`
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}
