import { categories } from "../data/mockData";

// Helper: Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchCategories = async () => {
  await delay(300);
  // Matches the structure expected by App.jsx: res.data.data or res.data
  return { data: categories };
};