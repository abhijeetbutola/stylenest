import Button from "../button"
import closeIcon from "../../assets/sidebarcloseicon.svg"
import logo from "../../assets/stylenest.svg"
import { Link } from "react-router-dom"
import { useEffect } from "react"

type SidebarProps = {
    open: boolean;
    handleClose: () => void;
  }

function Sidebar({ open, handleClose }: SidebarProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [open]);

    return (
        <>
        {open && (
            <div
                className="fixed inset-0 bg-black/50 z-[998] pointer-events-auto"
                onClick={handleClose} // ✅ Clicking anywhere outside closes sidebar
            />
        )}
        <div className={["lg:hidden absolute w-full max-w-[359px] h-screen z-[999] bg-white -translate-x-full transition-all py-8 px-4", open && "translate-x-[0]"].filter(Boolean).join(" ")}>
            <div className="flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between">
                    <div>
                        <Link to='/' onClick={handleClose}>
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    <div onClick={handleClose}>
                        <Button className="scale-110 transition-all">
                            <img src={closeIcon} alt="" />
                        </Button>
                    </div>
                </div>
                <ul className="flex flex-col gap-2 text-sm font-normal text-neutral-900">
                    <li className="py-2 px-3">
                        <Link to="/product-listing-page" onClick={handleClose}>Shop all</Link>
                    </li>
                    <li className="py-2 px-3">
                        <Link to="/latest-arrivals-page" onClick={handleClose}>Latest Arrivals</Link>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default Sidebar