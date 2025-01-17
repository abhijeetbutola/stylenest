import Button from "../button";
import { ProductDetailSchema } from "../product-grid/schema";

type ProductProp = {
    product: ProductDetailSchema;
    sizeState: string;
    onSizeButtonClick: (sizeValue: string) => void;
}

function SizeSelect({product, sizeState, onSizeButtonClick}: ProductProp) {

    const handleSizeButtonClick = (sizeValue: string) => {
        onSizeButtonClick(sizeValue)
    }

    return (
        <div className="flex flex-col gap-4">
                <p className="text-neutral-500 text-sm">Available Sizes</p>
                {sizeState ? <div className="flex flex-wrap gap-4">
                    {product?.sizes.map((size, index) => (
                        <div key={index}>
                            <Button className={[
                                "border border-neutral-200 text-base font-medium text-neutral-900 w-14 py-3 rounded",
                                (size === sizeState && "outline outline-offset-0 outline-indigo-600")
                                                ].filter(Boolean).join(" ")} onClick={() => handleSizeButtonClick(size)}
                            >
                                    {String(size).toUpperCase()}
                            </Button>
                        </div>
                    ))}
                </div>
                 : 
                 <div>
                    <Button className="text-base font-medium text-neutral-900 w-14 py-3 rounded border-[2px] border-indigo-600">
                        Std
                    </Button>
                 </div>
                }
        </div>
    )
}

export default SizeSelect;