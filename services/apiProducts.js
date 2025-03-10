import { supabase } from "@/app/_lib/supabase";

// Get all products
export async function getProducts() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return products;
}

// Delete a product
export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

// Add a new product
export async function addProduct(productData) {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([productData])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      throw new Error("Ürün eklendi fakat veri dönmedi");
    }

    return data;
  } catch (error) {
    console.error("Add product error:", error);
    throw error;
  }
}

// Update a product
export async function updateProduct(id, updatedData) {
  const { data, error } = await supabase
    .from("products")
    .update(updatedData)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating product:", error);
    throw error;
  }

  return data[0];
}
