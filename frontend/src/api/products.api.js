import { products } from "../data/mockData";

// Helper: Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchProducts = async (params = {}) => {
  await delay(500);

  let filtered = [...products];

  // 1. Filter by Category
  if (params.category && params.category !== "all") {
    filtered = filtered.filter((p) => p.category === params.category);
  }

  // 2. Filter by Search
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }

  // 3. Pagination (mock)
  const page = params.page || 1;
  const perPage = params.per_page || 20;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginated = filtered.slice(start, end);

  return {
    data: paginated,
    meta: {
      total: filtered.length,
      page,
      per_page: perPage
    }
  };
};

export const lookupBySku = async (sku) => {
  await delay(300);
  const found = products.find((p) => p.sku === sku);
  return { data: found || null };
};