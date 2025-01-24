import { useEffect } from "react";
import ProductGrid from "../../components/product-grid";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchProducts } from "../../redux/slices/productsSlice";

function LatestArrivalsPage() {
    const dispatch = useAppDispatch()
    const { data: fetchedProductsData } = useAppSelector((state) => state.products)
    const products = fetchedProductsData?.data || []

    useEffect(() => {
        dispatch(fetchProducts({ collection: 'latest', page: 1, per_page: 8}))
    }, [dispatch])

    return (
        <div className="flex-1 max-w-[1408px] mx-4">
            <div className="bg-white p-4 lg:p-24 rounded-t-lg">
                <p className="text-3xl font-semibold text-neutral-900">Latest Arrivals</p>
                <ProductGrid products={products} />
            </div>
        </div>
    )
}

export default LatestArrivalsPage