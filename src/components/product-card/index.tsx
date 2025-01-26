import { colorsToCodes } from "../product-grid/colorToCodes";
import { Products } from "../product-grid/schema";
import { useState } from "react";
import Button from "../button";
import { Link } from "react-router-dom";
import { ColorToCodes } from "../product-grid/schema";
import ImageCarousel from "../carousel";

type ProductCardProps = {
    item: Products;
};

function ProductCard({ item }: ProductCardProps) {
    const [productColor, setProductColor] = useState<string>(item.colors[0]);
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const handleColorClick = (colorName: string, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setProductColor(colorName);
    };

    const imageUrl =
        item.images.find((imageDetails) => productColor === imageDetails.color)
            ?.image_url || item.images[0].image_url;

    const priceObj = item.inventory.find(
        (details) => details.color === productColor
    );

    const itemHoverImagesByColor = item.images.filter((image) => image.color === productColor);

    const ImageSection = isHovering ? (
        <Link to={`/product-details-page/${item.product_id}`}>
            <div className="h-[300px] w-full md:max-w-[320px] rounded-lg overflow-hidden relative">
                <ImageCarousel key={productColor} images={itemHoverImagesByColor} />
            </div>
        </Link>
    ) : (
        <Link to={`/product-details-page/${item.product_id}`}>
            <div className="h-[300px] w-full md:max-w-[320px] relative rounded-lg overflow-hidden">
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={imageUrl}
                    alt={item.name}
                    loading="lazy"
                />
            </div>
        </Link>
    );

    const ProductDetails = (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
                <p className="text-xs text-neutral-600 font-normal">
                    {(productColor?.[0] || item.colors[0][0]).toUpperCase() +
                        (productColor || item.colors[0]).slice(1)}
                </p>
                <Link
                    to={`/product-details-page/${item.product_id}`}
                    className="group-hover:text-indigo-800"
                >
                    <p className="text-lg font-medium text-neutral-900 group-hover:text-indigo-800">{item.name}</p>
                </Link>
            </div>
            <div className="flex gap-2 items-center font-normal">
                <p className="text-lg text-neutral-500">
                    ${priceObj?.sale_price || item.inventory[0].sale_price}
                </p>
                {priceObj && priceObj?.list_price !== null && priceObj?.sale_price !== null && priceObj.list_price > priceObj.sale_price && <del className="text-xs text-neutral-600">${priceObj?.list_price}</del>}
            </div>
            <div className="flex gap-1 pb-[30px]">
                {item.colors.map((color, index: number) => (
                    <Button
                        key={index}
                        className="h-4 w-4 border-[1px] rounded-full border-neutral-300"
                        style={{ backgroundColor: colorsToCodes[color as ColorToCodes] }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleColorClick(color, e)}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <div
            className="flex flex-col rounded-lg overflow-clip hover:text-indigo-800 group w-full h-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="h-full w-full">{ImageSection}</div>
            <div className="pt-4">{ProductDetails}</div>
        </div>
    );
}

export default ProductCard;
