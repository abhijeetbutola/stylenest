import { useState, useEffect } from "react";
import ProductDetailSection from "../../components/product-detail-section";
import ProductGrid from "../../components/product-grid";
import ProductSpec from "../../components/product-specification";
import { fetchProductDetails } from "../../redux/slices/productDetailsSlice";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { useParams, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks"; // Custom hooks

function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();

  const { data: productDetails, status: productDetailsStatus, error: productDetailsError } = useAppSelector(
    (state) => state.productDetails
  );

  const { data: fetchedProductsData, status: fetchedProductsStatus, error: fetchedProductsError } = useAppSelector(
    (state) => state.products
  );

  const { selectedCollections } = useAppSelector((state) => state.collections);
  const { selectedGenders } = useAppSelector((state) => state.genders);

  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  const products = fetchedProductsData?.data || [];
  console.log(productDetails?.collection);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (productDetails?.colors && productDetails.colors.length > 0) {
      setSelectedColor(productDetails.colors[0]);
    }
  }, [productDetails]);

  useEffect(() => {
    if (productDetails?.collection) {
      dispatch(fetchProducts({ collection: productDetails?.collection.collection_id, per_page: 5, page: 1 }));
    }
  }, [dispatch, productDetails?.collection, selectedCollections, selectedGenders]);

  const filteredProducts = products?.length
    ? products.filter((item) => item.product_id !== productId)
    : [];

  const handleColorClick = (colorName: string) => {
    setSelectedColor(colorName);
  };

  if (productDetailsStatus === "loading" || fetchedProductsStatus === "loading") {
    return <div>Loading...</div>;
  }
  
  if (productDetailsError || fetchedProductsError) {
    return <div>Error loading product details or products.</div>;
  }
  

  return (
    <div className="bg-white max-w-[1408px] p-24 rounded-t-lg mx-4 overflow-hidden">
      {productDetails && (
        <ProductDetailSection
          key={productDetails.product_id}
          product={productDetails}
          selectedColor={selectedColor}
          setSelectedColor={handleColorClick}
        />
      )}
      <ProductSpec />
      <ProductGrid products={filteredProducts.slice(0, 4)} />
    </div>
  );
}

export default ProductDetailsPage;
