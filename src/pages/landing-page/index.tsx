import Commitment from "../../components/commitment";
import HeroSection from "../../components/hero-section";
import ProductGrid from "../../components/product-grid";
import Collections from "../collections";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Container from "../../components/container";
import { SkeletonProductGrid, SkeletonText } from "../../components/skeletons";
import SkeletonHero from "../../components/skeletons/SkeletonHero";

function LandingPage() {
  // const forcedLoading = true
  const dispatch = useAppDispatch();
  const {
    data: fetchedProductsData,
    status: fetchedProductsStatus,
    error: fetchedProductsError,
  } = useAppSelector((state) => state.products);
  const products = fetchedProductsData?.data || [];

  useEffect(() => {
    dispatch(fetchProducts({ collection: "latest", page: 1, per_page: 8 }));
  }, [dispatch]);

  return (
    <Container>
      {fetchedProductsStatus === "loading" ? (
        <div>
          <SkeletonHero />
          <div className="flex flex-col gap-8 lg:px-24 max-lg:px-4 py-12 md:py-16 lg:py-24">
            <div className="flex justify-between items-center font-semibold flex-wrap">
              <SkeletonText className="h-11 w-32" />
              <SkeletonText className="w-24 h-11" />
            </div>
            <SkeletonProductGrid />
          </div>
        </div>
      ) : (
        <>
          <HeroSection />
          {/* Latest Arrivals Section */}
          <div className="flex flex-col gap-8 lg:px-24 max-lg:px-4 py-12 md:py-16 lg:py-24">
            <div className="flex justify-between items-center font-semibold flex-wrap">
              <p className="text-2xl md:text-3xl text-neutral-900">
                Latest Arrivals
              </p>
              <Link to="/latest-arrivals-page">
                <Button className="w-24 h-11 border border-neutral-200 rounded hover:shadow-md transition-all">
                  View All
                </Button>
              </Link>
            </div>

            {/* Display loading spinner if the products are being fetched */}
            {/* {fetchedProductsStatus === 'loading' && (
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] grid-rows-auto gap-8">
                    {Array(8).fill(0).map((_, index) => (
                            <div key={index} className="w-full">
                                <SkeletonProductCard />
                            </div>
                    ))}
                </div>
                )} */}

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
          <Collections />
          <Commitment />
        </>
      )}
    </Container>
  );
}

export default LandingPage;
