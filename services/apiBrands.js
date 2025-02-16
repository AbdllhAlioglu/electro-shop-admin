import { supabase } from "./supabase";

export async function getBrands() {
  const { data: brands, error } = await supabase.from("brand").select("*");

  if (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }

  return brands;
}
