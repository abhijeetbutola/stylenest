import Button from "../../components/button";
import couponCodeIcon from "../../assets/addCouponCodeicon.svg"
import { updateItems, removeItems } from "../../redux/slices/cartSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";

function Cart() {
    const [couponState, setCouponState] = useState(false)
    const cartItems = useAppSelector((state) => state.cartItems.items)
    const totalAmount = useAppSelector((state) => state.cartItems.totalAmount)
    // const totalQuantity = useSelector((state) => state.cartItems.totalQuantity)
    const dispatch = useAppDispatch()  
    
    const handleQuantityButtonClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const target = e.target as HTMLButtonElement;
        
        if (cartItems[index].quantity > 1 && target.innerText === "-") {
          const temp = {...cartItems[index], quantity: cartItems[index].quantity-1}
          dispatch(updateItems(temp))
          
          return;
        }
        if (
          target.innerText === "+" &&
          cartItems[index].list_price != null &&
          cartItems[index].stock > cartItems[index].quantity
        ) {
            const temp = {...cartItems[index], quantity: cartItems[index].quantity+1}
            dispatch(updateItems(temp))

            return;
        }
      };

      const handleRemoveButtonClick = (index: number) => {
        // console.log(cartItems[index]);
        
        dispatch(removeItems(cartItems[index]))
      }

      const handleCouponState = () => {
        setCouponState(!couponState)
      }

    return (
        <div className="mx-4">
            <div className="bg-white flex flex-col gap-16 p-24 rounded-t-lg">
                <div className="font-semibold text-5xl text-neutral-900">Shopping Cart</div>
                <div className="flex gap-8">
                    <div className="flex flex-col gap-8">
                        {cartItems.map((item, index) => {
                            return (
                                <div key={index} className="flex flex-col gap-8">
                                    <div key={index} className="flex gap-8 h-[200px]">
                                    <img src={item.images[0].image_url} alt="" className="flex-1 h-[200px] w-[280px] object-cover rounded-lg" />
                                    <div className="flex flex-col max-w-[488px] gap-4">
                                        <div className="text-2xl font-medium">{item.name}</div>
                                        <div>
                                            <span>{item.color[0].toUpperCase() + item.color.slice(1)}</span>
                                            {item.size &&
                                                <span>
                                                    <span> &#183; </span>
                                                    <span>{String(item.size).toUpperCase()}</span>
                                                </span>
                                            }
                                        </div>
                                        <div className="text-sm text-neutral-600">{item.description}</div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-9 w-[125px] justify-around items-center border-[1px] border-neutral-200 bg-neutral-50 rounded-md text-neutral-600">
                                                    <Button className="h-full flex-1" onClick={(e) => handleQuantityButtonClick(e, index)}>
                                                        -
                                                </Button>
                                                <span className="flex-1 m-auto text-center">{item.quantity}</span>
                                                <Button className="h-full flex-1" onClick={(e) => handleQuantityButtonClick(e, index)}>
                                                    +
                                                </Button>
                                                </div>
                                                <div>
                                                    <Button className="font-medium text-sm text-neutral-600" onClick={() => handleRemoveButtonClick(index)}>Remove</Button>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="font-medium text-lg text-neutral-900">${item.totalPrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {(index+1) < cartItems.length && <hr className="border-t-2 border-neutral-300 border-dotted" />}
                            </div>
                            )
                        })}
                    </div>
                    <div>
                        <div className="sticky top-10 border-2 border-neutral-200 rounded-lg p-8 flex flex-col w-[384px] gap-8">
                            <div className="text-2xl text-neutral-900 font-semibold">Order Summary</div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-1 justify-between items-center">
                                    <span className="text-base font-normal text-neutral-600">Subtotal</span>
                                    <span className="font-semibold text-lg text-neutral-900">${totalAmount}</span>
                                </div>
                                <div className="flex flex-1 justify-between items-center">
                                    <span className="text-base font-normal text-neutral-600">Shipping</span>
                                    <span className="font-semibold text-lg text-neutral-900">FREE</span>
                                </div>
                                {couponState ? 
                                <div className="flex flex-col gap-1.5">
                                    <div className="font-medium text-sm text-neutral-700">Coupon Code</div>
                                    <div className="flex gap-2">
                                        <input type="text" placeholder="Enter coupon code" className="flex-1 bg-neutral-50 border-2 border-neutral-200 rounded-[4px] text-sm py-2.5 px-3.5" />
                                        <Button className="border-2 border-neutral-200 rounded-[4px] py-2.5 px-5">Apply</Button>
                                    </div>
                                </div> : 
                                <div className="flex gap-2 text-indigo-700 font-medium text-base ml-auto">
                                    <img src={couponCodeIcon} alt="" />
                                    <Button onClick={handleCouponState}>Add coupon code</Button>
                                </div>}
                            </div>
                            <hr className="border-t-2 border-neutral-300 border-dotted" />
                            <div className="flex flex-1 justify-between items-center">
                                <span className="text-neutral-900 text-2xl font-medium">Total</span>
                                <span className="font-semibold text-4xl text-neutral-900">${totalAmount}</span>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <Link to={'/checkout'} className="w-full">
                                    <Button className="w-full text-medium text-lg text-white rounded-[4px] bg-indigo-700 hover:bg-indigo-800 p-4">Checkout</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart