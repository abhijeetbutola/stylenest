import Button from "../button"
import logo from "../../assets/stylenest.svg"
import youtube from "../../assets/youtubeicon.svg"
import instagram from "../../assets/instaicon.svg"
import facebook from "../../assets/fbicon.svg"
import github from "../../assets/githubicon.svg"
import x from "../../assets/xicon.svg"

function Footer() {
    return (
        <div className="flex-1 flex max-w-[1408px] mx-4 mb-4">
            <div className="flex-1 lg:p-16 max-lg:p-4 bg-white rounded-b-lg">
                <div className="flex flex-col gap-16 py-24 lg:px-8">
                    <div className="max-sm:flex-1 flex justify-between flex-wrap">
                        <div className="max-sm:w-full">
                            <p className="font-semibold text-xl text-neutral-900">Join our newsletter</p>
                            <p className="font-normal text-base text-neutral-600">We'll send you a nice letter once per week. No spam.</p>
                        </div>
                        <div className="max-sm:flex-1 flex gap-4 flex-wrap sm:max-lg:w-full">
                            <div className="max-md:flex-1 max-sm:w-full">
                                <input type="text" placeholder="Enter your email" className="bg-neutral-50 border border-neutral-200 rounded h-auto sm:min-w-[280px] max-lg:w-full px-3.5 py-2.5 text-sm font-normal placeholder-neutral-500 text-neutral-900" />
                            </div>
                            <div className="max-sm:w-full">
                                <Button className="flex justify-center items-center gap-1 bg-indigo-700 text-white px-4 py-2.5 rounded w-full">Subscribe</Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between flex-wrap">
                        <div className="flex flex-col gap-8 items-start max-w-[352px]">
                            <img src={logo} alt="" className="h-8"/>
                            <p className="text-neutral-600 font-normal text-base">Craft stunning style journeys that weave more joy into every thread.</p>
                        </div>
                        <div className="flex gap-8 flex-wrap">
                            <div className="flex flex-col gap-4 items-start md:w-[280px] max-sm:w-full">
                                <p className="font-normal text-sm text-neutral-500">SHOP CATEGORIES</p>
                                <div className="flex flex-col gap-3 items-start font-medium text-base text-neutral-600">
                                    <Button>Unisex</Button>
                                    <Button>Women</Button>
                                    <Button>Men</Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 items-start md:w-[280px] max-sm:w-full">
                                <p className="font-normal text-sm text-neutral-500">SHOP COLLECTIONS</p>
                                <div className="flex flex-col gap-3 items-start font-medium text-base text-neutral-600">
                                    <Button>Latest Arrivals</Button>
                                    <Button>Urban Oasis</Button>
                                    <Button>Cozy Comfort</Button>
                                    <Button>Fresh Fusion</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between flex-wrap border-t border-t-neutral-200">
                        <p className="pt-8 text-neutral-500 font-normal text-base">© 2024 StyleNest, Inc. All rights reserved.</p>
                        <div className="flex gap-6 pt-8 flex-wrap">
                            <img src={youtube} alt="" className="h-4 w-5" />
                            <img src={instagram} alt="" className="h-4 w-5" />
                            <img src={facebook} alt="" className="h-4 w-5" />
                            <img src={github} alt="" className="h-4 w-5" />
                            <img src={x} alt="" className="h-4 w-5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer