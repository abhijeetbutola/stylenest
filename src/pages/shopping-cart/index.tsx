import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import Button from "../../components/button";
import emptyCartImage from "../../assets/emptycartimage.webp";
import emptyCartIcon from "../../assets/icons/emptycarticon.svg";
import { ArrowRight } from "lucide-react";
import CartItemCard from "../../components/cart-item-card";
import OrderSummary from "../../components/order-summary";

function Cart() {
  const cartItems = useAppSelector((state) => state.cartItems.items);

  const EmptyCart = (
    <div className="flex max-lg:flex-col gap-8 justify-center items-center">
      <div className="flex w-full flex-col gap-[20px] justify-center items-center max-md:py-[90px] max-2xl:py-[104px] lg:px-24">
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
            <CartItemCard key={index} item={item} index={index} />
          </div>
        ))}
      </div>

      {/* Order Summary Section */}
      <OrderSummary />
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
