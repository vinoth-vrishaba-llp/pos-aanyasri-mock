// src/components/cart/OrderMetaControls.jsx

const formatNumberInputValue = (value) => {
  return Number.isFinite(value) && value !== 0 ? String(value) : "";
};

export default function OrderMetaControls({
  alterationCharge,
  setAlterationCharge,
  courierCharge,
  setCourierCharge,
  otherCharge,
  setOtherCharge,
  orderType,
  setOrderType,
}) {
  const handleNumberChange = (setter) => (e) => {
    const raw = e.target.value;
    const parsed = parseFloat(raw);
    setter(Number.isFinite(parsed) ? parsed : 0);
  };

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-4 text-xs">
      {/* Order type */}
      <div>
        <p className="font-semibold text-gray-700 mb-2 uppercase tracking-wide">
          Order Type
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleOrderTypeChange("sale")}
            className={[
              "px-3 py-1 rounded-full border text-xs font-medium",
              orderType === "sale"
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:border-black",
            ].join(" ")}
          >
            Normal Sale
          </button>
          <button
            type="button"
            onClick={() => handleOrderTypeChange("advanced_booking")}
            className={[
              "px-3 py-1 rounded-full border text-xs font-medium",
              orderType === "advanced_booking"
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:border-black",
            ].join(" ")}
          >
            Advanced Booking
          </button>
          <button
            type="button"
            onClick={() => handleOrderTypeChange("alteration")}
            className={[
              "px-3 py-1 rounded-full border text-xs font-medium",
              orderType === "alteration"
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:border-black",
            ].join(" ")}
          >
            Alteration
          </button>
        </div>
      </div>

      {/* Additional charges */}
      <div>
        <p className="font-semibold text-gray-700 mb-2 uppercase tracking-wide">
          Additional Charges
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="block mb-1 text-[11px] text-gray-500">
              Alteration
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border rounded px-2 py-1 text-xs"
              placeholder="0"
              value={formatNumberInputValue(alterationCharge)}
              onChange={handleNumberChange(setAlterationCharge)}
            />
          </div>
          <div>
            <label className="block mb-1 text-[11px] text-gray-500">
              Courier
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border rounded px-2 py-1 text-xs"
              placeholder="0"
              value={formatNumberInputValue(courierCharge)}
              onChange={handleNumberChange(setCourierCharge)}
            />
          </div>
          <div>
            <label className="block mb-1 text-[11px] text-gray-500">
              Other
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border rounded px-2 py-1 text-xs"
              placeholder="0"
              value={formatNumberInputValue(otherCharge)}
              onChange={handleNumberChange(setOtherCharge)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
