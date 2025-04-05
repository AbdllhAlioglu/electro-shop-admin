import { supabase } from "@/app/_lib/supabase";

// Get all orders with order items
export async function getOrders() {
  const { data: orders, error } = await supabase.from("orders").select("*");

  if (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }

  return orders;
}

// Get order items by order ID
export async function getOrderItemsByOrderId(orderId) {
  const { data: orderItems, error } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  if (error) {
    console.error("Error fetching order items:", error);
    throw error;
  }

  return orderItems;
}

// Add a new order
export async function addOrder(orderData) {
  const { data, error } = await supabase
    .from("orders")
    .insert([orderData])
    .select();

  if (error) {
    console.error("Error adding order:", error);
    throw error;
  }

  return data;
}

// Update an order
export async function updateOrder(id, orderData) {
  // Priority'nin doğru formatta olduğundan emin olalım
  if (orderData.priority !== undefined) {
    // Boolean'a çevir
    orderData.priority =
      orderData.priority === true ||
      orderData.priority === "true" ||
      orderData.priority === "True";
  }

  console.log("Sipariş verisi:", id, orderData); // Debug

  const { data, error } = await supabase
    .from("orders")
    .update(orderData)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating order:", error);
    throw error;
  }

  return data;
}

// Delete an order
export async function deleteOrder(id) {
  // First delete order items
  const { error: itemsError } = await supabase
    .from("order_items")
    .delete()
    .eq("order_id", id);

  if (itemsError) {
    console.error("Error deleting order items:", itemsError);
    throw itemsError;
  }

  // Then delete the order
  const { error } = await supabase.from("orders").delete().eq("id", id);

  if (error) {
    console.error("Error deleting order:", error);
    throw error;
  }

  return true;
}
