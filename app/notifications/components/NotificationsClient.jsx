"use client";
import React from "react";
import NotificationContainer from "./NotificationContainer";
import { useNotifications } from "@/app/_hooks/useNotifications";

export default function NotificationsClient({ initialNotifications }) {
  // Hook ile bildirimleri client-side'da çek, initialNotifications değerini varsayılan olarak kullan
  const { data: notifications = initialNotifications } = useNotifications();

  return (
    <div className="container mx-auto p-4">
      <NotificationContainer notifications={notifications} />
    </div>
  );
}
