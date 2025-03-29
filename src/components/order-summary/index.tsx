import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import couponCodeIcon from "../../assets/icons/addCouponCodeicon.svg";
import { applyCoupon, removeCoupon } from "../../redux/slices/cartSlice";
import { closeIcon } from "../../assets/";
import { COUPONS } from "../../redux/slices/cartSlice";

export default function OrderSummary() {
  const dispatch = useAppDispatch();

  const [couponState, setCouponState] = useState(false);
  const [coupon, setCoupon] = useState<string>("");

  const totalAmount = useAppSelector((state) => state.cartItems.totalAmount);
  const { appliedCoupon, afterDiscount } = useAppSelector(
    (state) => state.cartItems
  );

  console.log(afterDiscount);

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
          {appliedCoupon && (
            <div className="flex justify-between items-center">
              <span className="font-normal text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-2.5 py-1">
                {appliedCoupon}
              </span>
              <span className="font-semibold text-lg text-neutral-900">
                -${(totalAmount - afterDiscount).toFixed(2)}
              </span>
            </div>
          )}

          {couponState ? (
            <div className="flex flex-col gap-1.5">
              <div className="font-medium text-sm text-neutral-700">
                Coupon Code
              </div>
              <div className="flex gap-2 max-sm:flex-col">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 bg-neutral-50 border-2 border-neutral-200 rounded-[4px] text-sm py-2.5 px-3.5"
                  value={coupon.toUpperCase()}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <Button
                  className="border-2 border-neutral-200 rounded-[4px] py-2.5 px-5"
                  onClick={() => {
                    if (COUPONS[coupon]) dispatch(applyCoupon(coupon));
                    else alert("Invalid coupon code!");
                    setCoupon("");
                  }}
                >
                  Apply
                </Button>
              </div>
              {appliedCoupon && (
                <div className="flex">
                  <div className="flex items-center gap-1 px-2 py-1 bg-neutral-200 border border-neutral-200 text-neutral-900 font-medium text-sm rounded">
                    <span>{appliedCoupon}</span>
                    <Button
                      onClick={() => {
                        dispatch(removeCoupon());
                        setCoupon("");
                        setCouponState(false);
                      }}
                    >
                      <img src={closeIcon} alt="" />
                    </Button>
                  </div>
                </div>
              )}
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
            ${appliedCoupon ? afterDiscount : totalAmount}
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
