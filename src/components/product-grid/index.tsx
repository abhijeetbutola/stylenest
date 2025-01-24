import ProductCard from "../product-card"
import { Products } from "./schema"

type ProductGridProps = {
    products: Products[]
}

function ProductGrid({products}: ProductGridProps) {

    return (
        <div className="bg-white pt-24 max-md:pb-24">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] grid-rows-auto place-items-center gap-8 w-full font-semibold">
                {products?.map((item) => (
                        <div key={item.product_id}>
                            <ProductCard item={item} />
                        </div>
                ))}
            </div>
        </div>
    )
}

export default ProductGrid
