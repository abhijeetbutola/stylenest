import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Button from "../../components/button";
import couponCodeIcon from "../../assets/addCouponCodeicon.svg";
import { updateItems, removeItems } from "../../redux/slices/cartSlice";
import emptyCartImage from "../../assets/emptycartimage.svg";
import emptyCartIcon from "../../assets/emptycarticon.svg";
import { ArrowRight } from "lucide-react";

function Cart() {
  const [couponState, setCouponState] = useState(false);
  const cartItems = useAppSelector((state) => state.cartItems.items);
  const totalAmount = useAppSelector((state) => state.cartItems.totalAmount);
  const dispatch = useAppDispatch();

  const handleQuantityButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const target = e.target as HTMLButtonElement;

    if (cartItems[index].quantity > 1 && target.innerText === "-") {
      const updatedItem = {
        ...cartItems[index],
        quantity: cartItems[index].quantity - 1,
      };
      dispatch(updateItems(updatedItem));
      return;
    }

    if (
      target.innerText === "+" &&
      cartItems[index].list_price != null &&
      cartItems[index].stock > cartItems[index].quantity
    ) {
      const updatedItem = {
        ...cartItems[index],
        quantity: cartItems[index].quantity + 1,
      };
      dispatch(updateItems(updatedItem));
      return;
    }
  };

  const handleRemoveButtonClick = (index: number) => {
    dispatch(removeItems(cartItems[index]));
  };

  const handleCouponState = () => {
    setCouponState(!couponState);
  };

  const EmptyCart = (
    <div className="flex gap-8 justify-center items-center flex-wrap">
      <div className="flex flex-col gap-[20px] justify-center items-center max-md:py-[90px] max-2xl:py-[104px] lg:px-24">
        <div className="h-12 w-12 flex justify-center items-center rounded-full shadow-md">
          <img src={emptyCartIcon} alt="" height={21} width={21} />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="font-medium text-xl text-neutral-900">
            Your cart is empty
          </p>
          <p className="font-normal text-base text-neutral-900">
            Let's go explore some products
          </p>
        </div>
        <Link to="/">
          <div className="flex gap-[6px] bg-indigo-700 rounded-[4px] px-4 py-3">
            <Button className="font-medium text-base text-white">
              Explore Products
            </Button>
            <span className="inline-block">
              <ArrowRight color="#ffffff" strokeWidth={2} />
            </span>
          </div>
        </Link>
      </div>
      <div className="max-lg:w-full">
        <img
          src={emptyCartImage}
          alt=""
          className="object-cover max-lg:w-full max-lg:h-[320px]"
        />
      </div>
    </div>
  );
  const FilledCart = (
    <div className="flex gap-8 w-full flex-wrap">
      {/* Cart Items Section */}
      <div className="flex flex-col gap-8 max-lg:mb-8">
        {cartItems.map((item, index) => (
          <div key={index} className="flex flex-col gap-8">
            <div className="flex gap-8 min-h-[200px] max-md:flex-wrap">
              <Link
                to={`/product-details-page/${item.product_id}`}
                className="max-md:w-full"
              >
                <img
                  src={item.images[0].image_url}
                  alt=""
                  className="aspect-[7/5] h-[200px] max-sm:w-full w-[280px] object-cover rounded-lg"
                />
              </Link>
              <div className="flex flex-col w-full max-w-[488px] gap-4">
                <div className="text-2xl font-medium">{item.name}</div>
                <div>
                  {item.size ? (
                    <span>
                      {item.color[0].toUpperCase() + item.color.slice(1)}
                      {item.size !== "N/A" &&
                        " · " + String(item.size).toUpperCase()}
                    </span>
                  ) : (
                    <span>
                      {item.color[0].toUpperCase() + item.color.slice(1)}
                    </span>
                  )}
                </div>
                <div className="text-sm text-neutral-600">
                  {item.description}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-[125px] justify-around items-center border-[1px] border-neutral-200 bg-neutral-50 rounded-md text-neutral-600">
                      <Button
                        className="h-full flex-1"
                        onClick={(e) => handleQuantityButtonClick(e, index)}
                      >
                        -
                      </Button>
                      <span className="flex-1 m-auto text-center">
                        {item.quantity}
                      </span>
                      <Button
                        className="h-full flex-1"
                        onClick={(e) => handleQuantityButtonClick(e, index)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      className="font-medium text-sm text-neutral-600"
                      onClick={() => handleRemoveButtonClick(index)}
                    >
                      Remove
                    </Button>
                  </div>
                  <span className="font-medium text-lg text-neutral-900">
                    ${item.totalPrice}
                  </span>
                </div>
              </div>
            </div>
            {index + 1 < cartItems.length && (
              <hr className="border-t-2 border-neutral-300 border-dotted" />
            )}
          </div>
        ))}
      </div>

      {/* Order Summary Section */}
      <div className="flex-1">
        <div className="sticky top-10 border-2 border-neutral-200 rounded-lg p-8 flex flex-col w-full lg:w-[384px] gap-8">
          <div className="text-2xl text-neutral-900 font-semibold">
            Order Summary
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-1 justify-between items-center">
              <span className="text-base font-normal text-neutral-600">
                Subtotal
              </span>
              <span className="font-semibold text-lg text-neutral-900">
                ${totalAmount}
              </span>
            </div>
            <div className="flex flex-1 justify-between items-center">
              <span className="text-base font-normal text-neutral-600">
                Shipping
              </span>
              <span className="font-semibold text-lg text-neutral-900">
                FREE
              </span>
            </div>

            {couponState ? (
              <div className="flex flex-col gap-1.5">
                <div className="font-medium text-sm text-neutral-700">
                  Coupon Code
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="flex-1 bg-neutral-50 border-2 border-neutral-200 rounded-[4px] text-sm py-2.5 px-3.5"
                  />
                  <Button className="border-2 border-neutral-200 rounded-[4px] py-2.5 px-5">
                    Apply
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 text-indigo-700 font-medium text-base ml-auto">
                <img src={couponCodeIcon} alt="" />
                <Button onClick={handleCouponState}>Add coupon code</Button>
              </div>
            )}
          </div>

          <hr className="border-t-2 border-neutral-300 border-dotted" />

          <div className="flex justify-between items-center">
            <span className="text-neutral-900 text-2xl font-medium">Total</span>
            <span className="font-semibold text-4xl text-neutral-900">
              ${totalAmount}
            </span>
          </div>

          <div className="w-full">
            <Link to="/checkout" className="">
              <Button className="w-full text-medium text-lg text-white rounded-[4px] bg-indigo-700 hover:bg-indigo-800 p-4">
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 max-w-[1408px] mx-4">
      <div className="bg-white flex-1 flex flex-col gap-16 px-4 py-12 lg:p-24 rounded-t-lg w-full">
        <div className="font-semibold text-5xl text-neutral-900">
          Shopping Cart
        </div>
        {cartItems.length ? FilledCart : EmptyCart}
      </div>
    </div>
  );
}

export default Cart;
