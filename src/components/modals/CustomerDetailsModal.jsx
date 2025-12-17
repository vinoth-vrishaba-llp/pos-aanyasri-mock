import { X, Phone, Mail, MapPin, Calendar, ShoppingBag } from "lucide-react";

export default function CustomerDetailsModal({ customer, orders = [], onClose }) {
    if (!customer) return null;

    // Filter orders for this customer if not already filtered
    const customerOrders = orders.filter(
        (order) =>
            order.customer?.phone === customer.phone ||
            (order.customer?.id && order.customer?.id === customer.id)
    );

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 modal-base active">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <div>
                        <h2 className="text-2xl font-bold">{customer.name}</h2>
                        <p className="text-sm text-gray-500">Customer Details</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                            <div className="flex items-center gap-3 text-gray-700">
                                <Phone className="w-4 h-4 text-black" />
                                <span>{customer.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Mail className="w-4 h-4 text-black" />
                                <span>{customer.email || "No email provided"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Calendar className="w-4 h-4 text-black" />
                                <span>
                                    Joined:{" "}
                                    {customer.joinedAt
                                        ? new Date(customer.joinedAt).toLocaleDateString()
                                        : "N/A"}
                                </span>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-start gap-3 text-gray-700">
                                <MapPin className="w-4 h-4 text-black mt-1" />
                                <span className="leading-relaxed">
                                    {customer.address || "No address provided"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order History */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            Order History ({customerOrders.length})
                        </h3>

                        {customerOrders.length === 0 ? (
                            <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg">
                                No orders found for this customer.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {customerOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="border rounded-lg p-4 hover:border-black transition-colors bg-white"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="font-bold text-lg">{order.orderNumber}</div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(order.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-black">
                                                    ₹{order.totals?.grandTotal?.toLocaleString()}
                                                </div>
                                                <span className="px-2 py-0.5 text-xs rounded-full bg-white border border-black text-black capitalize">
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {order.items?.length} items • {order.paymentMethod === "cash" ? "Cash" : "UPI/Card"}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
