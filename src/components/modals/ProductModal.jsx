// src/components/modals/ProductModal.jsx
import { X } from "lucide-react";

export default function ProductModal({
  isOpen,
  product,
  selectedSize,
  setSelectedSize,
  onClose,
  onAddToCart,
}) {
  if (!isOpen || !product) return null;

  const isReadyToWear = product.type === "ready_to_wear";
  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;

  const handleAdd = () => {
    if (isReadyToWear && hasSizes) {
      if (!selectedSize) {
        alert("Please select an available size");
        return;
      }
      onAddToCart(selectedSize);
      return;
    }

    // custom fabric: we can use a generic size token,
    // later we can attach measurements from receipt/notes.
    onAddToCart("FABRIC");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm modal-base active">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="relative h-64 bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-1">SKU: {product.sku}</p>
          <p className="text-lg font-medium text-black mb-4">
            ₹{product.price.toLocaleString()}
          </p>

          {/* Type label */}
          <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-4">
            {isReadyToWear ? "Ready to wear" : "Custom fabric (advanced booking)"}
          </p>

          {isReadyToWear && hasSizes && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(({ size, stock }) => {
                  const outOfStock = stock <= 0;
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={outOfStock}
                      onClick={() => {
                        if (!outOfStock) setSelectedSize(size);
                      }}
                      className={[
                        "w-10 h-10 rounded border flex flex-col items-center justify-center text-xs focus:outline-none transition relative",
                        outOfStock
                          ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                          : isSelected
                            ? "bg-black text-white border-black"
                            : "border-gray-300 hover:border-black",
                      ].join(" ")}
                    >
                      <span
                        className={
                          outOfStock ? "line-through decoration-gray-400" : ""
                        }
                      >
                        {size}
                      </span>
                      {!outOfStock && (
                        <span className="text-[9px] text-gray-500 mt-0.5">
                          {stock} pcs
                        </span>
                      )}
                      {outOfStock && (
                        <span className="text-[9px] text-gray-400 mt-0.5">
                          OOS
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[11px] text-gray-500">
                Out-of-stock sizes are shown with strikethrough and cannot be selected.
              </p>
            </div>
          )}

          {/* For fabric products, we can show a hint instead of size selector */}
          {!isReadyToWear && (
            <div className="mb-6 text-[12px] text-gray-600 bg-gray-50 border border-dashed border-gray-300 rounded-lg p-3">
              This is a fabric / custom-made item. Sizes and measurements will be
              captured during billing under advanced booking.
            </div>
          )}

          <button
            onClick={handleAdd}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
