import { UserPlus } from "lucide-react";

export default function CustomerSection({ currentCustomer, onOpenCustomerModal }) {
  const display =
    currentCustomer?.name
      ? `${currentCustomer.name}${currentCustomer.phone ? ` (${currentCustomer.phone})` : ""}`
      : "Walk-in Customer";

  return (
    <div className="p-4 border-b border-gray-200 bg-blue-50">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
          Customer
        </span>
        <button
          onClick={onOpenCustomerModal}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
        >
          <UserPlus className="w-4 h-4" />
          Add / Select
        </button>
      </div>
      <div className="text-gray-800 font-medium truncate">
        {display}
      </div>
    </div>
  );
}
