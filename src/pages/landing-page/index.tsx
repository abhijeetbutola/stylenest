import Commitment from "../../components/commitment"
import HeroSection from "../../components/hero-section"
import ProductGrid from "../../components/product-grid"
import Collections from "../collections"
import Button from "../../components/button"
import { Link } from "react-router-dom"
import { fetchProducts } from "../../redux/slices/productsSlice"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"

function LandingPage() {
    const dispatch = useAppDispatch()
    const { data: fetchedProductsData, status: fetchedProductsStatus, error: fetchedProductsError } = useAppSelector((state) => state.products)
    const products = fetchedProductsData?.data || []

    useEffect(() => {
        dispatch(fetchProducts({ collection: 'latest', page: 1, per_page: 8 }))
    }, [dispatch])

    return (
        <div className="bg-white flex-1 flex flex-col max-w-[1408px] mx-4 rounded-t-lg w-full">
            <HeroSection />
            <div className="flex flex-col gap-8 px-24 pt-24">
                <div className="flex justify-between font-semibold">
                    <p className="text-3xl text-neutral-900">
                        Latest Arrivals    
                    </p>
                    <Link to="/product-listing-page">
                        <Button className="w-24 h-11 border-[1px] border-neutral-200 rounded hover:shadow-md">View All</Button>      
                    </Link>
                </div>

                {/* Display loading spinner if the products are being fetched */}
                {fetchedProductsStatus === 'loading' && (
                    <div className="text-center text-neutral-500">Loading products...</div>
                )}

                {/* Display error message if there's an error fetching products */}
                {fetchedProductsStatus === 'failed' && fetchedProductsError && (
                    <div className="text-center text-red-500">
                        Error fetching products: {fetchedProductsError || 'Something went wrong.'}
                    </div>
                )}

                {/* Render the product grid only if the data is available */}
                {fetchedProductsStatus === 'succeeded' && <ProductGrid products={products} />}
            </div>
            <Collections />
            <Commitment />
        </div>
    )
}

export default LandingPage
