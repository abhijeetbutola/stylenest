import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../button";
import { useAppSelector } from "../../hooks";
import couponCodeIcon from "../../assets/addCouponCodeicon.svg";

export default function OrderSummary() {
  const [couponState, setCouponState] = useState(false);

  const totalAmount = useAppSelector((state) => state.cartItems.totalAmount);

  const handleCouponState = () => {
    setCouponState(!couponState);
  };

  return (
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
            <span className="font-semibold text-lg text-neutral-900">FREE</span>
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
  );
}
