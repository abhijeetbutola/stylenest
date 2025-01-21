import heroImage from "../../assets/mainpageimage.jpg"
import Button from "../button"

function HeroSection() {
    return (
            <div className="flex-1 flex gap-8 p-24 mx-4">
                <div className="flex-1 flex flex-col gap-16 justify-center">
                    <div className="flex flex-col gap-6">
                        <p className="font-semibold text-6xl text-neutral-900">Summer styles are finally here</p>
                        <p className="font-normal text-xl text-neutral-600">This year, our new collections will be your haven from the world's harsh elements.</p>
                    </div>
                    <div>
                        <Button className="text-white font-medium text-lg bg-indigo-700 px-4 py-2.5 rounded-[4px] hover:bg-indigo-800">Shop now</Button>
                    </div>
                </div>
                <div className="flex-1 rounded-lg overflow-hidden">
                    <img className="object-cover w-full aspect-[1324/1000]" loading="lazy" src={heroImage} alt="" />
                </div>
            </div>
    )
}

export default HeroSection