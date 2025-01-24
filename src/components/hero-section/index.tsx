import { Link } from "react-router-dom"
import heroImage from "../../assets/mainpageimage.jpg"
// import Button from "../button"

function HeroSection() {
    return (
            <div className="flex-1 flex gap-8 flex-wrap max-sm:py-12 md:py-16 lg:p-24 max-lg:px-4 ">
                <div className="flex flex-col gap-8 lg:gap-16 justify-center lg:max-w-[calc(50%-1rem)]">
                    <div className="flex flex-col gap-6">
                        <p className="font-semibold max-sm:text-4xl max-md:text-5xl md:text-6xl text-neutral-900">Summer styles are finally here</p>
                        <p className="font-normal text-lg md:text-xl text-neutral-600">This year, our new collections will be your haven from the world's harsh elements.</p>
                    </div>
                    <div>
                        <Link to="/product-listing-page" className="text-white font-medium text-lg bg-indigo-700 px-4 py-2.5 rounded-[4px] hover:bg-indigo-800">Shop now</Link>
                    </div>
                </div>
                <div className="lg:max-w-[calc(50%-1rem)]">
                    <div className="rounded-lg overflow-hidden">
                        <img className="object-cover w-full aspect-[1324/1000]" loading="lazy" src={heroImage} alt="" />
                    </div>
                </div>
            </div>
    )
}

export default HeroSection