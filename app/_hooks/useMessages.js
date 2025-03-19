"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMessages,
  deleteMessage,
  updateMessageIsRead,
} from "@/services/apiMessages";
import toast from "react-hot-toast";

// Mesajları getiren hook
export function useMessages() {
  return useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });
}

// Mesaj silme mutation hook'u
export function useDeleteMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteMessage(id),
    onMutate: async (id) => {
      // Mevcut verileri önbelleğe al
      await queryClient.cancelQueries({ queryKey: ["messages"] });
      const previousMessages = queryClient.getQueryData(["messages"]);

      // Optimistic update: UI'da hemen güncelle
      if (previousMessages) {
        queryClient.setQueryData(
          ["messages"],
          previousMessages.filter((message) => message.id !== id)
        );
      }

      return { previousMessages };
    },
    onSuccess: () => {
      toast.success(`Mesaj başarıyla silindi!`);
    },
    onError: (error, id, context) => {
      // Hata durumunda eski verilere geri dön
      if (context?.previousMessages) {
        queryClient.setQueryData(["messages"], context.previousMessages);
      }
      toast.error("Mesaj silinirken bir hata oluştu");
      console.error("Mesaj silinirken hata:", error);
    },
    onSettled: () => {
      // Her durumda verileri yeniden getir
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}

// Mesaj okundu olarak işaretleme mutation hook'u
export function useUpdateMessageReadStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateMessageIsRead(id, data),
    onMutate: async ({ id, data }) => {
      // Mevcut verileri önbelleğe al
      await queryClient.cancelQueries({ queryKey: ["messages"] });
      const previousMessages = queryClient.getQueryData(["messages"]);

      // Optimistic update: UI'da hemen güncelle
      if (previousMessages) {
        queryClient.setQueryData(
          ["messages"],
          previousMessages.map((message) =>
            message.id === id ? { ...message, isread: data.isread } : message
          )
        );
      }

      return { previousMessages };
    },
    onSuccess: () => {
      toast.success("Mesaj okundu olarak işaretlendi");
    },
    onError: (error, variables, context) => {
      // Hata durumunda eski verilere geri dön
      if (context?.previousMessages) {
        queryClient.setQueryData(["messages"], context.previousMessages);
      }
      toast.error("Mesaj durumu güncellenirken bir hata oluştu");
      console.error("Mesaj durumu güncellenirken hata:", error);
    },
    onSettled: () => {
      // Her durumda verileri yeniden getir
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}
