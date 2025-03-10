"use client";

import { useState, useEffect } from "react";
import {
  deleteNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getNotifications,
} from "@/services/apiNotifications";
import { groupNotificationsByDate } from "./NotificationUtils";
import NotificationHeader from "./NotificationHeader";
import NotificationFilters from "./NotificationFilters";
import NotificationGroup from "./NotificationGroup";
import EmptyNotifications from "./EmptyNotifications";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";

export default function NotificationContainer({ initialNotifications }) {
  const [notifications, setNotifications] = useState(
    initialNotifications || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filterType, setFilterType] = useState("all");

  // Bildirimleri yükle
  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await getNotifications();
      setNotifications(data);
      toast.success("Bildirimler güncellendi");
    } catch (error) {
      console.error("Bildirimler yüklenirken hata:", error);
      toast.error("Bildirimler yüklenirken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  // Bildirimi sil
  const handleDeleteNotification = async (id) => {
    try {
      setIsDeleting(true);
      await deleteNotification(id);
      setNotifications(notifications.filter((n) => n.id !== id));
      toast.success("Bildirim silindi");
    } catch (error) {
      console.error("Bildirim silinirken hata:", error);
      toast.error("Bildirim silinirken bir hata oluştu");
    } finally {
      setIsDeleting(false);
    }
  };

  // Bildirimi okundu olarak işaretle
  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      toast.success("Bildirim okundu olarak işaretlendi");
    } catch (error) {
      console.error("Bildirim işaretlenirken hata:", error);
      toast.error("Bildirim işaretlenirken bir hata oluştu");
    }
  };

  // Tüm bildirimleri okundu olarak işaretle
  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
      toast.success("Tüm bildirimler okundu olarak işaretlendi");
    } catch (error) {
      console.error("Bildirimler işaretlenirken hata:", error);
      toast.error("Bildirimler işaretlenirken bir hata oluştu");
    }
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!notifications.length) {
    return <EmptyNotifications />;
  }

  return (
    <>
      <NotificationHeader
        totalCount={notifications.length}
        onMarkAllAsRead={handleMarkAllAsRead}
        onRefresh={loadNotifications}
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
              onDelete={handleDeleteNotification}
              onMarkAsRead={handleMarkAsRead}
              isDeleting={isDeleting}
            />
          )
        )}
      </div>
    </>
  );
}
