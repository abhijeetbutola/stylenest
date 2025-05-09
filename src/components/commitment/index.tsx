import shippingtruck from "../../assets/icons/shippingtruckicon.svg";
import qualitytick from "../../assets/icons/qualitytickicon.svg";
import easyexchange from "../../assets/icons/easyexchangeicon.svg";
import Text from "../text";

function Commitment() {
  return (
    <div className="bg-white max-w-[1408px] max-md:py-12 max-lg:py-16 lg:p-24 max-lg:px-4 sm:px-4">
      <div className="flex flex-col gap-8 justify-center items-center">
        <div className="flex flex-col gap-5 justify-center items-center text-center">
          <div className="flex flex-col gap-3 justify-center items-center w-full">
            <div className="font-semibold text-base text-indigo-700">
              Elevate your experience
            </div>
            <div className="font-semibold text-3xl md:text-5xl text-neutral-900">
              Our Commitment to Exceptional Service
            </div>
          </div>
          <div className="font-normal text-xl text-neutral-600">
            We pride ourselves on a foundation of exceptional customer service,
            where every interaction is a testament to our dedication to
            excellence
          </div>
        </div>
        <div className="flex gap-8 justify-center items-start flex-wrap">
          <div className="text-center flex flex-col justify-center items-center gap-5 lg:max-w-[300px]">
            <span className="rounded-full h-12 w-12 border-[1px] relative">
              <img
                src={shippingtruck}
                alt=""
                className="h-4 w-[22px] inline absolute top-1/3 right-[12px]"
              />
            </span>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl text-neutral-900">
                Complimentary Shipping
              </p>
              <Text as={"p"} color="secondary">
                Enjoy the convenience of free shipping for all orders. We
                believe in transparent pricing, and the price you see is the
                price you pay— no surprise fees
              </Text>
            </div>
          </div>
          <div className="text-center flex flex-col justify-center items-center gap-5 lg:max-w-[300px]">
            <span className="rounded-full h-12 w-12 border-[1px] relative">
              <img
                src={qualitytick}
                alt=""
                className="h-[22px] w-[26px] inline absolute top-[13px] right-[10px]"
              />
            </span>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl text-neutral-900">
                2-year Quality Promise
              </p>
              <Text as={"p"} color="secondary">
                Shop with confidence knowing that we stand behind our products.
                Should any issue arise within the first two years, rest assured
                we're here to help with a hassle-free replacement.
              </Text>
            </div>
          </div>
          <div className="text-center flex flex-col justify-center items-center gap-5 lg:max-w-[300px]">
            <span className="rounded-full h-12 w-12 border-[1px] relative">
              <img
                src={easyexchange}
                alt=""
                className="h-[22px] w-[26px] inline absolute top-[13px] right-[10px]"
              />
            </span>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl text-neutral-900">
                Easy Exchanges
              </p>
              <Text as={"p"} color="secondary">
                If your purchase isn't quite right, pass it on to a friend who
                might love it, and let us know. We're happy to facilitate an
                exchange to ensure you have the perfect item to complement your
                lifestyle.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Commitment;
