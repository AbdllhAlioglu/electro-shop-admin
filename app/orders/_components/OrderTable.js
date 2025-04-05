import OrderTableHeader from "./OrderTableHeader";
import OrderTableClient from "./OrderTableClient";

export default function OrderTable({ orders }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <OrderTableClient orders={orders} />
    </div>
  );
}
