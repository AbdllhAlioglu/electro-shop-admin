import { supabase } from "@/services/supabase";

export async function getProducts() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return products;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function addProduct(productData) {
  const { data, error } = await supabase
    .from("products")
    .insert([productData])
    .select();

  if (error) {
    console.error("Error adding product:", error);
    throw error;
  }

  return data[0];
}
