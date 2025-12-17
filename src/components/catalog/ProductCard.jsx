// src/components/catalog/ProductCard.jsx
export default function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:border-black hover:shadow-lg transition-all group duration-300"
    >
      <div className="h-40 bg-gray-100 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500 grayscale group-hover:grayscale-0"
        />
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-black">
          {product.name}
        </h4>
        <p className="text-[11px] text-gray-500 mt-0.5">SKU: {product.sku}</p>
        <p className="text-black font-bold mt-1 text-base">
          ₹{product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
