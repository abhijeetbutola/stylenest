import Button from "../button";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toast } from "react-toastify";
import hamburgerIcon from "../../assets/hamburgericon.svg"
import cartIcon from "../../assets/carticon.svg"
import storeLogo from "../../assets/stylenest.svg"

function Navbar() {
    const dispatch = useAppDispatch()
    const cartItemsCount = useAppSelector((state) => state.cartItems.items.length)
    // console.log(cartItems);
    
    const isAuth = useAppSelector((state) => state.auths.isAuthenticated)
    const navigate = useNavigate()
    
    const handleAuthAction = () => {
        if(isAuth){
            dispatch(logout())
            dispatch(clearCart())
            toast.success("You have been logged out.", {
                className: "toast-class",
                delay: 500,
            });
            navigate('/')
        } else {
            navigate('/sign-in')
        }
    }

    return (
        <div className="h-[72px] w-full flex items-center px-8">
            <div className="flex flex-1 h-14 items-center">
                <div className="flex grow justify-between items-baseline lg:items-center">
                    <div className="flex grow gap-14 items-center">
                        {/* Logo Section */}
                        <div>
                            <Link to="/">
                                <img src={storeLogo} alt="" className="hover:scale-110 transition-all" />
                            </Link>
                        </div>

                        {/* Desktop Buttons */}
                        <div className="hidden lg:flex grow gap-8 items-center ">
                            <Link to="/product-listing-page" className="font-medium text-base text-neutral-600 hover:text-white hover:shadow-md hover:bg-indigo-500 p-2 rounded-[4px] transition-all">Shop all</Link>
                            <Link to="/latest-arrivals-page" className="font-medium text-base text-neutral-600 hover:text-white hover:shadow-md p-2 hover:bg-indigo-500 rounded-[4px] transition-all">Latest arrivals</Link>
                        </div>
                    </div>
                    <div className="flex gap-8 lg:items-center">

                        {/* Desktop Button */}
                        <div className="hidden lg:block font-medium text-base text-neutral-600">
                            <Button className="font-medium text-base text-neutral-600 hover:text-white hover:shadow-md p-2 hover:bg-indigo-500 rounded-[4px] transition-all" onClick={handleAuthAction}>{isAuth ? "Logout" : "Login"}</Button>
                        </div>
                        <div className="relative">
                            <Link to="/cart" className="font-medium text-base text-neutral-600">
                                <img src={cartIcon} alt="" className="hover:scale-110 transition-all" />
                            </Link>
                            {cartItemsCount > 0 && <div className="absolute w-[18px] h-[18px] bg-indigo-700 rounded-full top-[-8px] right-[-10px] text-white flex justify-center items-center font-semibold text-xs">{cartItemsCount}</div>}
                        </div>

                        {/* Mobile Button */}
                        <div className="max-md:block lg:hidden">
                            <Button>
                                <img src={hamburgerIcon} alt="" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;