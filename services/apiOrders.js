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

// Get recent sales data
export async function getRecentSales() {
  // Join orders with order_items to get complete sales data
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id, 
      created_at, 
      updated_at, 
      user_id, 
      discount_percentage, 
      discounted_total,
      order_items (
        id, 
        created_at, 
        unit_price, 
        total_price, 
        product_name, 
        product_image
      )
    `
    )
    .order("created_at", { ascending: false })
    .limit(10); // Get last 10 sales

  if (error) {
    console.error("Error fetching recent sales:", error);
    throw error;
  }

  return data;
}

// Get sales trends data
export async function getSalesTrendsData() {
  // Calculate sales by month for the last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const isoDate = sixMonthsAgo.toISOString();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id, 
      created_at, 
      discounted_total
    `
    )
    .gte("created_at", isoDate)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching sales trends data:", error);
    throw error;
  }

  // Group data by month
  const salesByMonth = {};
  data.forEach((order) => {
    const date = new Date(order.created_at);
    const monthYear = date.toLocaleString("tr-TR", {
      month: "short",
      year: "numeric",
    });

    if (!salesByMonth[monthYear]) {
      salesByMonth[monthYear] = 0;
    }

    salesByMonth[monthYear] += parseFloat(order.discounted_total);
  });

  // Convert to array format for charts
  const trendsData = Object.entries(salesByMonth).map(([name, amount]) => ({
    name,
    amount: Number(amount.toFixed(2)),
  }));

  return trendsData;
}
