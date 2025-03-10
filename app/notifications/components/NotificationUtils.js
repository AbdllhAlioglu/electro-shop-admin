import {
  format,
  isToday,
  isYesterday,
  isSameWeek,
  isSameMonth,
  isSameYear,
} from "date-fns";
import { tr } from "date-fns/locale";

// Tarih formatını belirle
export function getDateLabel(dateStr) {
  const date = new Date(dateStr);

  if (isToday(date)) {
    return "Bugün";
  } else if (isYesterday(date)) {
    return "Dün";
  } else if (isSameWeek(date, new Date(), { locale: tr })) {
    return "Bu Hafta";
  } else if (isSameMonth(date, new Date())) {
    return "Bu Ay";
  } else if (isSameYear(date, new Date())) {
    return format(date, "MMMM", { locale: tr });
  } else {
    return format(date, "MMMM yyyy", { locale: tr });
  }
}

// Bildirimleri tarihe göre gruplandır
export function groupNotificationsByDate(notifications, filterType = "all") {
  const filtered =
    filterType === "all"
      ? notifications
      : notifications.filter((n) => n.action_type === filterType);

  return filtered.reduce((groups, notification) => {
    const dateLabel = getDateLabel(notification.created_at);

    if (!groups[dateLabel]) {
      groups[dateLabel] = [];
    }

    groups[dateLabel].push(notification);
    return groups;
  }, {});
}
