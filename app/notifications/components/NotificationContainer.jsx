"use client";

import { useState } from "react";
import {
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/services/apiNotifications";
import { groupNotificationsByDate } from "./NotificationUtils";
import NotificationHeader from "./NotificationHeader";
import NotificationFilters from "./NotificationFilters";
import NotificationGroup from "./NotificationGroup";
import EmptyNotifications from "./EmptyNotifications";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";
import { useDeleteNotification } from "@/app/_hooks/useNotifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function NotificationContainer({ notifications = [] }) {
  const [filterType, setFilterType] = useState("all");
  const queryClient = useQueryClient();

  // Bildirim silme mutation'ı
  const { mutate: deleteNotification, isLoading: isDeleting } =
    useDeleteNotification();

  // Okundu olarak işaretleme mutation'ı
  const { mutate: markAsRead } = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["notifications"], (old) =>
        old?.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      toast.success("Bildirim okundu olarak işaretlendi");
    },
    onError: () => {
      toast.error("Bildirim işaretlenirken bir hata oluştu");
    },
  });

  // Tümünü okundu olarak işaretleme mutation'ı
  const { mutate: markAllAsRead } = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.setQueryData(["notifications"], (old) =>
        old?.map((n) => ({ ...n, isRead: true }))
      );
      queryClient.invalidateQueries({ queryKey: ["notificationsCount"] });
      toast.success("Tüm bildirimler okundu olarak işaretlendi");
    },
    onError: () => {
      toast.error("Bildirimler işaretlenirken bir hata oluştu");
    },
  });

  // Bildirimleri yenile
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    queryClient.invalidateQueries({ queryKey: ["notificationsCount"] });
  };

  // Filtre değiştiğinde
  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  // Bildirimleri gruplandır
  const groupedNotifications = groupNotificationsByDate(
    notifications,
    filterType
  );

  if (isDeleting) {
    return <LoadingSpinner />;
  }

  if (!notifications?.length) {
    return <EmptyNotifications />;
  }

  return (
    <>
      <NotificationHeader
        totalCount={notifications.length}
        onMarkAllAsRead={markAllAsRead}
        onRefresh={handleRefresh}
      />

      <NotificationFilters
        filterType={filterType}
        onFilterChange={handleFilterChange}
      />

      <div className="space-y-8">
        {Object.entries(groupedNotifications).map(
          ([dateLabel, notifications]) => (
            <NotificationGroup
              key={dateLabel}
              dateLabel={dateLabel}
              notifications={notifications}
              onDelete={deleteNotification}
              onMarkAsRead={markAsRead}
              isDeleting={isDeleting}
            />
          )
        )}
      </div>
    </>
  );
}
