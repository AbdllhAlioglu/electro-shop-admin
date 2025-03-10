import { supabase } from "@/app/_lib/supabase";

// Get all brands
export async function getBrands() {
  const { data: brands, error } = await supabase.from("brand").select("*");

  if (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }

  return brands;
}
