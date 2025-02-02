import { useEffect, useState } from "react";
import Button from "../button";
import SizeSelect from "../size-select";
import StarRating from "../star-rating";
import Accordion from "../accordion";
import { colorsToCodes } from "../product-grid/colorToCodes";
import { ColorToCodes, ProductDetailSchema } from "../product-grid/schema";
import tick from "../../assets/productdetailimages/svg/tickmark.svg";
import { isColorLight } from "./luminanceChecker";
import { addItem } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import Modal from "../modal";
import { useAppDispatch } from "../../hooks";

interface User {
  name: string;
  user_id: string;
  avatar_url: string | null;
}

interface Review {
  rating: number;
  content: string;
  created_at: string; // ISO date string
  user: User;
}

interface RatingCount {
  count: number;
  rating: number;
}

interface Aggregate {
  counts: RatingCount[];
  rating: number; // Average rating
  total: number; // Total number of reviews
}

interface Pagination {
  has_more: boolean;
  page: number;
  per_page: number;
  total: number;
}

type ReviewsResponse = {
  data: Review[];
  aggregate: Aggregate;
  pagination: Pagination;
}

type ProductDetailsSectionProps = {
  product: ProductDetailSchema;
  selectedColor: string | undefined;
  setSelectedColor: (color: string) => void;
}

function ProductDetailSection({product, selectedColor, setSelectedColor}: ProductDetailsSectionProps) {
  
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[] | []>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
      const fetchReviewData = async () => {
        try{
          const response = await fetch(`https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${product.product_id}/reviews`)
          if(!response.ok) throw new Error("Failed to fetch data")
          const result: ReviewsResponse = await response.json()
          const { data } = result
          setReviews(data)
          setLoading(false)
        } catch(error) {
          setError((error as Error).message || "Something went wrong")
          setLoading(false)
        } 
      }
      fetchReviewData()
  },[product.product_id])

  const selectedProductImages = product.images.filter((item) => item.color === selectedColor);

  const handleColorClick = (colorName: string) => {    
    setSelectedColor(colorName);
    setSelectedImage(0);
    setQuantity(1);
  };

  const handleSizeSelect = (sizeValue: string) => {
    setSelectedSize(sizeValue);
    setQuantity(1);
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
    toast.success("Added to cart!", {
      className: "toast-class",
    })
  }

  return (
      <div className="flex max-lg:flex-col justify-center gap-12 lg:gap-[30px] pb-24">
      <div className="flex-1 flex flex-col lg:w-[592px] gap-6 overflow-hidden">
        <div className="">
          <img
            className="object-cover flex w-full max-sm:h-[400px] md:h-[800px] rounded-lg"
            src={selectedProductImages?.[selectedImage]?.image_url}
            alt=""
          />
        </div>
        <div className="flex gap-4 overflow-x-scroll">
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
              <Button className="text-indigo-700 text-sm font-medium" onClick={() => setModalOpen(true)}>
                See all {product?.reviews} reviews
                <Modal open={modalOpen} onClose={() => setModalOpen(false)} loading={loading} error={error}>
                  <div className="flex gap-8 w-full">
                    <div className="flex-[1.5]">
                      Left Section
                    </div>
                    <div className="flex-[2] flex flex-col gap-8 h-[536px] overflow-auto pr-8">
                      {reviews.map((review) =>
                        <div className="flex flex-col gap-4 text-left">
                          <div className="flex gap-4">
                            <div className="h-11 w-12 rounded-full overflow-hidden">
                              <img src={review.user.avatar_url || ""} alt="" className="object-cover w-full h-full" />
                            </div>
                            <div className="flex flex-col gap-1 items-start w-full">
                              <div className="flex justify-between items-center w-full">
                                <div className="font-semibold text-base text-neutral-900">{review.user.name}</div>
                                <div className="text-neutral-600 text-xs font-normal">{review.created_at}</div>
                              </div>
                              <StarRating stars={5} rating={review.rating} />
                            </div>
                          </div>
                          <div className="text-base font-normal text-neutral-600">{review.content}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </Modal>
              </Button>
            </div>
          </div>
        </div>
        <p className="flex text-neutral-600 text-base">{product?.description}</p>
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
