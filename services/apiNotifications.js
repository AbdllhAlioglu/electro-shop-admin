import { supabase } from "@/app/_lib/supabase";

// Create a new notification
export async function createNotification({
  action_type,
  entity_type,
  entity_id,
  description,
}) {
  try {
    // entity_id'yi güvenli bir string formatına çevirelim
    // Bu, veritabanındaki veri tipine uygun bir değere dönüştürmeye yarar
    let safeEntityId;

    if (entity_id && typeof entity_id === "string" && entity_id.includes("-")) {
      // Tire içeren string ID'ler için
      // Güvenli bir alternatif kullanıyoruz: ID'nin ilk parçasını alıyoruz
      safeEntityId = entity_id.split("-")[0];
    } else {
      // Normal ID'ler için doğrudan kullanabiliriz
      safeEntityId = entity_id;
    }

    const { data, error } = await supabase
      .from("notifications")
      .insert([
        {
          action_type,
          entity_type,
          entity_id: safeEntityId,
          description,
        },
      ])
      .select();

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Bildirim oluşturma hatası:", error);
    // Hatayı yukarı fırlatıyoruz, böylece çağıran kod try-catch ile yönetebilir
    throw error;
  }
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
