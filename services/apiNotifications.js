import { supabase } from "@/lib/supabase";

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

export async function getNotifications() {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
