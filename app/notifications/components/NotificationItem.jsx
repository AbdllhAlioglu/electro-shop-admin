"use client";

import { format } from "date-fns";
import { tr } from "date-fns/locale";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiInfo,
  FiX,
  FiCheck,
  FiClock,
} from "react-icons/fi";

export default function NotificationItem({
  notification,
  onDelete,
  onMarkAsRead,
  isDeleting,
}) {
  // Bildirim tipine göre simge getir
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

  // Bildirim tipine göre renk getir
  const getActionColor = (action_type) => {
    switch (action_type) {
      case "create":
        return "bg-green-50 text-green-800 border-green-200 dark:bg-green-800 dark:text-stale-200 dark:border-green-700";
      case "update":
        return "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-stale-200 dark:border-blue-700";
      case "delete":
        return "bg-red-50 text-red-800 border-red-200 dark:bg-red-950 dark:text-stale-200 dark:border-red-700";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-stale-200 dark:border-gray-700";
    }
  };

  return (
    <div
      className={`border rounded-lg shadow-sm transition-all ${
        notification.isRead ? "opacity-75" : ""
      } ${getActionColor(notification.action_type)}`}
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
            <div className="flex justify-between">
              <p className="text-gray-800 font-medium dark:text-slate-100">
                {notification.description}
              </p>
              <div className="flex gap-1">
                {!notification.isRead && (
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="text-gray-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 dark:text-slate-100 dark:hover:text-blue-600 dark:hover:bg-blue-50"
                    title="Okundu olarak işaretle"
                  >
                    <FiCheck className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => onDelete(notification.id)}
                  disabled={isDeleting}
                  className="text-gray-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 dark:text-slate-100 dark:hover:text-red-600 dark:hover:bg-red-50"
                  title="Bildirimi sil"
                >
                  <FiX className="w-4 h-4 dark:text-slate-100" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-500 flex items-center gap-1 dark:text-slate-100">
                <FiClock className="w-3 h-3 dark:text-slate-100" />
                {format(new Date(notification.created_at), "HH:mm", {
                  locale: tr,
                })}
              </span>
              {!notification.isRead && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                  Yeni
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
