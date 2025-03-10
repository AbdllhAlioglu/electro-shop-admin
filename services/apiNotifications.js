import { supabase } from "@/app/_lib/supabase";

// Create a new notification
export async function createNotification({
  action_type,
  entity_type,
  entity_id,
  description,
}) {
  const { data, error } = await supabase
    .from("notifications")
    .insert([
      {
        action_type,
        entity_type,
        entity_id,
        description,
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  return data;
}

// Get all notifications
export async function getNotifications() {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// Delete a notification
export async function deleteNotification(id) {
  const { error } = await supabase.from("notifications").delete().eq("id", id);

  if (error) throw new Error(error.message);
  return true;
}

// Mark a notification as read
export async function markNotificationAsRead(id) {
  const { data, error } = await supabase
    .from("notifications")
    .update({ isRead: true })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

// Mark all notifications as read
export async function markAllNotificationsAsRead() {
  const { data, error } = await supabase
    .from("notifications")
    .update({ isRead: true })
    .is("isRead", false)
    .select();

  if (error) throw new Error(error.message);
  return data;
}
