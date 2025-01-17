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

    const ImageSection = isHovering ? (
        <Link to={`/product-details-page/${item.product_id}`}>
            <ImageCarousel images={item.images} />
        </Link>
    ) : (
        <Link to={`/product-details-page/${item.product_id}`}>
            <img className="object-cover aspect-[14/15]" src={imageUrl} alt={item.name} />
        </Link>
    );

    const ProductDetails = (
        <>
            <p className="text-xs text-neutral-600">
                {(productColor?.[0] || item.colors[0][0]).toUpperCase() +
                    (productColor || item.colors[0]).slice(1)}
            </p>
            <Link to={`/product-details-page/${item.product_id}`}>
                <p className="text-lg font-medium text-neutral-900 hover:text-indigo-800">{item.name}</p>
            </Link>
            <p className="text-lg text-neutral-500 font-normal">
                ${priceObj?.sale_price || item.inventory[0].sale_price}
            </p>
            <div className="flex gap-1">
                {item.colors.map((color, index: number) => (
                    <Button
                        key={index}
                        className="h-4 w-4 border-2 rounded-full border-neutral-300"
                        style={{ backgroundColor: colorsToCodes[color as ColorToCodes] }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleColorClick(color, e)}
                    />
                ))}
            </div>
        </>
    );

    return (
        <div
            className="flex flex-col h-[480px] rounded-lg overflow-clip hover:shadow-lg"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="flex rounded-lg overflow-clip">{ImageSection}</div>
            <div className="pt-4">{ProductDetails}</div>
        </div>
    );
}

export default ProductCard;
