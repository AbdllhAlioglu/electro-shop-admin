"use client";
import React, { useEffect, useState } from "react";
import { getNotifications } from "@/services/apiNotifications";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { FiInfo, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Bildirimler yüklenirken hata:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadNotifications();
  }, []);

  const getActionIcon = (action_type) => {
    switch (action_type) {
      case "create":
        return <FiPlus className="w-5 h-5" />;
      case "update":
        return <FiEdit2 className="w-5 h-5" />;
      case "delete":
        return <FiTrash2 className="w-5 h-5" />;
      default:
        return <FiInfo className="w-5 h-5" />;
    }
  };

  const getActionColor = (action_type) => {
    switch (action_type) {
      case "create":
        return "bg-green-50 text-green-800 border-green-200";
      case "update":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "delete":
        return "bg-red-50 text-red-800 border-red-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  if (!notifications.length) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-gray-100 rounded-full p-4 mb-4">
          <FiInfo className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Henüz Bildirim Yok
        </h3>
        <p className="text-gray-500 max-w-sm">
          Sistem üzerinde yapılan işlemler burada listelenecektir.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Bildirimler</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`border rounded-lg shadow-sm ${getActionColor(
              notification.action_type
            )}`}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-full ${
                    notification.action_type === "create"
                      ? "bg-green-100"
                      : notification.action_type === "update"
                      ? "bg-blue-100"
                      : "bg-red-100"
                  }`}
                >
                  {getActionIcon(notification.action_type)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">
                    {notification.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">
                      {format(
                        new Date(notification.created_at),
                        "d MMMM yyyy",
                        {
                          locale: tr,
                        }
                      )}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {format(new Date(notification.created_at), "HH:mm", {
                        locale: tr,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
