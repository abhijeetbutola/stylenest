import ProductCard from "../product-card"
import { Products } from "./schema"

type ProductGridProps = {
    products: Products[]
}

function ProductGrid({products}: ProductGridProps) {

    return (
        <div className="bg-white">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] grid-rows-auto gap-8">
                {products?.map((item) => (
                        <div key={item.product_id} className="w-full">
                            <ProductCard item={item} />
                        </div>
                ))}
            </div>
        </div>
    )
}

export default ProductGrid
