// src/hooks/useProductsListing.ts
import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchProducts } from "../redux/slices/productsSlice";
import { sortOptions } from "../components/product-listing/sort-options";

export function useProductsListing() {
  const dispatch = useAppDispatch();

  // filter slices
  const { selectedCollections } = useAppSelector((s) => s.collections);
  const { selectedGenders } = useAppSelector((s) => s.genders);
  const { selectedColors } = useAppSelector((s) => s.colors);
  const { selectedRatings } = useAppSelector((s) => s.ratings);

  // sort + pagination state
  const [sortKey, setSortKey] = useState<keyof typeof sortOptions>("Newest");
  const [page, setPage] = useState(1);

  const { sort, direction } = sortOptions[sortKey];

  // pull products from redux
  const { data, status, error } = useAppSelector((s) => s.products);

  const products = data?.data;
  const pagination = data?.pagination;

  const totalPages = Math.ceil(
    (pagination?.total || 0) / (pagination?.per_page || 9)
  );

  // whenever any of these change, re-fetch
  useEffect(() => {
    dispatch(
      fetchProducts({
        collection: selectedCollections, // or multiple if your API supports it
        category: selectedGenders,
        page,
        per_page: 9,
        sort,
        direction,
      })
    );
  }, [
    dispatch,
    selectedCollections,
    selectedGenders,
    selectedColors,
    selectedRatings,
    sort,
    direction,
    page,
  ]);

  const goToPage = useCallback(
    (n: number) => {
      if (n >= 1 && n <= totalPages) setPage(n);
    },
    [totalPages]
  );

  return {
    products,
    status,
    error,
    page,
    totalPages,
    sortKey,
    setSortKey,
    goToPage,
  };
}
