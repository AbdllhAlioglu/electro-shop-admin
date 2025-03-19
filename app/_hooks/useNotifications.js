"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  deleteNotification,
} from "@/services/apiNotifications";

// Bildirim sayısını getiren hook
export function useNotificationsCount() {
  return useQuery({
    queryKey: ["notificationsCount"],
    queryFn: async () => {
      const notifications = await getNotifications();
      return notifications.length;
    },
  });
}

// Bildirimleri getiren hook
export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
}

// Bildirim silme mutation hook'u
export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      // Bildirimleri ve sayıyı güncelle
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notificationsCount"] });
    },
  });
}
