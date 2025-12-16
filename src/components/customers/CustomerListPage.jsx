import { useState } from "react";
import { Search, Plus, User } from "lucide-react";
import CustomerDetailsModal from "../modals/CustomerDetailsModal";

export default function CustomerListPage({ customers, orders, onAddCustomer }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Filter customers
    const filteredCustomers = customers.filter(
        (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.phone.includes(searchQuery)
    );

    return (
        <div className="h-full flex flex-col bg-gray-50 p-6 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 flex-shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                    <p className="text-gray-500">Manage your customer base</p>
                </div>
                {/* We can add a "New Customer" button here later if needed directly from this page */}
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex gap-4 flex-shrink-0">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search customers by name or phone..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600 border-b">Name</th>
                            <th className="p-4 font-semibold text-gray-600 border-b">Phone</th>
                            <th className="p-4 font-semibold text-gray-600 border-b">Email</th>
                            <th className="p-4 font-semibold text-gray-600 border-b">Address</th>
                            <th className="p-4 font-semibold text-gray-600 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-10 text-center text-gray-500">
                                    No customers found matching "{searchQuery}"
                                </td>
                            </tr>
                        ) : (
                            filteredCustomers.map((customer) => (
                                <tr
                                    key={customer.id}
                                    className="border-b hover:bg-blue-50 transition-colors cursor-pointer"
                                    onClick={() => setSelectedCustomer(customer)}
                                >
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">{customer.name}</div>
                                        <div className="text-xs text-gray-400">ID: {customer.id}</div>
                                    </td>
                                    <td className="p-4 text-gray-700">{customer.phone}</td>
                                    <td className="p-4 text-gray-700">
                                        {customer.email || <span className="text-gray-400">-</span>}
                                    </td>
                                    <td className="p-4 text-gray-700 truncate max-w-[200px]">
                                        {customer.address || <span className="text-gray-400">-</span>}
                                    </td>
                                    <td className="p-4 text-center">
                                        <button
                                            className="text-blue-600 hover:bg-blue-100 p-2 rounded-full"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedCustomer(customer);
                                            }}
                                        >
                                            <User className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Details Modal */}
            {selectedCustomer && (
                <CustomerDetailsModal
                    customer={selectedCustomer}
                    orders={orders}
                    onClose={() => setSelectedCustomer(null)}
                />
            )}
        </div>
    );
}
