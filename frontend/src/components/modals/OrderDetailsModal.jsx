import { X } from "lucide-react";
import Barcode from "react-barcode";

export default function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 modal-base active">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <div className="font-semibold text-sm">Order Details</div>
            <div className="text-[11px] text-gray-500 font-mono">
              {order.orderNumber}
            </div>
          </div>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="font-semibold mb-1">Customer</div>
              <div>{order.customer?.name || "Walk-in Customer"}</div>
              <div className="text-[11px] text-gray-500">
                {order.customer?.phone || ""}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Barcode
                value={order.barcode}
                height={40}
                width={1}
                displayValue={false}
              />
              <div className="font-mono text-[10px] mt-1 text-gray-500">
                {order.barcode}
              </div>
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="font-semibold mb-1">Items</div>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1">Item</th>
                  <th className="text-right py-1">Qty</th>
                  <th className="text-right py-1">Price</th>
                  <th className="text-right py-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it) => (
                  <tr key={`${it.productId}-${it.size}`} className="border-b">
                    <td className="py-1 pr-1">
                      <div className="font-medium">{it.name}</div>
                      <div className="text-[10px] text-gray-500">
                        SKU: {it.sku} | Sz: {it.size}
                      </div>
                    </td>
                    <td className="py-1 text-right align-top">{it.qty}</td>
                    <td className="py-1 text-right align-top">
                      {it.price}
                    </td>
                    <td className="py-1 text-right align-top font-semibold">
                      {it.lineTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t pt-3 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.totals.subtotal.toLocaleString()}</span>
            </div>
            {order.totals.discount > 0 && (
              <div className="flex justify-between">
                <span>Discount</span>
                <span>₹{order.totals.discount.toLocaleString()}</span>
              </div>
            )}
            {order.totals.chargesTotal > 0 && (
              <div className="flex justify-between">
                <span>Additional charges</span>
                <span>₹{order.totals.chargesTotal.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{order.totals.grandTotal.toLocaleString()}</span>
            </div>
            <div className="text-[10px] text-gray-500 mt-1">
              Status: {order.status} • Payment:{" "}
              {order.paymentMethod === "cash"
                ? "Cash"
                : order.paymentMethod === "upi_card"
                ? "UPI / Card"
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
