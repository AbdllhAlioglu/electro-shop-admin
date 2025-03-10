import { FiCalendar } from "react-icons/fi";
import NotificationItem from "./NotificationItem";

export default function NotificationGroup({
  dateLabel,
  notifications,
  onDelete,
  onMarkAsRead,
  isDeleting,
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-3">
        <FiCalendar className="w-4 h-4" />
        {dateLabel}
        <span className="text-sm font-normal text-gray-500">
          ({notifications.length} bildirim)
        </span>
      </h2>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onDelete={onDelete}
            onMarkAsRead={onMarkAsRead}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
}
