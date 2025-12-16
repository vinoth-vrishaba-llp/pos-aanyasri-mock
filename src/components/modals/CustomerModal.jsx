import { X, Search as SearchIcon } from "lucide-react";
import { useState } from "react";

export default function CustomerModal({ isOpen, onClose, onSave, customers = [] }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  // Filter existing customers
  const filteredCustomers = searchQuery.trim()
    ? customers.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
    )
    : []; // Show none if no search query, or maybe show recent? Let's show none to avoid clutter unless searching.

  function handleSave() {
    if (!name.trim()) return;
    onSave({ name: name.trim(), phone: phone.trim(), email, altPhone, address });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 modal-base active">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold">Select Customer</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Search (future: hook to Baserow) */}
          <div className="relative mb-4">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              className="w-full pl-9 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>

          {/* Search Results (if match) */}
          {searchQuery && filteredCustomers.length > 0 && (
            <div className="mb-4 max-h-32 overflow-y-auto border rounded divide-y bg-white shadow-sm z-10 relative">
              {filteredCustomers.map((c) => (
                <div
                  key={c.id}
                  className="p-2 hover:bg-blue-50 flex justify-between items-center cursor-pointer transition-colors"
                  onClick={() => onSave(c)}
                >
                  <div>
                    <div className="font-bold text-sm text-gray-800">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.phone}</div>
                  </div>
                  <div className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">Select</div>
                </div>
              ))}
            </div>
          )}

          {searchQuery && filteredCustomers.length === 0 && (
            <div className="mb-4 text-sm text-gray-500 text-center py-2 border rounded border-dashed">
              No existing customer found. Add below.
            </div>
          )}

          {/* Add new customer */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase">
              Add New Customer
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Full Name"
                className="p-2 border rounded text-sm w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone"
                className="p-2 border rounded text-sm w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="email"
                placeholder="Email"
                className="p-2 border rounded text-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Alt Phone"
                className="p-2 border rounded text-sm w-full"
                value={altPhone}
                onChange={(e) => setAltPhone(e.target.value)}
              />
            </div>
            <textarea
              placeholder="Address"
              className="w-full p-2 border rounded text-sm mb-3 h-16 resize-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700"
            >
              Save &amp; Select Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
