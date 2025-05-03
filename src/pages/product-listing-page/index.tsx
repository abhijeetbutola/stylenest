// src/pages/ProductListingPage.tsx
import FilterSection from "../../components/filter-section";
import { useProductsListing } from "../../hooks/useProductListing";
import {
  SortToolbar,
  ProductContent,
  PaginationControls,
} from "../../components/product-listing";
import { toggleSidebar } from "../../redux/slices/contextualSidebarSlice";
import { useAppDispatch } from "../../hooks";
import Container from "../../components/container";

export default function ProductListingPage() {
  const { products, status, page, totalPages, sortKey, setSortKey, goToPage } =
    useProductsListing();

  const dispatch = useAppDispatch();

  return (
    <Container className="flex gap-8 lg:p-24 max-lg:p-4">
      {/* sidebar */}
      <FilterSection />

      <div className="flex-1 flex flex-col gap-8">
        <SortToolbar
          sortKey={sortKey}
          setSortKey={setSortKey}
          toggleSidebar={() => dispatch(toggleSidebar())}
        />

        {products && <ProductContent status={status} products={products} />}

        <PaginationControls
          page={page}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    </Container>
  );
}
