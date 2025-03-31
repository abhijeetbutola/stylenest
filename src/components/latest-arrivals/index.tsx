import { Link } from "react-router-dom";
import Button from "../button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/slices/productsSlice";
import ProductGrid from "../product-grid";
import { resetCollection } from "../../redux/slices/collectionsSlice";
import { resetColor } from "../../redux/slices/colorsSlice";
import { resetGender } from "../../redux/slices/gendersSlice";
import { resetRating } from "../../redux/slices/ratingsSlice";

function LatestArrivals() {
  const dispatch = useAppDispatch();
  const {
    data: fetchedProductsData,
    status: fetchedProductsStatus,
    error: fetchedProductsError,
  } = useAppSelector((state) => state.products);
  const products = fetchedProductsData?.data || [];

  useEffect(() => {
    dispatch(resetCollection());
    dispatch(resetColor());
    dispatch(resetGender());
    dispatch(resetRating());
    dispatch(fetchProducts({ collection: "latest", page: 1, per_page: 8 }));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-8 lg:px-24 max-lg:px-4 py-12 md:py-16 lg:py-24">
      <div className="flex justify-between items-center font-semibold flex-wrap">
        <p className="text-2xl md:text-3xl text-neutral-900">Latest Arrivals</p>
        <Link to="/latest-arrivals-page">
          <Button className="w-24 h-11 border border-neutral-200 rounded shadow-md transition-all">
            View All
          </Button>
        </Link>
      </div>

      {/* Display error message if there's an error fetching products */}
      {fetchedProductsStatus === "failed" && fetchedProductsError && (
        <div className="text-center text-red-500">
          Error fetching products:{" "}
          {fetchedProductsError || "Something went wrong."}
        </div>
      )}

      {/* Render the product grid only if the data is available */}
      {fetchedProductsStatus === "succeeded" && (
        <ProductGrid products={products} />
      )}
    </div>
  );
}

export default LatestArrivals;
