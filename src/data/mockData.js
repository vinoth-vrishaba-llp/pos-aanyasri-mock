// src/data/mockData.js

export const categories = [
  { id: "all", name: "All" },
  { id: "lehengas", name: "Lehengas" },
  { id: "long-frocks", name: "Long Frocks" },
  { id: "casual-frocks", name: "Casual Frocks" },
  { id: "ready-wear", name: "Ready to wear" },
];

/**
 * type ProductType = "ready_to_wear" | "custom_fabric";
 *
 * type ProductSizeStock = {
 *   size: string;
 *   stock: number;
 * };
 *
 * type Product = {
 *   id: number;
 *   name: string;
 *   sku: string;
 *   price: number;
 *   category: string;
 *   tags: string[];
 *   type: "ready_to_wear" | "custom_fabric";
 *   image: string;
 *   sizes?: ProductSizeStock[]; // only for ready_to_wear
 * };
 */

// NOTE: all products include tag "store-specific" so they show by default.
// Later, when pulling from Woo, we’ll filter by that tag server-side.
export const products = [
  {
    id: 1,
    name: "Bridal Red Lehenga",
    sku: "SR-LH-RED-001",
    price: 15000,
    category: "lehengas",
    tags: ["store-specific"],
    type: "ready_to_wear",
    image: "https://placehold.co/300x400/991b1b/FFF?text=Red+Lehenga",
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 2 },
      { size: "L", stock: 1 },
      { size: "XL", stock: 0 },
    ],
  },
  {
    id: 2,
    name: "Pastel Pink Frock",
    sku: "SR-LF-PNK-002",
    price: 4500,
    category: "long-frocks",
    tags: ["store-specific"],
    type: "ready_to_wear",
    image: "https://placehold.co/300x400/fbcfe8/333?text=Pink+Frock",
    sizes: [
      { size: "S", stock: 3 },
      { size: "M", stock: 4 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
    ],
  },
  {
    id: 3,
    name: "Cotton Casual Print",
    sku: "SR-CF-CTN-003",
    price: 1200,
    category: "casual-frocks",
    tags: ["store-specific"],
    type: "ready_to_wear",
    image: "https://placehold.co/300x400/bfdbfe/333?text=Cotton+Print",
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 5 },
      { size: "L", stock: 3 },
      { size: "XL", stock: 1 },
    ],
  },
  {
    id: 4,
    name: "Silk Party Wear",
    sku: "SR-RW-SLK-004",
    price: 8900,
    category: "ready-wear",
    tags: ["store-specific"],
    type: "ready_to_wear",
    image: "https://placehold.co/300x400/e9d5ff/333?text=Silk+Set",
    sizes: [
      { size: "S", stock: 1 },
      { size: "M", stock: 0 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 1 },
    ],
  },
  {
    id: 5,
    name: "Velvet Lehenga (Fabric Only)",
    sku: "SR-FB-VELV-005",
    price: 18000,
    category: "lehengas",
    tags: ["store-specific"],
    type: "custom_fabric",
    image: "https://placehold.co/300x400/1e1b4b/FFF?text=Velvet+Fabric",
  },
  {
    id: 6,
    name: "Floral Maxi (Fabric)",
    sku: "SR-FB-FLR-006",
    price: 2500,
    category: "long-frocks",
    tags: ["store-specific"],
    type: "custom_fabric",
    image: "https://placehold.co/300x400/f0fdf4/333?text=Floral+Fabric",
  },
  {
    id: 7,
    name: "Summer Breeze (Ready Set)",
    sku: "SR-CF-SUM-007",
    price: 999,
    category: "casual-frocks",
    tags: ["store-specific"],
    type: "ready_to_wear",
    image: "https://placehold.co/300x400/ffedd5/333?text=Summer",
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 2 },
      { size: "L", stock: 1 },
      { size: "XL", stock: 0 },
    ],
  },
  {
    id: 8,
    name: "Designer Kurti Set",
    sku: "SR-RW-KRT-008",
    price: 3200,
    category: "ready-wear",
    tags: ["store-specific"],
    type: "ready_to_wear",
    image: "https://placehold.co/300x400/f1f5f9/333?text=Kurti+Set",
    sizes: [
      { size: "S", stock: 2 },
      { size: "M", stock: 1 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
    ],
  },
];

export const defaultMeasurements =
  "Bust:\nUpper waist:\nLower waist:\nShoulder:\nArmhole:\nFull length:\nYoke length:";

export const mockCustomers = [
  {
    id: "CUST-001",
    name: "Sunita Sharma",
    phone: "9876543210",
    email: "sunita.s@example.com",
    address: "123, Gandhi Road, Vijayawada",
    joinedAt: "2024-11-01T10:00:00Z",
  },
  {
    id: "CUST-002",
    name: "Priya Reddy",
    phone: "8765432109",
    email: "priya.r@example.com",
    address: "45-B, Benz Circle, Vijayawada",
    joinedAt: "2024-12-15T14:30:00Z",
  },
  {
    id: "CUST-003",
    name: "Anita Kumar",
    phone: "7654321098",
    email: "",
    address: "Plot 12, Patamata, Vijayawada",
    joinedAt: "2024-10-20T09:15:00Z",
  },
];

