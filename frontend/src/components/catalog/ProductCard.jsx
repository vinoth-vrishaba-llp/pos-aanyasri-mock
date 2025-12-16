// src/components/catalog/ProductCard.jsx
export default function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition group"
    >
      <div className="h-40 bg-gray-200 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-3">
        <h4 className="font-medium text-gray-800 text-sm truncate">
          {product.name}
        </h4>
        <p className="text-[11px] text-gray-500 mt-0.5">SKU: {product.sku}</p>
        <p className="text-blue-600 font-bold mt-1">
          ₹{product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
