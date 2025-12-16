import { useState } from "react";
import { Tag } from "lucide-react";

export default function VoucherAndNotes({
  notes,
  setNotes,
  measurements,
  setMeasurements,
}) {
  const [showNotes, setShowNotes] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
      {/* Voucher */}
      <div className="relative">
        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Enter coupon / voucher"
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setShowNotes((v) => !v)}
          className="text-xs font-semibold text-gray-600 border rounded px-2 py-1 hover:bg-white bg-gray-100"
        >
          + Add Notes
        </button>
        <button
          onClick={() => setShowMeasurements((v) => !v)}
          className="text-xs font-semibold text-gray-600 border rounded px-2 py-1 hover:bg-white bg-gray-100"
        >
          + Measurements
        </button>
      </div>

      {showNotes && (
        <div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Order specific notes..."
            className="w-full p-2 text-sm border rounded h-16 resize-none"
          />
        </div>
      )}

      {showMeasurements && (
        <div>
          <textarea
            value={measurements}
            onChange={(e) => setMeasurements(e.target.value)}
            className="w-full p-2 border rounded h-32 font-mono text-xs resize-none"
          />
        </div>
      )}
    </div>
  );
}
