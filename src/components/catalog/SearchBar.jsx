// src/components/catalog/SearchBar.jsx
import { useRef } from "react";
import { Search, ScanBarcode, SlidersHorizontal } from "lucide-react";
import { lookupBySku } from "../../api/products.api";
import { useSearchFocus } from "../../hooks/useSearchFocus";

export default function SearchBar({
  searchQuery,
  onSearchChange,
  onProductFound, // 👈 NEW
}) {
  // Use custom hook for search focus (autofocus + shortcuts)
  const searchInputRef = useSearchFocus(true);

  const barcodeInputRef = useRef(null);

  const handleBarcodeClick = () => {
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
      barcodeInputRef.current.select();
    }
  };

  const handleBarcodeKeyDown = async (e) => {
    if (e.key !== "Enter") return;

    const value = e.currentTarget.value.trim();
    if (!value) return;

    try {
      // 🔍 SKU / barcode lookup
      const res = await lookupBySku(value);

      if (res.data.data?.length === 1) {
        // ✅ Exactly one match → open product modal
        onProductFound(res.data.data[0]);
      } else {
        // 🔁 Fallback to normal search
        onSearchChange(value);
      }
    } catch (err) {
      console.error("SKU lookup failed", err);
      onSearchChange(value);
    } finally {
      // Clear for next scan
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      {/* Main search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search by product name or SKU..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Barcode button + hidden input */}
      <button
        type="button"
        onClick={handleBarcodeClick}
        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 relative"
        title="Scan barcode"
      >
        <ScanBarcode className="w-6 h-6" />

        <input
          ref={barcodeInputRef}
          type="text"
          className="absolute inset-0 opacity-0 pointer-events-auto"
          onKeyDown={handleBarcodeKeyDown}
        />
      </button>

      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
        <SlidersHorizontal className="w-6 h-6" />
      </button>
    </div>
  );
}
