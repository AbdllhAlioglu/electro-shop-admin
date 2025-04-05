import React from "react";
import { getCustomers } from "@/services/apiCustomers";
import CustomersClient from "./_components/CustomersClient";

export const metadata = {
  title: "Müşteriler | Electro Shop Admin",
  description: "Müşterileri yönetin",
};

export const dynamic = "force-dynamic"; // Her sayfada güncel veri için

export default async function CustomersPage() {
  // Server-side veri çekme - başlangıç verileri
  const initialCustomers = await getCustomers();

  return <CustomersClient initialCustomers={initialCustomers} />;
}
