import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../button";
import SizeSelect from "../size-select";
import StarRating from "../star-rating";
import Accordion from "../accordion";
import { colorsToCodes } from "../product-grid/colorToCodes";
import { ColorToCodes, ProductDetailSchema } from "../product-grid/schema";
import tick from "../../assets/productdetailimages/svg/tickmark.svg";
import { isColorLight } from "./luminanceChecker";
import { addItem } from "../../redux/slices/cartSlice";

type ProductDetailsSectionProps = {
  product: ProductDetailSchema;
  selectedColor: string | undefined;
  setSelectedColor: (color: string) => void;
}

function ProductDetailSection({product, selectedColor, setSelectedColor}: ProductDetailsSectionProps) {
  
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch()

  const selectedProductImages = product.images.filter((item) => item.color === selectedColor);

  const handleColorClick = (colorName: string) => {    
    setSelectedColor(colorName);
    setSelectedImage(0);
  };

  const handleSizeSelect = (sizeValue: string) => {
    setSelectedSize(sizeValue);
  };

  const handleQuantityButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    if (quantity > 1 && target.innerText === "-") {
      setQuantity((prev) => prev - 1);
      return;
    }
    if (
      target.innerText === "+" &&
      currentItemDetails?.list_price != null &&
      currentItemDetails?.stock > quantity
    )
      setQuantity((prev) => prev + 1);
  };

  const currentItemDetails = selectedSize
  ? product?.inventory.find((inventoryItem) => selectedSize === inventoryItem.size && selectedColor === inventoryItem.color)
  : product?.inventory.find((inventoryItem) => selectedColor === inventoryItem.color);

  const { list_price: mrp = 0, sale_price: discount_price = 0 } = currentItemDetails ?? {};
  
  const handleCartDispatch = () => {
    if(!currentItemDetails) return

    const totalPrice = (currentItemDetails?.sale_price || 0) * quantity
    const temp = {product_id: product.product_id, name: product.name, description: product.description, images: selectedProductImages, ...currentItemDetails, color: currentItemDetails.color || "", size: currentItemDetails.size || "N/A", quantity, totalPrice}

    dispatch(addItem(temp))
  }

  return (
    <div className="flex justify-center gap-[30px] pb-24">
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <img
          className="object-cover h-[800px] w-[592px] rounded-lg"
          src={selectedProductImages?.[selectedImage]?.image_url}
          alt=""
        />
        <div className="flex gap-4 max-w-full overflow-x-scroll">
          {selectedProductImages?.map((image, index) => {
            return image.color === selectedColor && (              
              <div
                key={index}
                className={`object-cover h-[190px] w-[160px] rounded-lg overflow-hidden flex-shrink-0 ${
                  image.image_url === selectedProductImages[selectedImage]?.image_url
                    ? "outline outline-[3px] outline-indigo-600 outline-offset-[-3px]"
                    : "cursor-pointer"
                }`}
              >
                <img
                  className="object-cover h-[190px] w-[160px]"
                  src={image.image_url}
                  alt=""
                  onClick={() => setSelectedImage(index)}
                />
              </div>
            )
})}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-8 overflow-hidden pl-[2px]">
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-semibold text-5xl text-neutral-900">{product?.name}</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-3xl text-neutral-600">
                  ${currentItemDetails?.sale_price}
                </span>
                {currentItemDetails?.list_price != null &&
                  currentItemDetails?.sale_price != null &&
                  currentItemDetails.list_price > currentItemDetails.sale_price && (
                    <del className="font-medium text-lg text-neutral-400">
                      ${currentItemDetails.list_price}
                    </del>
                  )}
              </div>
              {mrp > discount_price && (
                <p className="inline-block rounded-full px-[10px] py-1 border border-amber-200 bg-amber-50 text-amber-700 text-sm">
                  {Math.floor(((mrp - discount_price) / mrp) * 100)}% OFF
                </p>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <span>{Number(product?.rating).toFixed(1)}</span>
              <StarRating stars={5} rating={product?.rating ?? 0} />
              <Button className="text-indigo-700 text-sm font-medium">
                See all {product?.reviews} reviews
              </Button>
            </div>
          </div>
        </div>
        <p className="text-neutral-600 text-base">{product?.description}</p>
        <div className="flex flex-col gap-4">
          <p className="text-neutral-500 text-sm">Available Colors</p>
          <div className="flex gap-4">
            {product?.colors.map((color, index: number) => {
              const hexColor = colorsToCodes[color as ColorToCodes];
              const isLight = isColorLight(hexColor);
              

              return (
                <div key={index} className="relative p-[9px]">
                  <Button
                    className={[
                      "h-9 w-9 border-[1px] rounded-full border-neutral-300 relative",
                      selectedColor === color &&
                        "outline outline-2 outline-indigo-800 outline-offset-4",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{ backgroundColor: hexColor }}
                    onClick={() => handleColorClick(color)}
                  />
                  {selectedColor === color && (
                    <div className="absolute top-[19px] left-4">
                      <img
                        key={index}
                        src={tick}
                        alt=""
                        className={isLight ? "filter invert" : ""}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {product && (
          <SizeSelect key={product.product_id} product={product} sizeState={selectedSize} onSizeButtonClick={handleSizeSelect} />
        )}
        <div className="flex flex-col gap-4">
          <p className="text-neutral-500 text-sm">Quantity</p>
          <div className="flex h-9 w-[125px] justify-around items-center border-[1px] border-neutral-200 bg-neutral-50 rounded-md text-neutral-600">
            <Button className="h-full flex-1" onClick={(e) => handleQuantityButtonClick(e)}>
              -
            </Button>
            <span className="flex-1 m-auto text-center">{quantity}</span>
            <Button className="h-full flex-1" onClick={(e) => handleQuantityButtonClick(e)}>
              +
            </Button>
          </div>
        </div>
        <div className="">
          <Button className="w-full bg-indigo-700 hover:bg-indigo-800 font-medium text-lg py-3 text-white rounded-[4px] [box-shadow:0px_1px_2px_0_rgb(0_0_0_/_0.06),_0px_1px_3px_0_rgb(0_0_0_/_0.10)]"
          onClick={handleCartDispatch}
          >
            Add to Cart
          </Button>
        </div>
        {product && <Accordion data={product.info} />}
      </div>
    </div>
  );
}

export default ProductDetailSection;
