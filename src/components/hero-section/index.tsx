import heroImage from "../../assets/mainpageimage.jpg"
import Button from "../button"

function HeroSection() {
    return (
        <div className="max-w-[1408px] bg-white mx-4 flex-1">
            <div className="flex gap-8 p-24">
                <div className="flex flex-col gap-16 justify-center">
                    <div className="flex flex-col gap-6">
                        <p className="font-semibold text-6xl text-neutral-900">Summer styles are finally here</p>
                        <p className="font-normal text-xl text-neutral-600">This year, our new collections will be your haven from the world's harsh elements.</p>
                    </div>
                    <div>
                        <Button className="text-white font-medium text-lg bg-indigo-700 px-4 py-2.5 rounded-[4px] hover:bg-indigo-800">Shop now</Button>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img className="object-fit w-[1400px]" src={heroImage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default HeroSection