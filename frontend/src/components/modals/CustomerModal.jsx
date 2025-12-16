import { X, Search as SearchIcon } from "lucide-react";
import { useState } from "react";

export default function CustomerModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [address, setAddress] = useState("");

  if (!isOpen) return null;

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
            />
          </div>

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
