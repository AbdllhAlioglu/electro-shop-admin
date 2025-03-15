import { getNotifications } from "@/services/apiNotifications";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const notifications = await getNotifications();
  const countNotifications = notifications.length;

  return <HeaderClient notificationCount={countNotifications} />;
}
