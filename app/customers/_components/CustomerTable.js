import React from "react";
import CustomerTableClient from "./CustomerTableClient";

export default function CustomerTable({ customers }) {
  return <CustomerTableClient initialCustomers={customers} />;
}
