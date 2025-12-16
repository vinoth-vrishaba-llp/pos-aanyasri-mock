import { useState, useMemo } from "react";
import { products as allProducts } from "../../data/mockData";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

export default function ProductCatalog({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onProductClick,
}) {
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // 1. Filter by Category
    if (selectedCategory?.id && selectedCategory.id !== "all") {
      result = result.filter((p) => p.category === selectedCategory.id);
    }

    // 2. Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <div className="p-4 bg-white border-b">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onProductFound={onProductClick}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 no-scrollbar">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => onProductClick(p)}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col"
            >
              <div className="aspect-[3/4] w-full bg-gray-100 relative">
                <img
                  src={p.image || p.images?.[0] || 'https://placehold.co/300x400?text=No+Image'}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 flex flex-col flex-1 gap-1">
                <h3 className="text-xs font-medium text-gray-900 line-clamp-2 leading-tight" title={p.name}>
                  {p.name}
                </h3>
                <div className="mt-auto text-blue-600 font-bold text-sm">
                  ₹{Number(p.price).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
