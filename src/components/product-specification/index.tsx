import Tabs from "../tab"
import specifications from "./data"

function ProductSpec() {
    return (
        <div className="text-black w-full max-w-[1408px] flex">
            <div className="flex flex-col grow py-24">
                <div className="flex flex-col grow gap-y-16">
                    <div className="flex flex-col gap-y-6">
                        <p className="text-5xl font-semibold">Discover timeless elegance</p>
                        <p>Step into a world where quality meets quintessential charm with our collection. Every thread weaves a promise of unparalleled quality, ensuring that each garment is not just a part of your wardrobe, but a piece of art. Here's the essence of what makes our apparel the hallmark for those with an eye for excellence and a heart for the environment.</p>
                    </div>
                    <div>
                        <Tabs tabFeatures={specifications} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductSpec