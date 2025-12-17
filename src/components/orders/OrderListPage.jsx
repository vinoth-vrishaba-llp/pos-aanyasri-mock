import { useMemo, useState, useRef } from "react";
import { Search, ScanBarcode, CheckCircle2 } from "lucide-react";
import { useSearchFocus } from "../../hooks/useSearchFocus";

export default function OrderListPage({
  orders,
  onSelectOrder,
  onMarkCompleted,
}) {
  const searchRef = useSearchFocus(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const barcodeInputRef = useRef(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;

      if (!q) return true;

      const inOrderNumber = o.orderNumber.toLowerCase().includes(q);
      const inBarcode = o.barcode.toLowerCase().includes(q);
      const inCustomer =
        (o.customer?.name || "").toLowerCase().includes(q) ||
        (o.customer?.phone || "").toLowerCase().includes(q);

      return inOrderNumber || inBarcode || inCustomer;
    });
  }, [orders, search, statusFilter]);

  const handleBarcodeClick = () => {
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
      barcodeInputRef.current.select();
    }
  };

  const handleBarcodeKeyDown = (e) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value.trim();
      if (!value) return;

      setSearch(value);

      const match = orders.find(
        (o) =>
          o.barcode.toLowerCase() === value.toLowerCase() ||
          o.orderNumber.toLowerCase() === value.toLowerCase()
      );
      if (match && onSelectOrder) {
        onSelectOrder(match); // opens details
      }

      e.currentTarget.value = "";
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Search + filter bar */}
      <div className="p-4 border-b bg-white flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search by order no, customer, phone..."
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={handleBarcodeClick}
          className="relative p-2 border rounded-lg text-gray-600 hover:bg-gray-50"
          title="Scan order barcode"
        >
          <ScanBarcode className="w-5 h-5" />
          <input
            ref={barcodeInputRef}
            type="text"
            className="absolute inset-0 opacity-0 pointer-events-auto"
            onKeyDown={handleBarcodeKeyDown}
          />
        </button>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-2 py-2 text-xs"
        >
          <option value="all">All statuses</option>
          <option value="paid">Paid</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Orders table */}
      <div className="flex-1 overflow-y-auto p-4">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 text-sm mt-10">
            No orders found.
          </div>
        ) : (
          <table className="w-full text-xs bg-white border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-3 py-2 border-b">Order No</th>
                <th className="text-left px-3 py-2 border-b">Customer</th>
                <th className="text-left px-3 py-2 border-b">Type</th>
                <th className="text-right px-3 py-2 border-b">Total</th>
                <th className="text-left px-3 py-2 border-b">Status</th>
                <th className="text-right px-3 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b last:border-b-0">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="font-mono text-[11px]">
                      {o.orderNumber}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {new Date(o.createdAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="text-[11px] font-medium">
                      {o.customer?.name || "Walk-in"}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {o.customer?.phone || ""}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-[11px] capitalize">
                    {o.orderType.replace("_", " ")}
                  </td>
                  <td className="px-3 py-2 text-right text-[11px] font-semibold">
                    ₹{o.totals.grandTotal.toLocaleString()}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border ${o.status === "completed"
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-800 border-gray-300"
                        }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {o.status === "completed" ? "Completed" : "Paid"}
                    </span>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      {o.paymentMethod === "cash"
                        ? "Cash"
                        : o.paymentMethod === "upi_card"
                          ? "UPI / Card"
                          : ""}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={() => onSelectOrder && onSelectOrder(o)}
                      className="text-[11px] px-2 py-1 border rounded-lg hover:bg-gray-50"
                    >
                      View
                    </button>
                    {o.status !== "completed" && (
                      <button
                        onClick={() =>
                          onMarkCompleted && onMarkCompleted(o.id)
                        }
                        className="ml-1 text-[11px] px-2 py-1 border rounded-lg hover:bg-gray-100 hover:border-black text-black transition-colors"
                      >
                        Mark Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
