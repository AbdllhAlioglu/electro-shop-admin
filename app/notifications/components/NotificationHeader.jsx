"use client";

import { FiCheckCircle, FiRefreshCw } from "react-icons/fi";

export default function NotificationHeader({
  totalCount,
  onMarkAllAsRead,
  onRefresh,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bildirimler</h1>
        <p className="text-gray-600 mt-1">Toplam {totalCount} bildirim</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={onMarkAllAsRead}
          className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <FiCheckCircle className="w-4 h-4" />
          <span>Tümünü Okundu İşaretle</span>
        </button>

        <button
          onClick={onRefresh}
          className="flex items-center gap-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <FiRefreshCw className="w-4 h-4" />
          <span>Yenile</span>
        </button>
      </div>
    </div>
  );
}
