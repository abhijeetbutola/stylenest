// src/components/ProductListing/sortOptions.ts
export const sortOptions = {
  Newest: { sort: "created", direction: "desc" },
  "Best rating": { sort: "rating", direction: "desc" },
  "Most popular": { sort: "popularity", direction: "desc" },
  "Price: Low to High": { sort: "price", direction: "asc" },
  "Price: High to Low": { sort: "price", direction: "desc" },
} as const;
