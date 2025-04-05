"use client";
import React from "react";
import CustomerTable from "./CustomerTable";
import { useCustomers } from "@/app/_hooks/useCustomers";
import AddCustomerButton from "./AddCustomerButton";

export default function CustomersClient({ initialCustomers }) {
  // Hook ile müşterileri client-side'da çek
  const { data: customers = initialCustomers } = useCustomers();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Müşteriler</h1>
        <AddCustomerButton />
      </div>

      <CustomerTable customers={customers} />
    </div>
  );
}
