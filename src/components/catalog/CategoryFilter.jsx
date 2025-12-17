export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex gap-2 overflow-x-auto py-2">
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onCategoryChange(c)}
          className={`px-3 py-1 rounded-full text-sm border
            ${selectedCategory?.id === c.id
              ? "bg-black text-white border-black"
              : "bg-white text-gray-700 border-gray-300 hover:border-black hover:text-black transition-colors"
            }
          `}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
