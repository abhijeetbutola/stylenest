import { useState, useEffect } from "react";
import ProductDetailSection from "../../components/product-detail-section";
import ProductGrid from "../../components/product-grid";
import ProductSpec from "../../components/product-specification";
import { fetchProductDetails } from "../../redux/slices/productDetailsSlice";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { SkeletonText } from "../../components/skeletons";
import { useSearchParams } from "react-router-dom";
import Container from "../../components/container";

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
  const [searchParams] = useSearchParams();

  const products = fetchedProductsData?.data || [];

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (productDetails?.colors && productDetails.colors.length > 0) {
      setSelectedColor((searchParams.get("color") || productDetails.colors[0]));
    }
  }, [productDetails, searchParams]);

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
    return <Container className="p-24"><SkeletonText className="h-28 w-full" /></Container>;
  }
  
  if (productDetailsError || fetchedProductsError) {
    return <div>Error loading product details or products.</div>;
  }
  

  return (
    <div className=" bg-white max-w-[1408px] mx-4 px-4 pt-16 lg:p-24 rounded-t-lg overflow-hidden">
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
