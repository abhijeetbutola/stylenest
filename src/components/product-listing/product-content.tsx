import ProductGrid from "../product-grid";
import { Products } from "../product-grid/schema";
import { SkeletonProductGrid } from "../skeletons";
import EmptyState from "./empty-state";

export function ProductContent({
  status,
  products,
}: {
  status: string;
  products: Products[];
}) {
  if (status === "loading") return <SkeletonProductGrid />;
  return products.length ? <ProductGrid products={products} /> : <EmptyState />;
}
