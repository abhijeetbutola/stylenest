import shippingtruck from "../../assets/shippingtruckicon.svg"
import qualitytick from "../../assets/qualitytickicon.svg"
import easyexchange from "../../assets/easyexchangeicon.svg"

function Commitment() {
    return (
        <div className="flex-1 max-w-[1408px] bg-white p-24">
            <div className="flex flex-col gap-8 justify-center items-center">
                <div className="flex flex-col gap-5 justify-center items-center px-40 text-center">
                    <div className="flex flex-col gap-3 justify-center items-center">
                        <div className="font-semibold text-base text-indigo-700">Elevate your experience</div>
                        <div className="font-semibold text-5xl text-neutral-900">Our Commitment to Exceptional Service</div>
                    </div>
                    <div className="font-normal text-xl text-neutral-600">
                        We pride ourselves on a foundation of exceptional customer service, where every interaction is a testament to our dedication to excellence
                    </div>
                </div>
                <div className="flex gap-8 justify-center items-start">
                    <div className="w-[384px] text-center flex flex-col justify-center items-center gap-5">
                        <span className="rounded-full h-12 w-12 border-[1px] relative">
                            <img src={shippingtruck} alt="" className="h-4 w-[22px] inline absolute top-1/3 right-[12px]" />
                        </span>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-xl text-neutral-900">Complimentary Shipping</p>
                            <p className="font-normal text-base text-neutral-600">Enjoy the convenience of free shipping for all orders. We believe in transparent pricing, and the price you see is the price you pay— no surprise fees</p>
                        </div>
                    </div>
                    <div className="w-[384px] text-center flex flex-col justify-center items-center gap-5">
                        <span className="rounded-full h-12 w-12 border-[1px] relative">
                            <img src={qualitytick} alt="" className="h-[22px] w-[26px] inline absolute top-[13px] right-[10px]" />
                        </span>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-xl text-neutral-900">2-year Quality Promise</p>
                            <p className="font-normal text-base text-neutral-600">Shop with confidence knowing that we stand behind our products. Should any issue arise within the first two years, rest assured we're here to help with a hassle-free replacement.</p>
                        </div>
                    </div>
                    <div className="w-[384px] text-center flex flex-col justify-center items-center gap-5">
                        <span className="rounded-full h-12 w-12 border-[1px] relative">
                            <img src={easyexchange} alt="" className="h-[22px] w-[26px] inline absolute top-[13px] right-[10px]" />
                        </span>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-xl text-neutral-900">Easy Exchanges</p>
                            <p className="font-normal text-base text-neutral-600">If your purchase isn't quite right, pass it on to a friend who might love it, and let us know. We're happy to facilitate an exchange to ensure you have the perfect item to complement your lifestyle.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Commitment