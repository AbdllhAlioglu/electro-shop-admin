import { getNotifications } from "@/services/apiNotifications";
import NotificationsClient from "./components/NotificationsClient";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  // Server-side veri çekme
  const initialNotifications = await getNotifications();

  return <NotificationsClient initialNotifications={initialNotifications} />;
}
