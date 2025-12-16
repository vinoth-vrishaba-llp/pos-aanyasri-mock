// src/components/catalog/ProductGrid.jsx
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onProductClick, loading }) {
  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading products…
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        No products found
      </div>
    );
  }

  return (
    <div
      id="product-grid"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onClick={() => onProductClick(p)}
        />
      ))}
    </div>
  );
}
