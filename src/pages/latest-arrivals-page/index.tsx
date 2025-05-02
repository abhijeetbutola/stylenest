import { useEffect } from "react";
import ProductGrid from "../../components/product-grid";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { SkeletonProductGrid } from "../../components/skeletons";
import { resetCollection } from "../../redux/slices/collectionsSlice";
import { resetColor } from "../../redux/slices/colorsSlice";
import { resetRating } from "../../redux/slices/ratingsSlice";
import { resetGender } from "../../redux/slices/gendersSlice";

function LatestArrivalsPage() {
  const dispatch = useAppDispatch();
  const { data: fetchedProductsData, status: fetchedProductsStatus } =
    useAppSelector((state) => state.products);
  const products = fetchedProductsData?.data || [];

  useEffect(() => {
    dispatch(resetCollection());
    dispatch(resetColor());
    dispatch(resetGender());
    dispatch(resetRating());
    dispatch(fetchProducts({ collection: ["latest"], page: 1, per_page: 8 }));
  }, [dispatch]);

  return (
    <div className="flex-1 max-w-[1408px] mx-4">
      <div className="bg-white flex flex-col gap-8 p-4 lg:p-24 rounded-t-lg">
        <p className="text-3xl font-semibold text-neutral-900">
          Latest Arrivals
        </p>
        {fetchedProductsStatus === "loading" ? (
          <SkeletonProductGrid />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}

export default LatestArrivalsPage;
