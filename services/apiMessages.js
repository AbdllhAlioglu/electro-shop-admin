import { supabase } from "@/lib/supabase";

export const getMessages = async () => {
  const { data: messages, error } = await supabase.from("messages").select("*");
  if (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
  return messages;
};

export const updateMessageIsRead = async (id, updatedData) => {
  const { data, error } = await supabase
    .from("messages")
    .update(updatedData)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating message:", error);
    throw error;
  }

  return data[0];
};

export const deleteMessage = async (id) => {
  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};
