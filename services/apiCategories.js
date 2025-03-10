import { supabase } from "@/app/_lib/supabase";

// Get all categories
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

// Add a new category
export async function addCategory(categoryData) {
  const { data, error } = await supabase
    .from("category")
    .insert([categoryData])
    .select();

  if (error) {
    console.error("Error adding category:", error);
    throw error;
  }

  return data;
}

// Update a category
export async function updateCategory(id, categoryData) {
  const { data, error } = await supabase
    .from("category")
    .update(categoryData)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating category:", error);
    throw error;
  }

  return data;
}

// Delete a category
export async function deleteCategory(id) {
  const { error } = await supabase.from("category").delete().eq("id", id);

  if (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

// Check if a category has products
export async function checkCategoryHasProducts(categoryId) {
  const { data, error } = await supabase
    .from("products")
    .select("id")
    .eq("category_id", categoryId)
    .limit(1);

  if (error) throw new Error(error.message);
  return data.length > 0;
}
