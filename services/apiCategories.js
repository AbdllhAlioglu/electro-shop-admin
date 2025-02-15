import { supabase } from "./supabase";

export async function getCategories() {
  const { data: categories, error } = await supabase
    .from("category")
    .select("*");

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return categories;
}
