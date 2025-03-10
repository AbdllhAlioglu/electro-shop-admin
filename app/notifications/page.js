import { getNotifications } from "@/services/apiNotifications";
import NotificationContainer from "./components/NotificationContainer";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  // Server-side veri çekme
  const notifications = await getNotifications();

  return (
    <div className="container mx-auto p-4">
      <NotificationContainer initialNotifications={notifications} />
    </div>
  );
}
