import { supabase } from "@/app/_lib/supabase";

// Tüm müşterileri getir ve sipariş sayılarını ekle
export async function getCustomers() {
  try {
    // Önce tüm kullanıcıları getir
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*");

    if (usersError) {
      console.error("Müşteriler getirilirken hata:", usersError);
      throw usersError;
    }

    // Tüm siparişleri getir
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("*");

    if (ordersError) {
      console.error("Siparişler getirilirken hata:", ordersError);
      throw ordersError;
    }

    // Her kullanıcı için sipariş sayısını hesapla
    const customersWithOrderCount = users.map((user) => {
      // Kullanıcının user_id'sine göre siparişleri filtrele
      const userOrders = orders.filter((order) => order.user_id === user.id);

      // total_orders özelliğini ekle
      return {
        ...user,
        total_orders: userOrders.length,
      };
    });

    return customersWithOrderCount;
  } catch (error) {
    console.error("Müşteriler ve siparişler getirilirken hata:", error);
    throw error;
  }
}

// Tek bir müşteriyi ID'ye göre getir ve sipariş sayısını ekle
export async function getCustomerById(id) {
  try {
    // Kullanıcıyı getir
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (userError) {
      console.error("Müşteri getirilirken hata:", userError);
      throw userError;
    }

    // Kullanıcının siparişlerini say
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", id);

    if (ordersError) {
      console.error("Müşteri siparişleri getirilirken hata:", ordersError);
      throw ordersError;
    }

    // Sipariş sayısını ekle
    return {
      ...user,
      total_orders: orders ? orders.length : 0,
    };
  } catch (error) {
    console.error("Müşteri ve siparişleri getirilirken hata:", error);
    throw error;
  }
}

// Yeni müşteri ekle
export async function addCustomer(customerData) {
  const { data, error } = await supabase
    .from("users")
    .insert([customerData])
    .select();

  if (error) {
    console.error("Müşteri eklenirken hata:", error);
    throw error;
  }

  return data;
}

// Müşteri güncelle
export async function updateCustomer(id, customerData) {
  const { data, error } = await supabase
    .from("users")
    .update(customerData)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Müşteri güncellenirken hata:", error);
    throw error;
  }

  return data;
}

// Müşteri sil
export async function deleteCustomer(id) {
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) {
    console.error("Müşteri silinirken hata:", error);
    throw error;
  }

  return { success: true };
}
